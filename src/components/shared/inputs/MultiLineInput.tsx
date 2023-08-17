import React from 'react';

import { MultiLineInputProps } from '@/components/shared/inputs/type';

const MultiLineInput: React.FC<MultiLineInputProps> = ({
  className,
  id,
  name,
  onBlur,
  onChange,
  formikErrors,
  formikTouched,
  placeholder,
  value,
  label,
  numbOfRows,
}) => {
  return (
    <div
      className={`${className} rounded-[5px] border-ace-black   text-ace-black`}
    >
      <p className='mb-2 text-[14px] font-[700] text-ace-black'>{label}</p>
      <textarea
        className='h-full w-full bg-transparent outline-none'
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        rows={numbOfRows}
        name={name}
      />
      {formikTouched && formikErrors && (
        <div className='ml-3 block  text-left text-[10px] font-light    text-red-600'>
          *{formikErrors}
        </div>
      )}
    </div>
  );
};

export default MultiLineInput;
