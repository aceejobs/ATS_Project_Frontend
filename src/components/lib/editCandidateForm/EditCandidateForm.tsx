import { useFormik } from 'formik';
import NaijaStates from 'naija-state-local-government';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import {
  JobStatus,
  nation,
  relationship,
  verificationStatus,
  yearsOfExperience,
} from '@/data/data';

import Button from '@/components/buttons/Button';
import ProfileImageField from '@/components/lib/addCandidatesForm/ProfileImageField';
import PrimaryInput from '@/components/shared/inputs/Input';
import PrimarySelect from '@/components/shared/inputs/Select';

import * as CONSTANTS from '@/constant/constants';
import { updateCandidate } from '@/services/candidate';
import { ICandidate } from '@/utils/types';

import { initialValues, validationSchema } from './validation';

const EditCandidatesForm = ({ candidate }: { candidate: ICandidate }) => {
  const router = useRouter();
  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0];

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) => updateCandidate(candidate._id, data),
    onSuccess: () => {
      toast.success('Candidate Details updated successfully');
      router.push('/candidates/active');
    },
  });
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      profileImage: candidate.profileImage,
      [CONSTANTS.EMAIL]: candidate.email,
      [CONSTANTS.FIRST_NAME]: candidate.firstName,
      [CONSTANTS.LAST_NAME]: candidate.lastName,
      [CONSTANTS.PHONE]: candidate.phone,
      [CONSTANTS.ADDRESS]: candidate.street,
      [CONSTANTS.DATE_OF_BIRTH]: new Date(candidate.dateOfBirth),
      [CONSTANTS.STATE]: candidate.state,
      [CONSTANTS.COUNTRY]: candidate.country,
      [CONSTANTS.PROFESSION]: candidate.profession,
      [CONSTANTS.JOB_STATUS]: candidate.jobStatus,
      [CONSTANTS.VERIFICATION_STATUS]: candidate.verificationStatus,
      [CONSTANTS.EXPERIENCE]: candidate.experience,
      [CONSTANTS.SALARY]: candidate.salary,
      [CONSTANTS.NEXT_OF_KIN_FIRST]: candidate.nextOfKinFirstName,
      [CONSTANTS.NEXT_OF_KIN_LAST]: candidate.nextOfKinLastName,
      [CONSTANTS.NEXT_OF_KIN_PHONE]: candidate.nextOfKinPhone,
      [CONSTANTS.NEXT_OF_KIN_ADDRESS]: candidate.nextOfKinStreet,
      [CONSTANTS.NEXT_OF_KIN_STATE]: candidate.nextOfKinState,
      [CONSTANTS.NEXT_OF_KIN_COUNTRY]: candidate.nextOfKinCountry,
      [CONSTANTS.IDENTIFICATION]: candidate.identification,
      [CONSTANTS.RESUME]: candidate.resume,
    },
    validationSchema,
    onSubmit: ({ ...values }) => {
      const formData = new FormData();
      for (const key in values) {
        const value = values[key as keyof typeof values];
        ![CONSTANTS.EMAIL, CONSTANTS.RELATIONSHIP].includes(key) &&
          formData.append(key, value as string);
      }
      mutate(formData);
    },
  });

  const state = NaijaStates?.all().map(
    (state: { state: string }) => state?.state
  );
  const mappedState = state.map((state: string) => {
    return {
      label: state,
      value: state,
    };
  });

  return (
    <div>
      {/* <InputFile /> */}
      <form onSubmit={formik.handleSubmit} className='mt-10'>
        <ProfileImageField
          value={formik.getFieldMeta('profileImage').value}
          onChange={formik.getFieldHelpers('profileImage').setValue}
        />
        <div className='flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.FIRST_NAME}
            name={CONSTANTS.FIRST_NAME}
            type='text'
            className='w-[473px] '
            placeholder='First Name'
            formikTouched={formik.touched[CONSTANTS.FIRST_NAME]}
            formikErrors={formik.errors[CONSTANTS.FIRST_NAME]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.FIRST_NAME) }}
          />
          <PrimaryInput
            id={CONSTANTS.LAST_NAME}
            name={CONSTANTS.LAST_NAME}
            type='text'
            className='w-[473px] '
            placeholder='Last Name'
            formikTouched={formik.touched[CONSTANTS.LAST_NAME]}
            formikErrors={formik.errors[CONSTANTS.LAST_NAME]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.LAST_NAME) }}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.EMAIL}
            name={CONSTANTS.EMAIL}
            type='email'
            className='w-[473px] '
            placeholder='Email Address'
            formikTouched={formik.touched[CONSTANTS.EMAIL]}
            formikErrors={formik.errors[CONSTANTS.EMAIL]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.EMAIL) }}
          />
          <PrimaryInput
            id={CONSTANTS.PHONE}
            name={CONSTANTS.PHONE}
            type='tel'
            className='w-[473px] '
            placeholder='Phone Number, e.g. +234XXXXXXXXXX'
            formikTouched={formik.touched[CONSTANTS.PHONE]}
            formikErrors={formik.errors[CONSTANTS.PHONE]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.PHONE) }}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.ADDRESS}
            name={CONSTANTS.ADDRESS}
            type='text'
            className='w-[473px] '
            placeholder='Address'
            formikTouched={formik.touched[CONSTANTS.ADDRESS]}
            formikErrors={formik.errors[CONSTANTS.ADDRESS]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.ADDRESS) }}
          />
          <PrimarySelect
            id={CONSTANTS.STATE}
            name={CONSTANTS.STATE}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.STATE]}
            formikErrors={formik.errors[CONSTANTS.STATE]}
            onChangeValue={formik.setFieldValue}
            placeholder='State'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.STATE]}
            option={mappedState}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.COUNTRY}
            name={CONSTANTS.COUNTRY}
            type='text'
            className='w-[473px] '
            placeholder='Country'
            formikTouched={formik.touched[CONSTANTS.COUNTRY]}
            formikErrors={formik.errors[CONSTANTS.COUNTRY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.COUNTRY) }}
          />
          <PrimaryInput
            id={CONSTANTS.PROFESSION}
            name={CONSTANTS.PROFESSION}
            type='text'
            className='w-[473px] '
            placeholder='Profession'
            formikTouched={formik.touched[CONSTANTS.PROFESSION]}
            formikErrors={formik.errors[CONSTANTS.PROFESSION]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.PROFESSION) }}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            type='date'
            id={CONSTANTS.DATE_OF_BIRTH}
            name={CONSTANTS.DATE_OF_BIRTH}
            className='w-[473px] '
            placeholder='Date of Birth'
            formikTouched={formik.touched[CONSTANTS.DATE_OF_BIRTH]}
            formikErrors={formik.errors[CONSTANTS.DATE_OF_BIRTH]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.DATE_OF_BIRTH),
              max: maxBirthDate,
            }}
          />
          {/* <InputFile
            type='file'
            id={CONSTANTS.IDENTIFICATION}
            name={CONSTANTS.IDENTIFICATION}
            className='w-[473px] '
            placeholder='Identification'
            formikTouched={formik.touched[CONSTANTS.IDENTIFICATION]}
            formikErrors={formik.errors[CONSTANTS.IDENTIFICATION]}
            onChange={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.IDENTIFICATION] as File[]}
          /> */}
        </div>
        <p className='my-4 font-semibold'>Background and Employment Details </p>
        <div className='mt-6 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.JOB_STATUS}
            name={CONSTANTS.JOB_STATUS}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.JOB_STATUS]}
            formikErrors={formik.errors[CONSTANTS.JOB_STATUS]}
            onChangeValue={formik.setFieldValue}
            placeholder='Job Status'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.JOB_STATUS]}
            option={JobStatus}
          />
          <PrimarySelect
            id={CONSTANTS.VERIFICATION_STATUS}
            name={CONSTANTS.VERIFICATION_STATUS}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.VERIFICATION_STATUS]}
            formikErrors={formik.errors[CONSTANTS.VERIFICATION_STATUS]}
            onChangeValue={formik.setFieldValue}
            placeholder='Verification Status'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.VERIFICATION_STATUS]}
            option={verificationStatus}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.EXPERIENCE}
            name={CONSTANTS.EXPERIENCE}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.EXPERIENCE]}
            formikErrors={formik.errors[CONSTANTS.EXPERIENCE]}
            onChangeValue={formik.setFieldValue}
            placeholder='Experience'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.EXPERIENCE]}
            option={yearsOfExperience}
          />
          {/* <InputFile
            type='file'
            id={CONSTANTS.RESUME}
            name={CONSTANTS.RESUME}
            className='w-[473px] '
            placeholder='Resume'
            formikTouched={formik.touched[CONSTANTS.RESUME]}
            formikErrors={formik.errors[CONSTANTS.RESUME]}
            onChange={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.RESUME] as File[]}
          /> */}
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            type='number'
            id={CONSTANTS.SALARY}
            name={CONSTANTS.SALARY}
            className='w-[473px] '
            placeholder='Salary in NGN / month'
            formikTouched={formik.touched[CONSTANTS.SALARY]}
            formikErrors={formik.errors[CONSTANTS.SALARY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.SALARY) }}
          />
        </div>
        <p className='my-4 font-semibold'>Next of Kin </p>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_FIRST}
            name={CONSTANTS.NEXT_OF_KIN_FIRST}
            className='w-[473px] '
            placeholder='First Name'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_FIRST]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_FIRST]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_FIRST),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_LAST}
            name={CONSTANTS.NEXT_OF_KIN_LAST}
            className='w-[473px] '
            placeholder='Last Name'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_LAST]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_LAST]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_LAST),
            }}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.RELATIONSHIP}
            name={CONSTANTS.RELATIONSHIP}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.RELATIONSHIP]}
            formikErrors={formik.errors[CONSTANTS.RELATIONSHIP]}
            onChangeValue={formik.setFieldValue}
            placeholder='Relationship'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.RELATIONSHIP]}
            option={relationship}
          />
          <PrimaryInput
            type='tel'
            id={CONSTANTS.NEXT_OF_KIN_PHONE}
            name={CONSTANTS.NEXT_OF_KIN_PHONE}
            className='w-[473px] '
            placeholder='Phone Number, e.g. +234XXXXXXXXXX'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_PHONE]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_PHONE]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_PHONE),
            }}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_ADDRESS}
            name={CONSTANTS.NEXT_OF_KIN_ADDRESS}
            className='w-[473px] '
            placeholder='Address'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_ADDRESS]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_ADDRESS]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_ADDRESS),
            }}
          />
          <PrimarySelect
            id={CONSTANTS.NEXT_OF_KIN_STATE}
            name={CONSTANTS.NEXT_OF_KIN_STATE}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_STATE]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_STATE]}
            onChangeValue={formik.setFieldValue}
            placeholder='Next of Kin State'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.NEXT_OF_KIN_STATE]}
            option={mappedState}
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.NEXT_OF_KIN_COUNTRY}
            name={CONSTANTS.NEXT_OF_KIN_COUNTRY}
            className='w-[473px]'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
            onChangeValue={formik.setFieldValue}
            placeholder='Next of Kin Country'
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
            option={nation}
          />
        </div>
        <Button
          type='submit'
          isLoading={isLoading}
          className='mt-10 h-[60px] w-[159px] '
          variant='primary'
        >
          <span>Save</span>
        </Button>
      </form>
    </div>
  );
};

export default EditCandidatesForm;
