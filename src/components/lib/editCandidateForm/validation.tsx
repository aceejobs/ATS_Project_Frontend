import * as Yup from 'yup';

import * as CONSTANTS from '@/constant/constants';

export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];

export const getExtension = (filename: string) => {
  return (
    (filename &&
      filename.substring(filename.lastIndexOf('.') + 1, filename.length)) ||
    filename
  );
};

export const validationSchema = Yup.object({
  [CONSTANTS.EMAIL]: Yup.string().required('Title is required'),
  [CONSTANTS.FIRST_NAME]: Yup.string().required('First name is required'),
  [CONSTANTS.PHONE]: Yup.number()
    .required('Mobile Number is required')
    .typeError('Mobile Number must be a number'),
  [CONSTANTS.LAST_NAME]: Yup.string().required('Last name is required'),
  [CONSTANTS.ADDRESS]: Yup.string().required('Address is required'),
  [CONSTANTS.DATE_OF_BIRTH]: Yup.string().required('Date of birth is required'),
  [CONSTANTS.STATE]: Yup.string().required('State is required'),
  // [CONSTANTS.IDENTIFICATION]: Yup.mixed().test(
  //     'fileType',
  //     'Please provide a supported file type',
  //     (value: undefined | File[]) => {
  //       if (!value) return false;
  //       const isValid = value.every((file) => {
  //         return SUPPORTED_FORMATS.includes(file.type);
  //       });
  //       return isValid;
  //     }
  //   ),
  [CONSTANTS.COUNTRY]: Yup.string().required('Country is required'),
  [CONSTANTS.PROFESSION]: Yup.string().required('Profession is required'),
  [CONSTANTS.JOB_STATUS]: Yup.string().required('Profession is required'),
  [CONSTANTS.VERIFICATION_STATUS]: Yup.string().required(
    'Verification status is required'
  ),
  [CONSTANTS.EXPERIENCE]: Yup.string().required(
    'Years of experience is required'
  ),

  [CONSTANTS.SALARY]: Yup.string().required('Salary is required'),
  [CONSTANTS.NEXT_OF_KIN_FIRST]: Yup.string().required(
    'Next of kin first name is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_LAST]: Yup.string().required(
    'Next of kin Last name is required'
  ),
  [CONSTANTS.RELATIONSHIP]: Yup.string().required(
    'Next of kin relationship is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_PHONE]: Yup.string().required(
    'Next of kin phone is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: Yup.string().required(
    'Next of kin Address is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_STATE]: Yup.string().required(
    'Next of kin state is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: Yup.string().required(
    'Next of kin state is required'
  ),
});

export const initialValues: {
  [CONSTANTS.EMAIL]: string;
  [CONSTANTS.FIRST_NAME]: string;
  [CONSTANTS.LAST_NAME]: string;
  [CONSTANTS.PHONE]: string;
  [CONSTANTS.ADDRESS]: string;
  [CONSTANTS.DATE_OF_BIRTH]: Date;
  [CONSTANTS.STATE]: string;
  [CONSTANTS.COUNTRY]: string;
  [CONSTANTS.PROFESSION]: string;
  [CONSTANTS.JOB_STATUS]: string;
  [CONSTANTS.VERIFICATION_STATUS]: string;
  [CONSTANTS.EXPERIENCE]: string;
  [CONSTANTS.SALARY]: string;
  [CONSTANTS.NEXT_OF_KIN_FIRST]: string;
  [CONSTANTS.NEXT_OF_KIN_LAST]: string;
  [CONSTANTS.RELATIONSHIP]: string;
  [CONSTANTS.NEXT_OF_KIN_PHONE]: string;
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: string;
  [CONSTANTS.NEXT_OF_KIN_STATE]: string;
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: string;
  [CONSTANTS.IDENTIFICATION]: File[] | '';
  [CONSTANTS.RESUME]: File[] | '';
} = {
  [CONSTANTS.EMAIL]: '',
  [CONSTANTS.FIRST_NAME]: '',
  [CONSTANTS.LAST_NAME]: '',
  [CONSTANTS.PHONE]: '',
  [CONSTANTS.ADDRESS]: '',
  [CONSTANTS.DATE_OF_BIRTH]: new Date(),
  [CONSTANTS.STATE]: '',
  [CONSTANTS.COUNTRY]: '',
  [CONSTANTS.PROFESSION]: '',
  [CONSTANTS.JOB_STATUS]: '',
  [CONSTANTS.VERIFICATION_STATUS]: '',
  [CONSTANTS.EXPERIENCE]: '',
  [CONSTANTS.SALARY]: '',
  [CONSTANTS.NEXT_OF_KIN_FIRST]: '',
  [CONSTANTS.NEXT_OF_KIN_LAST]: '',
  [CONSTANTS.RELATIONSHIP]: '',
  [CONSTANTS.NEXT_OF_KIN_PHONE]: '',
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: '',
  [CONSTANTS.NEXT_OF_KIN_STATE]: '',
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: '',
  [CONSTANTS.IDENTIFICATION]: '',
  [CONSTANTS.RESUME]: '',
};
