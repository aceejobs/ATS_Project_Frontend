import React, { useMemo } from 'react';
import Select, { StylesConfig } from 'react-select';

import { SelectInputProps } from '@/components/shared/inputs/type';

import { SelectOptions } from './type';

type IsMulti = false;

const colourStyles: StylesConfig<SelectOptions[], IsMulti> = {
  menuList: (styles) => ({
    ...styles,
    background: '#8C9AFF',
    color: '#222222',
    borderRadius: '5px',
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    background: '#fff',
    borderColor: isFocused ? '#161616' : '#161616',
    minHeight: '47px',
    height: '47px',
    outline: 'none',
    boxShadow: 'none',
    // boxShadow: isFocused ? 0 : 0,
    // border: isFocused ? 0 : 0
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? '#8C9AFF' : isSelected ? '#8C9AFF' : '#8C9AFF',

    zIndex: 1,
    color: '#222222',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    outline: 'none',
  }),
};

const PrimarySelect: React.FC<SelectInputProps> = ({
  className,
  formikErrors,
  formikTouched,
  id,
  onChangeValue,
  onBlur,
  option,
  placeholder,
  name,
  value,
}) => {
  type Option = { readonly value: string };

  const handleChange = (option: Option | null) => {
    // logic here
    if (onChangeValue && option) {
      onChangeValue(id, option.value, true);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(id);
    }
  };

  const selectedValue: Option = useMemo(() => {
    if (!value || !option) {
      return { value: '', label: `Select ${placeholder || 'option'}` };
    }
    const findSelected = option.find((option) => option.value === value);

    if (!findSelected) {
      return { value: '', label: `Select ${placeholder || 'option'}` };
    }
    return findSelected;
  }, [option, value, placeholder]);

  return (
    <div className={`${className} mb-4   text-ace-black`}>
      <Select
        placeholder={`Select ${placeholder || 'option'}`}
        name={name}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options={option}
        className='basic-multi-select '
        classNamePrefix={`  select`}
        styles={colourStyles}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={handleChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={selectedValue}
        onBlur={handleBlur}
        id={id}
        isSearchable={true}
      />
      {formikTouched && formikErrors && (
        <div className='ml-3 block  text-left text-[10px] font-light    text-red-600'>
          *{formikErrors}
        </div>
      )}
    </div>
  );
};

export default PrimarySelect;
