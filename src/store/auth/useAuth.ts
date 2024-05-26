import { create } from 'zustand';

import { createJSONStorage, persist } from 'zustand/middleware';
import { signIn, signOut } from 'next-auth/react';

import ApiCCL from '@/libs/ApiCCL';
import { IUser, LoginIUser, RegisterIUser } from '@/interfaces';
import { validApiErrors } from '@/helpers';
import { RUTES_API, RUTES_APP, RUTES_PAGES } from '@/constants';

enum RegisterErrors {
    name = 'name',
    email = 'email',
    password = 'password',
};

interface State {
    //States
    user: IUser | undefined;
    errors: RegisterErrors[];
    isLoading: boolean;
    isError: boolean;
}
interface Actions {
    //Methods
    setUser: (token: string) => Promise<void>;
    setErrors: (errors: RegisterErrors[]) => void;
    setLoading: (isLoading: boolean) => void;
    register: (user: RegisterIUser) => Promise<boolean>;
    login: (access: LoginIUser) => Promise<boolean>;
    logout: (token: string) => Promise<void>;
}

const initialState: State = {
    user: undefined,
    errors: [],
    isLoading: false,
    isError: false,
}

export const useAuth= create<State & Actions>()(
    persist(
        (set, get) => ({
            //States
            ...initialState,
            //Methods
            setUser: async(token:string) => {
                let user:IUser | undefined = undefined;

                try {
                    const { data } = await ApiCCL.get(RUTES_API.AUTH_CHECK, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    user = data;
                } catch (error) {
                    user = undefined;
                }

                set(() => ({ user }));
            }, 

            setErrors: (errors: string[]) => {
                set(() => ({ errors: errors as RegisterErrors[]}));
            },

            setLoading: (isLoading: boolean) => {
                set(() => ({ isLoading }));
            },

            register: async (user: RegisterIUser) => {
                set(() => ({ isLoading: true}));
                let result = false;

                try {
                    await ApiCCL.post(RUTES_API.AUTH_REGISTER, user);
                    result = true;
                } catch (error) {
                    const descEnums = Object.values(RegisterErrors) as string[];
                    const errors = validApiErrors(error, descEnums);

                    if(errors?.length >= 1){
                        set(() => ({ errors: errors as RegisterErrors[]}));
                    };
                }

                set(() => ({ isLoading: false}));
                return result;
            },

            login: async(access: LoginIUser) => {
                const { email, password } = access;
                set(() => ({ isLoading: true}));
                let result = true;

                const user = await signIn('credentials', { email, password, redirect: false });
            
                if(user?.error){
                    result = false;
                }

                set(() => ({ isLoading: false}));
                return result;
            },

            logout: async(token: string) => {
                set(() => ({ isLoading: true}));
                
                try {
                    await ApiCCL.get(RUTES_API.AUTH_LOGOUT, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } catch (error) {                    
                    set(() => ({ user: undefined }));
                    set(() => ({ isLoading: false}));
                }
                
                await signOut({ callbackUrl: RUTES_PAGES.LOGIN });
                set(() => ({ user: undefined }));
                set(() => ({ isLoading: false}));
            },
        }),
        {
            name: 'INFO-MMT',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)