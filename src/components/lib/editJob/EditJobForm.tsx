import { useFormik } from 'formik';
import NaijaStates from 'naija-state-local-government';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import Button from '@/components/buttons/Button';
import { EditJobsProps } from '@/components/lib/editJob/type';
import JobSuccessModal from '@/components/lib/jobSucessModal/JobSucessModal';
import PrimaryInput from '@/components/shared/inputs/Input';
import PrimarySelect from '@/components/shared/inputs/Select';

import * as CONSTANTS from '@/constant/constants';
import { updateJob } from '@/services/jobs';

import { initialValues, validationSchema } from './validation';
import MultiLineInput from '../../shared/inputs/MultiLineInput';
import {
  jobType,
  qualification,
  salary,
  yearsOfExperience,
} from '../../../data/data';

const EditJobForm: React.FC<EditJobsProps> = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleCloseModal = () => {
    setOpenModal((prev) => !prev);
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () => updateJob(data?._id, formik.values),
    onSuccess: () => {
      toast.success('Job Details updated successfully');
      router.push('/jobs');
    },
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...data,
    },
    validationSchema,
    onSubmit: () => {
      mutate();
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
        <JobSuccessModal
          handleCloseModal={handleCloseModal}
          isOpen={openModal}
          title={formik.values['title']}
          // id={jobId}
          id=''
          company={formik.values.company}
        />
      )}
      <form onSubmit={formik.handleSubmit} className=' lg:w-full xl:w-[990px]'>
        <div className='flex items-center justify-between'>
          <PrimaryInput
            id={CONSTANTS.JOB_TITLE}
            name={CONSTANTS.JOB_TITLE}
            value={formik.values[CONSTANTS.JOB_TITLE]}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder={CONSTANTS.JOB_TITLE}
            formikTouched={formik.touched[CONSTANTS.JOB_TITLE]}
            formikErrors={formik.errors[CONSTANTS.JOB_TITLE]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.JOB_TITLE) }}
            job
          />
          <PrimaryInput
            id={CONSTANTS.COMPANY}
            name={CONSTANTS.COMPANY}
            // value={}
            type='text'
            className='w-[49%] xl:w-[473px] '
            placeholder={CONSTANTS.COMPANY}
            formikTouched={formik.touched[CONSTANTS.COMPANY]}
            formikErrors={formik.errors[CONSTANTS.COMPANY]}
            getFieldProps={{ ...formik.getFieldProps(CONSTANTS.COMPANY) }}
            job
          />
        </div>
        <MultiLineInput
          label='Job Description'
          id={CONSTANTS.JOB_DESCRIPTION}
          name={CONSTANTS.JOB_DESCRIPTION}
          className='full mt-5'
          formikTouched={formik.touched[CONSTANTS.JOB_DESCRIPTION]}
          formikErrors={formik.errors[CONSTANTS.JOB_DESCRIPTION]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[CONSTANTS.JOB_DESCRIPTION]}
          numbOfRows={3}
        />
        <MultiLineInput
          label='Job Responsibilities'
          id={CONSTANTS.JOB_RES}
          name={CONSTANTS.JOB_RES}
          className='full mt-5 '
          formikTouched={formik.touched[CONSTANTS.JOB_RES]}
          formikErrors={formik.errors[CONSTANTS.JOB_RES]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[CONSTANTS.JOB_RES]}
          numbOfRows={5}
        />
        <MultiLineInput
          label='Job Requirement'
          id={CONSTANTS.JOB_REQ}
          name={CONSTANTS.JOB_REQ}
          className='full mt-5 '
          formikTouched={formik.touched[CONSTANTS.JOB_REQ]}
          formikErrors={formik.errors[CONSTANTS.JOB_REQ]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[CONSTANTS.JOB_REQ]}
          numbOfRows={3}
        />
        <div className='mt-5 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.QUALIFICATION}
            name={CONSTANTS.QUALIFICATION}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.QUALIFICATION]}
            formikErrors={formik.errors[CONSTANTS.QUALIFICATION]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.QUALIFICATION]}
            option={qualification}
            placeholder='Qualification'
          />
          <PrimarySelect
            id={CONSTANTS.JOB_TYPE}
            name={CONSTANTS.JOB_TYPE}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.JOB_TYPE]}
            formikErrors={formik.errors[CONSTANTS.JOB_TYPE]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.JOB_TYPE]}
            option={jobType}
            placeholder='Job Type'
          />
        </div>
        <div className='mt-5 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.EXPERIENCE}
            name={CONSTANTS.EXPERIENCE}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.EXPERIENCE]}
            formikErrors={formik.errors[CONSTANTS.EXPERIENCE]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.EXPERIENCE]}
            option={yearsOfExperience}
            placeholder=' Years of Experience'
          />
          <PrimarySelect
            id={CONSTANTS.LOCATION}
            name={CONSTANTS.LOCATION}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.LOCATION]}
            formikErrors={formik.errors[CONSTANTS.LOCATION]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.LOCATION]}
            option={mappedState}
            placeholder='Location'
          />
        </div>
        <div className='mt-5 flex items-center justify-between'>
          <PrimarySelect
            id={CONSTANTS.SALARY}
            name={CONSTANTS.SALARY}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.SALARY]}
            formikErrors={formik.errors[CONSTANTS.SALARY]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.SALARY]}
            option={salary}
            placeholder=' Salary'
          />
          {/* <PrimarySelect
            id={CONSTANTS.HIRING_MANAGER}
            name={CONSTANTS.HIRING_MANAGER}
            className='w-[48%] xl:w-[473px]'
            formikTouched={formik.touched[CONSTANTS.HIRING_MANAGER]}
            formikErrors={formik.errors[CONSTANTS.HIRING_MANAGER]}
            onChangeValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            value={formik.values[CONSTANTS.HIRING_MANAGER]}
            option={hiringManager}
            placeholder='Hiring Manger'
          /> */}
        </div>
        <Button
          type='submit'
          className='mt-10 h-[60px] w-[159px] '
          variant='primary'
          isLoading={isLoading}
        >
          <span>Save </span>
        </Button>
      </form>
    </div>
  );
};

export default EditJobForm;
