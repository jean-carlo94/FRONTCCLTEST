'use client'

import NextLink from "next/link";

import { RUTES_PAGES } from "@/constants";
import { useRegisterHook } from "../hooks/useRegisterHook";
import { REGEX_EMAIL, REGEX_PASSWORD } from "@/utils";

export const FormRegister = () => {

    const { 
        handleSubmit,
        onSubmit,
        register,
        registered,
        errors,
        errorMessage,
        password,
        isLoading
    } = useRegisterHook();

return (
    <form className="card-body grid grid-cols-4 gap-1" onSubmit={ handleSubmit(onSubmit) }>
        {
            !registered && (
                <>
                    <div className="form-control col-span-4 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-bold">Nombre</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Nombres" 
                            className={`input input-bordered border-white text-white ${errors.name && 'input-error'}`} 
                            {...register("name", 
                                { 
                                    required: 'Este Campo Es Obligatorio',
                                    minLength: { value: 3, message: 'Mínimo 3 Caracteres' },
                                    maxLength: { value: 50, message: 'Máximo 50 Caracteres' },
                                }
                            )}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.name?.message}</span>
                        </div>
                    </div>

                    <div className="form-control col-span-4 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-bold">Email</span>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className={`input input-bordered border-white text-white ${errors.email && 'input-error'}`} 
                            {...register("email", 
                                { 
                                    required: 'Este Campo Es Obligatorio',
                                    pattern: {
                                        value: REGEX_EMAIL,
                                        message: 'Debe ser un correo electrónico valido'
                                    },
                                }
                            )}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.email?.message}</span>
                        </div>
                    </div>

                    <div className='divider col-span-4 md:col-span-4'></div>

                    <div className="form-control col-span-4 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-bold">Contraseña</span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className={`input input-bordered border-white text-white ${errors.password && 'input-error'}`}  
                            {...register("password", 
                                { 
                                    minLength: { value: 8, message: 'Mínimo 8 Caracteres' },
                                    required: 'Este Campo Es Obligatorio',
                                    pattern: { 
                                        value: REGEX_PASSWORD, 
                                        message: 'La contraseña debe tener letras mayúsculas y minúsculas, números y al menos un carácter especial' 
                                    }
                                }
                            )}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.password?.message}</span>
                        </div>
                    </div>

                    <div className="form-control col-span-4 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-white font-bold">Confirmar Contraseña</span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Confirmar Contraseña" 
                            className={`input input-bordered border-white text-white ${errors.password_confirmation && 'input-error'}`} 
                            {...register("password_confirmation", 
                                { 
                                    minLength: { value: 8, message: 'Mínimo 8 Caracteres' },
                                    required: 'Este Campo Es Obligatorio',
                                    pattern: { value: REGEX_PASSWORD, message: 'La contraseña debe tener letras mayúsculas y minúsculas, números y al menos un carácter especial' },
                                    validate: value => value === password.current || 'las contraseñas no coinciden'
                                }
                            )}
                        />
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.password_confirmation?.message}</span>
                        </div>
                    </div>
                </>
            )
        }
        <div className="col-span-4">
            {
                errorMessage !== '' && (
                    <h3 className="text-2xl font-bold text-error text-center my-2">{errorMessage}</h3>
                )
            }
        </div>
        
        <div className="grid grid-cols-subgrid gap-4 col-span-4">
            <div className="col-span-4 md:col-start-2 md:col-end-4">
                {
                    registered ? (
                        <div className="flex flex-col gap-5 text-center my-5">
                            <h3 className="text-2xl font-bold text-white">Registro Exitoso</h3>
                            <NextLink href={ RUTES_PAGES.LOGIN } passHref legacyBehavior>
                                <button 
                                    className="btn btn-secondary text-white hover:scale-110" 
                                    type="submit">
                                        Iniciar session
                                </button>
                            </NextLink>
                        </div>
                    ) : (
                        <>
                            <button 
                                className="btn btn-secondary text-white hover:scale-110 w-full"
                                type="submit"
                            >
                                {
                                    isLoading ? (
                                        <span className="loading loading-dots loading-lg"></span>
                                    ) : (
                                        "Registrar"
                                    )
                                }
                            </button>
                            <label className="flex justify-end gap-2 mt-5">
                                <span className="label-text-alt text-white">¿Ya tiene una cuenta?</span>
                                <NextLink href={ RUTES_PAGES.LOGIN } passHref legacyBehavior>
                                    <a href="#" className="label-text-alt link link-hover text-white">Iniciar session</a>
                                </NextLink>
                            </label>
                        </>
                    )
                }
            </div>
        </div>
    </form>
)
}
