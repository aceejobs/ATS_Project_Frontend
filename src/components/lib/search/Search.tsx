import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { setValue } from '@/slices/searchSlice';
import { FormEvent, InputEvent } from '@/utils/types';

import { SearchProps } from './type';
import { useAppDispatch } from '../../../store/store.hooks';

const Search: React.FC<SearchProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setValue({ value: searchValue }));
  };

  const handleChange = (event: InputEvent) => {
    setSearchValue(event.target.value);
    dispatch(setValue({ value: event.target.value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} flex h-[40px] items-center gap-2 rounded-[5px] bg-bg px-4`}
    >
      <Icon
        icon='material-symbols:search'
        className='text-[26px] text-ace-grey'
      />
      <MainInput
        onChange={handleChange}
        type='text'
        className='h-full w-full border-none bg-transparent outline-none'
        placeholder='Search'
      />
    </form>
  );
};

export default Search;

export const MainInput = styled.input<{
  error?: boolean | string;
  type: string;
  value: string | number | readonly string[] | undefined;
}>`
  border-color: transparent;

  box-shadow: none;
  &:focus {
    border-color: none;
    background-color: transparent;
    box-shadow: none;
  }
`;
