/* eslint-disable @typescript-eslint/no-explicit-any */
import { clientApi } from './client';
import { toast } from 'react-toastify';

const login = async (name: string, password: string) => {
  try {
    const { data } = await clientApi.post('/users/login', { name, password });

    return data?.access_token;
  } catch (error: any) {
    toast.error('Erro ao realizar login!');
    throw new Error(error.message);
  }
};

export const usersService = {
  login,
};
