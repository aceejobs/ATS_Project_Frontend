import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { MainInput } from '@/components/shared/inputs/styled';
import { InputProps } from '@/components/shared/inputs/type';

const PrimaryInput: React.FC<InputProps<HTMLInputElement>> = ({
  className,
  placeholder,
  getFieldProps,
  formikErrors,
  formikTouched,
  type,
  name,
  id,
  job,
  eye,
}) => {
  const holder = !job ? placeholder : '';

  const [changeType, setChangeType] = useState(false);
  const toggleType = () => {
    setChangeType((prev) => !prev);
  };

  return (
    <div className={`${className} mb-4`}>
      {job && (
        <p className='mb-2 text-[16px] font-[700] text-ace-black'>
          {placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        </p>
      )}

      <div
        className={` h-[47px] rounded-[5px] border border-ace-black text-ace-black  `}
      >
        {eye ? (
          <div className={` flex  h-full items-center justify-between  px-1`}>
            <MainInput
              name={name}
              id={id}
              type={changeType ? type : 'text'}
              placeholder={holder}
              className='h-full w-full rounded-[5px] border-none bg-transparent outline-none focus:border-none'
              {...getFieldProps}
            />
            <Icon
              className='cursor-pointer text-xl'
              icon={changeType ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
              onClick={toggleType}
            />
          </div>
        ) : type === 'date' ? (
          <ReactDatePicker
            dateFormat='dd/MM/yyy'
            fixedHeight
            placeholderText={placeholder}
            className='h-full w-full rounded-[5px] border-none bg-transparent !pl-4 outline-none focus:border-none'
            maxDate={getFieldProps?.maxDate}
            selected={getFieldProps?.value}
            onChange={getFieldProps?.onChange}
            showYearDropdown
          />
        ) : (
          <MainInput
            name={name}
            id={id}
            type={type}
            placeholder={holder}
            className='h-full w-full rounded-[5px] border-none bg-transparent outline-none focus:border-none'
            {...getFieldProps}
          />
        )}
        {formikTouched && formikErrors && (
          <div className='ml-3 block  text-left text-[10px] font-light    text-red-600'>
            *{formikErrors as string}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryInput;
