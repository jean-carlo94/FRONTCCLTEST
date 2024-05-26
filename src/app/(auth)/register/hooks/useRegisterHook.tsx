'use client'

import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterIUser } from '@/interfaces';

type Inputs = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const useRegisterHook = () => {
    const handleRegister = useAuth((state) => state.register);
    const handleErrors = useAuth((state) => state.setErrors);
    const errorsApi = useAuth((state) => state.errors);
    const isLoading = useAuth((state) => state.isLoading);

    const [registered, setRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, setError, formState: { errors }} = useForm<Inputs>();

    const password = useRef({});
    password.current = watch('password', '');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const user: RegisterIUser = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        const registered = await handleRegister(user);
        setRegistered(registered);
    }

    useEffect(() => {
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }, [errorMessage]);

    useEffect(() => {
        if(errorsApi.length >= 1){

            errorsApi.forEach((value, index, array) => {
                setError(value, { type: 'custom', message: 'Este dato ya se encuentra registrado' });
            });

            setErrorMessage('Se han encontrado algunos campos ya existentes');
            setTimeout(() => {
                handleErrors([]);
            }, 4000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsApi]);

    return {
        handleSubmit,
        onSubmit,
        register,
        registered,
        errors,
        errorMessage,
        password,
        isLoading
    }
}
