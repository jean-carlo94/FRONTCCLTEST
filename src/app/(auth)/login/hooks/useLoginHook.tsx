'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RUTES_APP } from '@/constants';
import { useAuth } from '@/store';

type Inputs = {
  email: string;
  password: string;
}

export const useLoginHook = () => {
    const router = useRouter();
    const handleLogin = useAuth((state) => state.login);

    const [errorMessage, setErrorMessage] = useState('');
    const isLoading = useAuth((state) => state.isLoading);
  
    const { register, handleSubmit, formState: { errors }} = useForm<Inputs>();
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const user = await handleLogin(data);
        
      if(!user){
        setErrorMessage('Error de usuario o contraseña');
        return;
      }
      
      router.push(RUTES_APP.DASHBOARD);
    }
  
    useEffect(() => {
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }, [errorMessage])
      
    return {
        handleSubmit,
        onSubmit,
        errorMessage,
        register,
        errors,
        isLoading,
    }
}
