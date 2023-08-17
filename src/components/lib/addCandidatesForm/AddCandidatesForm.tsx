import { useFormik } from 'formik';
import NaijaStates from 'naija-state-local-government';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

import {
  gender,
  JobStatus,
  nation,
  profession,
  qualification,
  relationship,
  verificationStatus,
  yearsOfExperience,
} from '@/data/data';

import Button from '@/components/buttons/Button';
import ProfileImageField from '@/components/lib/addCandidatesForm/ProfileImageField';
import SucessModal from '@/components/lib/modals/SucessModal';
import PrimaryInput from '@/components/shared/inputs/Input';
import InputFile from '@/components/shared/inputs/InputFile';
import PrimarySelect from '@/components/shared/inputs/Select';

import * as CONSTANTS from '@/constant/constants';
import { createCandidate } from '@/services/candidate';

import { initialValues, validationSchema } from './validation';

const AddCandidatesForm = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal((prev) => !prev);
  };

  const { data, mutate, isLoading } = useMutation(createCandidate, {
    onSuccess(response) {
      if (response) {
        setOpenModal(true);
      }
    },
  });

  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        const value = values[key as keyof typeof values];
        if ([CONSTANTS.PROFILE_IMAGE].includes(key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          formData.append(key, value, value.name);
        } else if ([CONSTANTS.RESUME, CONSTANTS.IDENTIFICATION].includes(key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          formData.append(key, value[0], value[0]?.name);
        } else {
          formData.append(key, value as string);
        }
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
      {openModal && (
        <SucessModal
          candidateId={data?.data._id}
          isOpen={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
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
            className='w-[49%] xl:w-[473px] '
            placeholder='First Name'
            formikTouched={formik.touched[CONSTANTS.FIRST_NAME]}
            formikErrors={formik.errors[CONSTANTS.FIRST_NAME]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.FIRST_NAME) }}
          />
          <PrimaryInput
            id={CONSTANTS.LAST_NAME}
            name={CONSTANTS.LAST_NAME}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder='Last Name'
            formikTouched={formik.touched[CONSTANTS.LAST_NAME]}
            formikErrors={formik.errors[CONSTANTS.LAST_NAME]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.LAST_NAME) }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.EMAIL}
            name={CONSTANTS.EMAIL}
            type='email'
            className='w-[49%] xl:w-[473px] '
            placeholder='Email Address'
            formikTouched={formik.touched[CONSTANTS.EMAIL]}
            formikErrors={formik.errors[CONSTANTS.EMAIL]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.EMAIL) }}
          />
          <PrimaryInput
            id={CONSTANTS.PHONE}
            name={CONSTANTS.PHONE}
            type='tel'
            className='w-[49%] xl:w-[473px] '
            placeholder='Phone Number, e.g. +234XXXXXXXXXX'
            formikTouched={formik.touched[CONSTANTS.PHONE]}
            formikErrors={formik.errors[CONSTANTS.PHONE]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.PHONE) }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.ADDRESS}
            name={CONSTANTS.ADDRESS}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder='Address'
            formikTouched={formik.touched[CONSTANTS.ADDRESS]}
            formikErrors={formik.errors[CONSTANTS.ADDRESS]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.ADDRESS) }}
          />
          <PrimaryInput
            id={CONSTANTS.CITY}
            name={CONSTANTS.CITY}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder='city'
            formikTouched={formik.touched[CONSTANTS.CITY]}
            formikErrors={formik.errors[CONSTANTS.CITY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.CITY) }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.STATE}
            name={CONSTANTS.STATE}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.STATE]}
            formikErrors={formik.errors[CONSTANTS.STATE]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={mappedState}
            placeholder='state'
            value={formik.values[CONSTANTS.STATE]}
          />
          <PrimaryInput
            id={CONSTANTS.COUNTRY}
            name={CONSTANTS.COUNTRY}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder='Country'
            formikTouched={formik.touched[CONSTANTS.COUNTRY]}
            formikErrors={formik.errors[CONSTANTS.COUNTRY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.COUNTRY) }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          {/* <div className='flex w-[49%] gap-6  xl:w-[473px] justify-between items-center'>
            <PrimarySelect
              id={CONSTANTS.GENDER}
              name={CONSTANTS.GENDER}
              className='w-full'
              formikTouched={formik.touched[CONSTANTS.GENDER]}
              formikErrors={formik.errors[CONSTANTS.GENDER]}
              onChangeValue={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              option={gender}
              placeholder='Gender'
              value={formik.values[CONSTANTS.GENDER]}
            />
            <PrimarySelect
              id={CONSTANTS.GENDER}
              name={CONSTANTS.GENDER}
              className='w-full'
              formikTouched={formik.touched[CONSTANTS.GENDER]}
              formikErrors={formik.errors[CONSTANTS.GENDER]}
              onChangeValue={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              option={gender}
              placeholder='Gender'
              value={formik.values[CONSTANTS.GENDER]}
            />
          </div> */}
          <PrimarySelect
            id={CONSTANTS.PROFESSION}
            name={CONSTANTS.PROFESSION}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.PROFESSION]}
            formikErrors={formik.errors[CONSTANTS.PROFESSION]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={profession.sort(function (a, b) {
              return a.label.localeCompare(b.label);
            })}
            placeholder='Profession'
            value={formik.values[CONSTANTS.PROFESSION]}
          />
          <PrimaryInput
            type='date'
            id={CONSTANTS.DATE_OF_BIRTH}
            name={CONSTANTS.DATE_OF_BIRTH}
            className='w-[49%] xl:w-[473px] '
            placeholder='Date of Birth'
            formikTouched={formik.touched[CONSTANTS.DATE_OF_BIRTH]}
            formikErrors={formik.errors[CONSTANTS.DATE_OF_BIRTH]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.DATE_OF_BIRTH),
              onChange: (date) =>
                formik.setFieldValue(CONSTANTS.DATE_OF_BIRTH, date),
              maxDate: maxBirthDate,
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.GENDER}
            name={CONSTANTS.GENDER}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.GENDER]}
            formikErrors={formik.errors[CONSTANTS.GENDER]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={gender}
            placeholder='Gender'
            value={formik.values[CONSTANTS.GENDER]}
          />
          <div>
            <InputFile
              type='file'
              id={CONSTANTS.IDENTIFICATION}
              name={CONSTANTS.IDENTIFICATION}
              className='w-[49%] xl:w-[473px] '
              placeholder="Int'l passport, NIN,Drivers license"
              formikTouched={formik.touched[CONSTANTS.IDENTIFICATION]}
              formikErrors={formik.errors[CONSTANTS.IDENTIFICATION]}
              onChange={formik.setFieldValue}
              onBlur={formik.handleBlur}
              value={formik.values[CONSTANTS.IDENTIFICATION] as File[]}
              extensions='image/*, .doc, .docx, '
            />
            <p className='text-xs'> .jpg, .jpeg, .png, .doc, .docx</p>
          </div>
        </div>

        <p className='my-2 font-semibold'>Background and Employment Details </p>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.JOB_STATUS}
            name={CONSTANTS.JOB_STATUS}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.JOB_STATUS]}
            formikErrors={formik.errors[CONSTANTS.JOB_STATUS]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={JobStatus}
            placeholder='Job Status'
            value={formik.values[CONSTANTS.JOB_STATUS]}
          />
          <PrimarySelect
            id={CONSTANTS.VERIFICATION_STATUS}
            name={CONSTANTS.VERIFICATION_STATUS}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.VERIFICATION_STATUS]}
            formikErrors={formik.errors[CONSTANTS.VERIFICATION_STATUS]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={verificationStatus}
            placeholder='Verification Status'
            value={formik.values[CONSTANTS.VERIFICATION_STATUS]}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.EXPERIENCE}
            name={CONSTANTS.EXPERIENCE}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.EXPERIENCE]}
            formikErrors={formik.errors[CONSTANTS.EXPERIENCE]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={yearsOfExperience}
            placeholder='Experience'
            value={formik.values[CONSTANTS.EXPERIENCE]}
          />
          <InputFile
            type='file'
            id={CONSTANTS.RESUME}
            name={CONSTANTS.RESUME}
            className='w-[49%] xl:w-[473px] '
            placeholder='Resume (.pdf)'
            formikTouched={formik.touched[CONSTANTS.RESUME]}
            formikErrors={formik.errors[CONSTANTS.RESUME]}
            onChange={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.RESUME] as File[]}
            extensions='.pdf,'
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='number'
            id={CONSTANTS.SALARY}
            name={CONSTANTS.SALARY}
            className='w-[49%] xl:w-[473px] '
            placeholder='Salary in NGN / month'
            formikTouched={formik.touched[CONSTANTS.SALARY]}
            formikErrors={formik.errors[CONSTANTS.SALARY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.SALARY) }}
          />
          <PrimarySelect
            id={CONSTANTS.EDUCATION}
            name={CONSTANTS.EDUCATION}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.EDUCATION]}
            formikErrors={formik.errors[CONSTANTS.EDUCATION]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={qualification}
            placeholder='Education'
            value={formik.values[CONSTANTS.EDUCATION]}
          />
        </div>
        <p className='my-2 font-semibold'>Next of Kin </p>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_FIRST}
            name={CONSTANTS.NEXT_OF_KIN_FIRST}
            className='w-[49%] xl:w-[473px] '
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
            className='w-[49%] xl:w-[473px] '
            placeholder='Last Name'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_LAST]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_LAST]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_LAST),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.RELATIONSHIP}
            name={CONSTANTS.RELATIONSHIP}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.RELATIONSHIP]}
            formikErrors={formik.errors[CONSTANTS.RELATIONSHIP]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={relationship}
            placeholder='Relationship'
            value={formik.values[CONSTANTS.RELATIONSHIP]}
          />
          <PrimaryInput
            type='tel'
            id={CONSTANTS.NEXT_OF_KIN_PHONE}
            name={CONSTANTS.NEXT_OF_KIN_PHONE}
            className='w-[49%] xl:w-[473px] '
            placeholder='Phone Number, e.g. +234XXXXXXXXXX'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_PHONE]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_PHONE]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_PHONE),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_ADDRESS}
            name={CONSTANTS.NEXT_OF_KIN_ADDRESS}
            className='w-[49%] xl:w-[473px] '
            placeholder='Address'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_ADDRESS]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_ADDRESS]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_ADDRESS),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.NEXT_OF_KIN_CITY}
            name={CONSTANTS.NEXT_OF_KIN_CITY}
            className='w-[49%] xl:w-[473px] '
            placeholder='City'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_CITY]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_CITY]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.NEXT_OF_KIN_CITY),
            }}
          />
          <PrimarySelect
            id={CONSTANTS.NEXT_OF_KIN_STATE}
            name={CONSTANTS.NEXT_OF_KIN_STATE}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_STATE]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_STATE]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            option={mappedState}
            placeholder='Next of Kin State'
            value={formik.values[CONSTANTS.NEXT_OF_KIN_STATE]}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.NEXT_OF_KIN_COUNTRY}
            name={CONSTANTS.NEXT_OF_KIN_COUNTRY}
            className='w-[49%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
            formikErrors={formik.errors[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            placeholder='Next of Kin Nation'
            option={nation}
            value={formik.values[CONSTANTS.NEXT_OF_KIN_COUNTRY]}
          />
        </div>
        <p className='my-2 font-semibold'>Applicant Guarantor's </p>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GUARANTORNAME}
            name={CONSTANTS.GUARANTORNAME}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Name"
            formikTouched={formik.touched[CONSTANTS.GUARANTORNAME]}
            formikErrors={formik.errors[CONSTANTS.GUARANTORNAME]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GUARANTORNAME),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GUARANTORJOB}
            name={CONSTANTS.GUARANTORJOB}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Occupation/Profession"
            formikTouched={formik.touched[CONSTANTS.GUARANTORJOB]}
            formikErrors={formik.errors[CONSTANTS.GUARANTORJOB]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GUARANTORJOB),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GUARANTORPOSITION}
            name={CONSTANTS.GUARANTORPOSITION}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Position"
            formikTouched={formik.touched[CONSTANTS.GUARANTORPOSITION]}
            formikErrors={formik.errors[CONSTANTS.GUARANTORPOSITION]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GUARANTORPOSITION),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GUARANTORGRADE}
            name={CONSTANTS.GUARANTORGRADE}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Grade"
            formikTouched={formik.touched[CONSTANTS.GUARANTORGRADE]}
            formikErrors={formik.errors[CONSTANTS.GUARANTORGRADE]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GUARANTORGRADE),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTOROFFICEADDRESS}
            name={CONSTANTS.GURANTOROFFICEADDRESS}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Office Address"
            formikTouched={formik.touched[CONSTANTS.GURANTOROFFICEADDRESS]}
            formikErrors={formik.errors[CONSTANTS.GURANTOROFFICEADDRESS]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTOROFFICEADDRESS),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORLEVEL}
            name={CONSTANTS.GURANTORLEVEL}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Level"
            formikTouched={formik.touched[CONSTANTS.GURANTORLEVEL]}
            formikErrors={formik.errors[CONSTANTS.GURANTORLEVEL]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORLEVEL),
            }}
          />
        </div>

        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORCACNUMBER}
            name={CONSTANTS.GURANTORCACNUMBER}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's CAC Number"
            formikTouched={formik.touched[CONSTANTS.GURANTORCACNUMBER]}
            formikErrors={formik.errors[CONSTANTS.GURANTORCACNUMBER]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORCACNUMBER),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTOROFFICEPHONE}
            name={CONSTANTS.GURANTOROFFICEPHONE}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Office Phone number"
            formikTouched={formik.touched[CONSTANTS.GURANTOROFFICEPHONE]}
            formikErrors={formik.errors[CONSTANTS.GURANTOROFFICEPHONE]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTOROFFICEPHONE),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORPHONE}
            name={CONSTANTS.GURANTORPHONE}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Phone Number"
            formikTouched={formik.touched[CONSTANTS.GURANTORPHONE]}
            formikErrors={formik.errors[CONSTANTS.GURANTORPHONE]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORPHONE),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORADDRESS}
            name={CONSTANTS.GURANTORADDRESS}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Residential Address"
            formikTouched={formik.touched[CONSTANTS.GURANTORADDRESS]}
            formikErrors={formik.errors[CONSTANTS.GURANTORADDRESS]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORADDRESS),
            }}
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORRELATIONSHIP}
            name={CONSTANTS.GURANTORRELATIONSHIP}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Relationship with Applicant"
            formikTouched={formik.touched[CONSTANTS.GURANTORRELATIONSHIP]}
            formikErrors={formik.errors[CONSTANTS.GURANTORRELATIONSHIP]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORRELATIONSHIP),
            }}
          />
          <PrimaryInput
            type='text'
            id={CONSTANTS.GURANTORBUSINNESS}
            name={CONSTANTS.GURANTORBUSINNESS}
            className='w-[49%] xl:w-[473px] '
            placeholder="Guarantor's Business"
            formikTouched={formik.touched[CONSTANTS.GURANTORBUSINNESS]}
            formikErrors={formik.errors[CONSTANTS.GURANTORBUSINNESS]}
            getFieldProps={{
              ...formik.getFieldProps(CONSTANTS.GURANTORBUSINNESS),
            }}
          />
        </div>
        <PrimarySelect
          id={CONSTANTS.GURANTORNATION}
          name={CONSTANTS.GURANTORNATION}
          className='w-[49%] xl:w-[473px]'
          formikTouched={formik.touched[CONSTANTS.GURANTORNATION]}
          formikErrors={formik.errors[CONSTANTS.GURANTORNATION]}
          onChangeValue={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          placeholder="Guarantor's Nationality"
          option={nation}
          value={formik.values[CONSTANTS.GURANTORNATION]}
        />
        <Button
          type='submit'
          className='mt-10 h-[60px] w-[159px] '
          variant='primary'
          isLoading={isLoading}
        >
          <span>Create Profile</span>
        </Button>
      </form>
    </div>
  );
};

export default AddCandidatesForm;
