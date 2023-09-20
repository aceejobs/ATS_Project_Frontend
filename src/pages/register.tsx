import React, { ReactElement, useState } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import Button from '@/components/buttons/Button';
import PrimaryInput from '@/components/shared/inputs/Input';
import { useAppDispatch } from '@/store/store.hooks';
import { NextPageWithLayout } from '@/pages/_app';
import { register } from '@/services/auth';
import { setUserData } from '@/slices/userSlice';
import { processResponse } from '@/utils/response/processResponse';
import Link from 'next/link';
import { PhotoIcon } from '@heroicons/react/24/solid';
import blobToBuffer from 'blob-to-buffer';

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isLoading } = useMutation(register, {
    onSuccess(response) {
      toast.success(response.message);
      router.push('/login');
    }
  });
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that event.target and event.target.files are not null
    if (event.target?.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        // Convert the selected file to a buffer
        blobToBuffer(file, (err, buffer) => {
          if (err) {
            console.error('Error converting file to buffer:', err);
          } else {
            const base64String = Buffer.from(buffer).toString('base64');
            // Set the selectedFile state
            setSelectedFile(file);
            // Set the buffer as a base64-encoded string
            formik.setFieldValue('profileImage', base64String);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };
   
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      // profileImage: null as File | null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit:(values) => {
      mutate(values);

      // if (selectedFile) {
      //   try {
      //     // Include the base64-encoded string in the payload
      //     values.profileImage = formik.values.profileImage;
    
      //     // Call the mutate function to send the registration data, including the profileImage
      //     mutate(values);
      //   } catch (error) {
      //     console.error('Error converting file to buffer:', error);
      //     // Set an error message for the profileImage field
      //     formik.setFieldError('profileImage', 'Error uploading profile image');
      //   }
      // } else {
      //   // If no file is selected, submit the form without the profileImage
      //   // const { profileImage, ...rest } = values; // Remove profileImage from values
      //   mutate(values);
      // }
      // },
    }    
  });

  return (
    <div className='flex'>
      <div className='flex h-screen w-[40%] items-center justify-center bg-ace-light-blue'>
        <div
          className='relative h-screen w-[100%]'
          style={{
            backgroundImage: "url('/assets/svg/welcome.svg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>

      {/* form section */}
      <div className='flex h-screen w-[60%] flex-col items-center justify-center'>
        <div className='relative mb-8 h-[78px] w-[139px]'>
          <Image
            src='/assets/svg/blg-logo.svg'
            alt='big-logo'
            className='object-contain'
            fill={true}
          />
        </div>
        <div className='card mx-auto w-[70%] p-4 shadow md:p-16'>
          <p className='mb-6 text-2xl font-bold text-gray-700'>
            Create your account
          </p>
          <form onSubmit={formik.handleSubmit} className=''>
            <div className='grid grid-cols-1 gap-x-6 md:grid-cols-2 '>
              <div>
                <PrimaryInput
                  type='text'
                  className='my-4 '
                  placeholder='First Name'
                  formikTouched={formik.touched.firstName}
                  formikErrors={formik.errors.firstName}
                  getFieldProps={{ ...formik.getFieldProps('firstName') }}
                  name='firstName'
                  id='firstName'
                />
              </div>
              <div>
                <PrimaryInput
                  type='text'
                  className='my-4 '
                  placeholder='Last Name'
                  formikTouched={formik.touched.lastName}
                  formikErrors={formik.errors.lastName}
                  getFieldProps={{ ...formik.getFieldProps('lastName') }}
                  name='lastName'
                  id='lastName'
                />
              </div>
            </div>
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
              type='text'
              className='my-4 '
              placeholder='Phone'
              formikTouched={formik.touched.phone}
              formikErrors={formik.errors.phone}
              getFieldProps={{ ...formik.getFieldProps('phone') }}
              name='phone'
              id='phone'
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
            {/* <div className='col-span-full'>
              <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                Profile photo
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  {selectedFile ? (
                    <p className='font-semibold text-indigo-600'>{selectedFile.name}</p>
                  ) : (
                    <>
                      <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                      <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                        <label
                          htmlFor='file-upload'
                          className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                        >
                          <span>Upload a file</span>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            accept='.png, .jpg, .gif'
                            className='sr-only'
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
              {formik.errors.profileImage && (
                <p className='mt-2 text-xs text-red-500'>{formik.errors.profileImage}</p>
              )}
            </div> */}
            <Button
              variant='primary'
              type='submit'
              className='mt-4 h-[47px] w-full'
              isLoading={isLoading}
            >
              <span className=''>Register</span>
            </Button>

            <p className='mt-6 text-center text-sm text-gray-600'>
              Already have an account?{' '}
              <Link className='font-semibold text-blue-700' href='/login'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Register;

