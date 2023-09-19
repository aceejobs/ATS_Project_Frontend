import { LoginPayload, RegisterPayload } from '@/services/auth/payload';
import { postRequest } from '@/utils/api/calls';

const login = (data: LoginPayload) => {
  return postRequest({
    url: '/auth/login',
    data,
  });
};

const register = (data: RegisterPayload) => {
  return postRequest({
    url: '/auth',
    data,
  });
};

export { login, register };
