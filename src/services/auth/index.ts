import { LoginPayload } from '@/services/auth/payload';
import { postRequest } from '@/utils/api/calls';

const login = (data: LoginPayload) => {
  return postRequest({
    url: '/auth/login',
    data,
  });
};

export { login };
