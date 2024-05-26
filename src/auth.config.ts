import { type NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import moment from 'moment';
import * as crypto from 'crypto';
import { IUser } from './interfaces/user';

export const checkSession = async(token:string):Promise<IUser | undefined> => {
  try {
    const res = await fetch(`${process.env.CCL_API}/auth/check`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store'
      }
    );
    
    const data = await res.json();

    if (data.message) return undefined;

    return data;
  } catch (error) {      
    return undefined;
  }
}

const clearUser = ( user:any ) => {
    delete user.roles;
  
    return user;
};

const generatedHashOauth2 = (email:string | null | undefined) => {
    const today = moment().format('YYYYMMDDHH');
    const hash = crypto
    .createHash('sha256')
    .update(
      `${email}${today}${process.env.SECRET_OAUTH2}`,
    )
    .digest('hex');
  
    return hash;
};

export default {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register',
    error: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      if(!user.email){
        return false;
      }

      if(account?.provider === 'google' || account?.provider === 'azure-ad'){
        const hash = generatedHashOauth2(user.email);    
        const res = await fetch(
          `${process.env.BACK_URL_API}/auth/oauth2`,
          {
            method: "POST",
            body: JSON.stringify({email: user.email}),
            headers: {
              'Authorization': `Bearer ${hash}`,
              "Content-Type": "application/json",
              'Accept': 'application/json',
            },
          }
        );

        const result = await res.json();
        if (result.error) return false;
        
        return true;
      }
     return true;
    },

    async authorized({ auth, request: { nextUrl } }) {
      const url = nextUrl.pathname;
      const session = auth?.user;
      
      if(!session && (url.startsWith('/login') || url.startsWith('/register') || url === '/' || url.startsWith('/verify'))){
        return true;
      };

      if(!session){
        return false;
      };
      
      const user = await checkSession(session.token!);
    
      if(!user && url !== '/logout'){
        return Response.redirect(new URL('/logout', nextUrl));
      }

      if(url.startsWith('/verify')){
        return true;
      }

      if( url.startsWith('/login') || url.startsWith('/register') || url === '/'){
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },

    async jwt({ token, user, account, profile, trigger, session }) {
            
         if(
            !token.token && 
            account && 
            (account.provider === 'google' || account.provider === 'azure-ad')
          ){
             const hash = generatedHashOauth2(token.email);    
             const res = await fetch(
               `${process.env.BACK_URL_API}/auth/oauth2`,
               {
                 method: "POST",
                 body: JSON.stringify({email: token.email}),
                 headers: {
                   'Authorization': `Bearer ${hash}`,
                   'Content-Type': 'application/json',
                   'Accept': 'application/json',
                 },
               }
             );

             const user = await res.json();
             if (user.error) throw Error('Error de autorización');
        
             token = clearUser(user);
         }    
         return {...user, ...token };
     },

     async session({ session, user, token }) {    
        session.user = token as any;
        return session;
     },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
        .object({ email: z.string(), password: z.string().min(6) })
        .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        
        const { email, password } = parsedCredentials.data;
        const expReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        const machs = expReg.test(email);

        const body = machs ? 
        { email, password }
        :
        { userName: email, password };
        
        const res = await fetch(
            `${process.env.CCL_API}/auth/login`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 
                  'Content-Type': "application/json",
                  'Accept': 'application/json'
                },
            }
        );
  
        const user = await res.json();

        if (user.errors) return null;

        return clearUser(user);
      },
    }),
  ]
} satisfies NextAuthConfig;