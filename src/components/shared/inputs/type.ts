import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { FocusEventHandler } from 'react';

// eslint-disable-next-line unused-imports/no-unused-vars
export interface InputProps<T> {
  className: string;
  placeholder: string;
  getFieldProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    maxDate?: Date;
  };
  formikTouched?: FormikTouched<string | Date>;
  formikErrors?: FormikErrors<string | Date>;
  type: string;
  name: string;
  id: string;
  job?: boolean;
  value?: string;
  eye?: boolean;
}
export type InputFileType = 'file';

export interface SelectOptions {
  readonly label: string;
  readonly value: string;
}

export interface InputFileProps<T> {
  value?: File[];
  label?: string;
  id: string;
  className?: string;
  error?: boolean | string;
  errorText?: string;
  type: InputFileType;
  placeholder: string;
  multiple?: boolean | undefined;
  required?: boolean | undefined;
  formikTouched?: boolean;
  formikErrors?: string;
  name: string;
  onBlur?: FocusEventHandler<T> | undefined;
  onChange: (
    field: string,
    value: File[],
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<FormikValues>> | Promise<void>;
  extensions?: string;
  showPreview?: boolean;
  previewAt?: number;
}

export interface SelectInputProps {
  formikTouched?: boolean;
  formikErrors?: string;
  value?: string | undefined | number;

  options?: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  onChangeValue?: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: (event: any) => void;
  option: SelectOptions[];
  className: string;
  id: string;
  name: string;
  placeholder: string;
}

export interface MultiLineInputProps {
  formikTouched?: boolean;
  formikErrors?: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: (event: any) => void;
  label: string;
  className: string;
  placeholder?: string;
  id: string;
  name: string;
  numbOfRows: number;
}
