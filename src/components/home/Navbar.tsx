import Image from 'next/image';
import NextLink from 'next/link';

import { RUTES_PAGES } from '@/constants'

export const Navbar = () => {
  return (
    <div className="navbar rounded-full bg-base-200 px-5 mt-0 fixed w-full z-10 top-0 shadow-xl">
        <div className="w-full justify-between lg:w-1/2 lg:justify-start">
            <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-secondary btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white">
                    <li>
                        <NextLink href={ RUTES_PAGES.HOME } passHref legacyBehavior>
                            <a>Inicio</a>
                        </NextLink>
                    </li>
                    <li>
                        <NextLink href={ RUTES_PAGES.REGISTER } passHref legacyBehavior>
                            <a>Registro</a>
                        </NextLink>
                    </li>
                    <li>
                        <NextLink href={ RUTES_PAGES.LOGIN } passHref legacyBehavior>
                            <a>Iniciar Sesión</a>
                        </NextLink>
                    </li>
                </ul>
            </div>
            <NextLink href={ RUTES_PAGES.HOME } passHref legacyBehavior>
                <a className="flex justify-center items-center gap-2 text-xl font-bold text-white cursor-pointer hover:scale-110 duration-300">
                    <Image 
                        src="/assets/images/CCL_Principal.png"
                        width={ 50 }
                        height={ 50 }
                        alt="MMT header Logo"
                    />
                    CCL TEST
                </a>
            </NextLink>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-semibold text-white">
                <li>
                    <NextLink href={ RUTES_PAGES.HOME } passHref legacyBehavior>
                        <a>Inicio</a>
                    </NextLink>
                </li>
            </ul>
        </div>
        <div className="hidden lg:flex lg:navbar-end">
            <NextLink href={ RUTES_PAGES.LOGIN } passHref legacyBehavior>
                <a className="btn btn-secondary text-white hover:scale-110">Iniciar Sesión</a>
            </NextLink>
        </div>
    </div>
  )
}
