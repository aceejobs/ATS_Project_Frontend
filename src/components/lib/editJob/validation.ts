import * as Yup from 'yup';

import * as CONSTANTS from '@/constant/constants';

export const validationSchema = Yup.object({
  [CONSTANTS.JOB_TITLE]: Yup.string().required('Job Title is required'),
  [CONSTANTS.COMPANY]: Yup.string().required('Company  is required'),

  [CONSTANTS.JOB_DESCRIPTION]: Yup.string().required(
    'Job Description is required'
  ),
  [CONSTANTS.JOB_REQ]: Yup.string().required('Job Requirements is required'),
  [CONSTANTS.JOB_RES]: Yup.string().required(
    'Job Responsibilities is required'
  ),
  [CONSTANTS.QUALIFICATION]: Yup.string().required('Qualification is required'),

  [CONSTANTS.JOB_TYPE]: Yup.string().required('Job Type is required'),
  [CONSTANTS.SALARY]: Yup.string().required('Salary is required'),
  // [CONSTANTS.HIRING_MANAGER]: Yup.string().required(
  //   'Hiring Manager is required'
  // ),
  [CONSTANTS.EXPERIENCE]: Yup.string().required('Experience is required'),
  [CONSTANTS.LOCATION]: Yup.string().required('Location is required'),
});

export const initialValues: {
  [CONSTANTS.SALARY]: number;
  [CONSTANTS.JOB_TITLE]: string;
  [CONSTANTS.COMPANY]: string;
  [CONSTANTS.JOB_DESCRIPTION]: string;
  [CONSTANTS.JOB_REQ]: string;
  [CONSTANTS.JOB_RES]: string;
  [CONSTANTS.QUALIFICATION]: string;
  [CONSTANTS.JOB_TYPE]: string;
  // [CONSTANTS.HIRING_MANAGER]: string;
  [CONSTANTS.EXPERIENCE]: number;
  [CONSTANTS.LOCATION]: string;
} = {
  [CONSTANTS.SALARY]: 0,
  [CONSTANTS.JOB_TITLE]: '',
  [CONSTANTS.COMPANY]: '',
  [CONSTANTS.JOB_DESCRIPTION]: '',
  [CONSTANTS.JOB_REQ]: '',
  [CONSTANTS.JOB_RES]: '',
  [CONSTANTS.QUALIFICATION]: '',
  [CONSTANTS.JOB_TYPE]: '',
  // [CONSTANTS.HIRING_MANAGER]: '',
  [CONSTANTS.EXPERIENCE]: 0,
  [CONSTANTS.LOCATION]: '',
};
