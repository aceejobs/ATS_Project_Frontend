import * as Yup from 'yup';

import * as CONSTANTS from '@/constant/constants';

export const SUPPORTED_FORMATS = [
  'jpg',
  'jpeg',
  'gif',
  'png',
  'doc',
  'docx',
  'pdf',
];

export const getExtension = (filename: string) => {
  return (
    (filename &&
      filename.substring(filename.lastIndexOf('.') + 1, filename.length)) ||
    filename
  );
};

export const validationSchema = Yup.object({
  [CONSTANTS.EMAIL]: Yup.string()
    .email('Enter a valid email')
    .required('Title is required'),
  [CONSTANTS.FIRST_NAME]: Yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Name must not contain numbers')
    .required('First name is required'),
  [CONSTANTS.PHONE]: Yup.string()
    .matches(/^\+234[0-9]{10}$/, 'Invalid Nigerian phone number.')
    .required('Phone number is required'),
  [CONSTANTS.LAST_NAME]: Yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Name must not contain numbers')
    .required('Last name is required'),
  [CONSTANTS.ADDRESS]: Yup.string().required('Address is required'),
  [CONSTANTS.CITY]: Yup.string().required('City is required'),
  [CONSTANTS.DATE_OF_BIRTH]: Yup.string().required('Date of birth is required'),
  [CONSTANTS.GENDER]: Yup.string().required('Gender is required'),
  [CONSTANTS.EDUCATION]: Yup.string().required('Education is required'),
  [CONSTANTS.STATE]: Yup.string().required('State is required'),
  [CONSTANTS.IDENTIFICATION]: Yup.array()
    .min(1, 'Please provide at least one image')

    .test(
      'fileType',
      'Please provide a supported file type',
      (value: undefined | File[]) => {
        if (!value) return false;
        const isValid = value.every((file) => {
          return SUPPORTED_FORMATS.includes(getExtension(file.name));
        });

        return isValid;
      }
    ),
  [CONSTANTS.RESUME]: Yup.array()
    .min(1, 'Please provide at least one image')

    .test(
      'fileType',
      'Please provide a supported file type',
      (value: undefined | File[]) => {
        if (!value) return false;
        const isValid = value.every((file) => {
          return SUPPORTED_FORMATS.includes(getExtension(file.name));
        });

        return isValid;
      }
    ),
  [CONSTANTS.COUNTRY]: Yup.string().required('Country is required'),
  [CONSTANTS.PROFESSION]: Yup.string().required('Profession is required'),
  [CONSTANTS.JOB_STATUS]: Yup.string().required('Profession is required'),
  [CONSTANTS.VERIFICATION_STATUS]: Yup.string().required(
    'Verification status is required'
  ),
  [CONSTANTS.EXPERIENCE]: Yup.string().required(
    'Years of experience is required'
  ),

  [CONSTANTS.SALARY]: Yup.number().required('Salary is required'),
  [CONSTANTS.NEXT_OF_KIN_FIRST]: Yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Name must not contain numbers')
    .required('Next of kin first name is required'),
  [CONSTANTS.NEXT_OF_KIN_LAST]: Yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Name must not contain numbers')
    .required('Next of kin Last name is required'),
  [CONSTANTS.NEXT_OF_KIN_PHONE]: Yup.string()
    .matches(/^\+234[0-9]{10}$/, 'Invalid Nigerian phone number.')
    .required('Next of kin phone is required'),
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: Yup.string().required(
    'Next of kin Address is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_CITY]: Yup.string().required(
    'Next of kin City is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_STATE]: Yup.string().required(
    'Next of kin state is required'
  ),
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: Yup.string().required(
    'Next of kin country is required'
  ),
  [CONSTANTS.GUARANTORNAME]: Yup.string().required(
    "Guarantor's Name  is required"
  ),
  [CONSTANTS.GUARANTORPOSITION]: Yup.string().required(
    "Guarantor's Position  is required"
  ),
  [CONSTANTS.GUARANTORGRADE]: Yup.string().required(
    "Guarantor's Grade  is required"
  ),
  [CONSTANTS.GURANTORLEVEL]: Yup.string().required(
    "Guarantor's Level  is required"
  ),
  [CONSTANTS.GURANTORBUSINNESS]: Yup.string().required(
    "Guarantor's Business  is required"
  ),
  [CONSTANTS.GURANTORCACNUMBER]: Yup.string().required(
    "Guarantor's CAC number  is required"
  ),
  [CONSTANTS.GURANTOROFFICEPHONE]: Yup.string().required(
    "Guarantor's office phone number  is required"
  ),
  [CONSTANTS.GURANTORADDRESS]: Yup.string().required(
    "Guarantor's Residential Address  is required"
  ),
  [CONSTANTS.GURANTOROFFICEADDRESS]: Yup.string().required(
    "Guarantor's office Address  is required"
  ),
  [CONSTANTS.GURANTORPHONE]: Yup.string().required(
    "Guarantor's Phone number  is required"
  ),
  [CONSTANTS.GURANTORRELATIONSHIP]: Yup.string().required(
    "Guarantor's relationship with applicant  is required"
  ),
  [CONSTANTS.GURANTORNATION]: Yup.string().required(
    "Guarantor's nationality   is required"
  ),
  [CONSTANTS.GUARANTORJOB]: Yup.string().required(
    "Guarantor's nationality   is required"
  ),
});

export const initialValues: {
  [CONSTANTS.EMAIL]: string;
  [CONSTANTS.FIRST_NAME]: string;
  [CONSTANTS.LAST_NAME]: string;
  [CONSTANTS.PHONE]: string;
  [CONSTANTS.ADDRESS]: string;
  [CONSTANTS.CITY]: string;
  [CONSTANTS.DATE_OF_BIRTH]: string;
  [CONSTANTS.GENDER]: string;
  [CONSTANTS.STATE]: string;
  [CONSTANTS.COUNTRY]: string;
  [CONSTANTS.EDUCATION]: string;
  [CONSTANTS.PROFESSION]: string;
  [CONSTANTS.JOB_STATUS]: string;
  [CONSTANTS.VERIFICATION_STATUS]: string;
  [CONSTANTS.EXPERIENCE]: string;
  [CONSTANTS.SALARY]: string;
  [CONSTANTS.NEXT_OF_KIN_FIRST]: string;
  [CONSTANTS.NEXT_OF_KIN_LAST]: string;
  [CONSTANTS.NEXT_OF_KIN_PHONE]: string;
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: string;
  [CONSTANTS.NEXT_OF_KIN_CITY]: string;
  [CONSTANTS.NEXT_OF_KIN_STATE]: string;
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: string;
  [CONSTANTS.RELATIONSHIP]: string;
  [CONSTANTS.IDENTIFICATION]: File[] | '';
  [CONSTANTS.RESUME]: File[] | '';
  [CONSTANTS.GUARANTORNAME]: string;
  [CONSTANTS.GURANTORADDRESS]: string;
  [CONSTANTS.GURANTORBUSINNESS]: string;
  [CONSTANTS.GUARANTORGRADE]: string;
  [CONSTANTS.GURANTORCACNUMBER]: string;
  [CONSTANTS.GURANTORLEVEL]: string;
  [CONSTANTS.GURANTORNATION]: string;
  [CONSTANTS.GURANTOROFFICEADDRESS]: string;
  [CONSTANTS.GURANTOROFFICEPHONE]: string;
  [CONSTANTS.GURANTORPHONE]: string;
  [CONSTANTS.GURANTORRELATIONSHIP]: string;
  [CONSTANTS.GUARANTORJOB]: string;
  [CONSTANTS.GUARANTORPOSITION]: string;
} = {
  [CONSTANTS.EMAIL]: '',
  [CONSTANTS.FIRST_NAME]: '',
  [CONSTANTS.LAST_NAME]: '',
  [CONSTANTS.PHONE]: '+234',
  [CONSTANTS.ADDRESS]: '',
  [CONSTANTS.CITY]: '',
  [CONSTANTS.DATE_OF_BIRTH]: '',
  [CONSTANTS.GENDER]: '',
  [CONSTANTS.STATE]: '',
  [CONSTANTS.COUNTRY]: '',
  [CONSTANTS.PROFESSION]: '',
  [CONSTANTS.JOB_STATUS]: '',
  [CONSTANTS.VERIFICATION_STATUS]: '',
  [CONSTANTS.EDUCATION]: '',
  [CONSTANTS.EXPERIENCE]: '',
  [CONSTANTS.SALARY]: '',
  [CONSTANTS.NEXT_OF_KIN_FIRST]: '',
  [CONSTANTS.NEXT_OF_KIN_LAST]: '',
  [CONSTANTS.NEXT_OF_KIN_PHONE]: '+234',
  [CONSTANTS.NEXT_OF_KIN_ADDRESS]: '',
  [CONSTANTS.NEXT_OF_KIN_CITY]: '',
  [CONSTANTS.NEXT_OF_KIN_STATE]: '',
  [CONSTANTS.NEXT_OF_KIN_COUNTRY]: '',
  [CONSTANTS.RELATIONSHIP]: '',
  [CONSTANTS.IDENTIFICATION]: '',
  [CONSTANTS.RESUME]: '',
  [CONSTANTS.GUARANTORNAME]: '',
  [CONSTANTS.GURANTORADDRESS]: '',
  [CONSTANTS.GURANTORBUSINNESS]: '',
  [CONSTANTS.GUARANTORGRADE]: '',
  [CONSTANTS.GURANTORCACNUMBER]: '',
  [CONSTANTS.GURANTORLEVEL]: '',
  [CONSTANTS.GURANTORNATION]: '',
  [CONSTANTS.GURANTOROFFICEADDRESS]: '',
  [CONSTANTS.GURANTOROFFICEPHONE]: '',
  [CONSTANTS.GURANTORPHONE]: '',
  [CONSTANTS.GURANTORRELATIONSHIP]: '',
  [CONSTANTS.GUARANTORJOB]: '',
  [CONSTANTS.GUARANTORPOSITION]: '',
};
