'use client'

import React from "react";
import NextLink from "next/link";

import { RUTES_PAGES } from "@/constants";
import { REGEX_EMAIL, REGEX_PASSWORD } from "@/utils";

import { useLoginHook } from "../hooks/useLoginHook";

export const FromLogin = () => {
  
  const {
    handleSubmit,
    onSubmit,
    errorMessage,
    register,
    errors,
    isLoading,
  } = useLoginHook();
  
  return (
      <form className="card-body grid grid-cols-1 gap-1" onSubmit={ handleSubmit(onSubmit) }>
        <div>
            {
                errorMessage !== '' && (
                    <h3 className="text-md font-bold text-error text-center">{errorMessage}</h3>
                )
            }
        </div>

        <div className="form-control">
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
        
        <div className="form-control">
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
                <a href="#" className="label-text-alt link link-hover text-neutral">¿Olvidaste tu contraseña?</a>
            </div>
        </div>

        <div className="form-control mt-6">
          <button 
            className="btn btn-secondary text-white hover:scale-110"
            type="submit"
          >
            {
                isLoading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    "Iniciar Sesión"
                )
            }
          </button>
          <label className="flex justify-end gap-2 mt-5 text-neutral">
            <span className="label-text-alt">¿No te has registrado?</span>
            <NextLink href={ RUTES_PAGES.REGISTER } passHref legacyBehavior>
              <a href="#" className="label-text-alt link link-hover">Crear cuenta</a>
            </NextLink>
          </label>
        </div>
        
      </form>
  );
}
