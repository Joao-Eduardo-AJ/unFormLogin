import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const handleRegister = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleLogin = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return {
    formRef,
    register: handleRegister,
    login: handleLogin,
  };
};
