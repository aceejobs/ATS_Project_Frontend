import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import Button from '@/components/buttons/Button';
import PrimaryInput from '@/components/shared/inputs/Input';

import { useAppDispatch } from '@/store/store.hooks';

import { NextPageWithLayout } from '@/pages/_app';
import { login } from '@/services/auth';
import { setUserData } from '@/slices/userSlice';
import { processResponse } from '@/utils/response/processResponse';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess(response) {
      const data = processResponse(response);

      if (data) {
        toast.success('Login successful');
        const userData = {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          role: data?.role,
          profileImage: data?.profileImage,
        };
        router.push('/dashboard');

        if (response.token) {
          localStorage.setItem('token', response?.token);
        }
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(setUserData(userData));
      }
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      mutate({
        password: values.password,
        email: values.email,
      });
    },
  });
  return (
    <div className='flex'>
      <div className='flex h-screen w-[50%] items-center justify-center bg-ace-light-blue'>
        <div className='relative h-[337px] w-[255px]'>
          <Image
            src='/assets/svg/big-logo-2.svg'
            alt='big-logo'
            className='object-contain'
            fill={true}
          />
        </div>
      </div>
      {/* form section */}
      <div className='flex h-screen w-[50%] flex-col items-center justify-center'>
        <div className='relative mb-8 h-[78px] w-[139px]'>
          <Image
            src='/assets/svg/samll-logo-2.svg'
            alt='big-logo'
            className='object-contain'
            fill={true}
          />
        </div>
        <form onSubmit={formik.handleSubmit} className='w-[318px]'>
          <PrimaryInput
            type='text'
            className='my-4 '
            placeholder='Email'
            formikTouched={formik.touched.email}
            formikErrors={formik.errors.email}
            getFieldProps={{ ...formik.getFieldProps('email') }}
            name='email'
            id='email'
          />
          <PrimaryInput
            type='password'
            className='mt-6 '
            placeholder='Password'
            formikTouched={formik.touched.password}
            formikErrors={formik.errors.password}
            getFieldProps={{ ...formik.getFieldProps('password') }}
            name='password'
            id='password'
            eye
          />
          <Button
            variant='primary'
            type='submit'
            className='mt-4 h-[47px] w-full'
            isLoading={isLoading}
          >
            <span className=''>Log In</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
export default Login;
