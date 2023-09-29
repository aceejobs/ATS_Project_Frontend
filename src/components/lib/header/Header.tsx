import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import Button from '@/components/buttons/Button';
import {
  FilterForActive,
  InactiveFilter,
} from '@/components/lib/filter/Filter';

import { HeaderProps } from './type';

const Header: React.FC<HeaderProps> = ({
  component,
  text,
  candidate,
  componentWidth,
  buttonText,
}) => {
  const [showActiveFilter, setShowActiveFilter] = useState(false);
  const activeRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(activeRef, () => setShowActiveFilter(false));

  return (
    <div className=' mt-1 md:flex items-center justify-between'>
      <p className='text-[20px] '>{text}</p>
      <div className='mr-2 flex items-center gap-3'>
        {candidate && (
          <div
            ref={activeRef}
            onClick={() => setShowActiveFilter(true)}
            className='relative cursor-pointer'
          >
            <div className='flex   h-[45px] w-[102px] items-center justify-center gap-2 rounded-[5px] bg-white px-6'>
              <Image
                alt='filter'
                src='/assets/svg/filter.svg'
                width={16}
                height={16}
              />
              <p className='text-[14px] font-light'>Filter</p>
            </div>
            <div ref={activeRef}>
              {showActiveFilter && (
                <div>
                  {text === 'Inactive candidates' ? (
                    <InactiveFilter />
                  ) : (
                    <FilterForActive />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* <div className='flex gap-3 items-center'> */}
        <div className={`${componentWidth} rounded-[5px] bg-white  `}>
          {component}
        </div>
        {buttonText? 
        <Link
          href={buttonText ? '/jobs/create-job' : ''}
        >
          <Button
            leftIcon={IoMdAdd}
            className='inline-flex h-[45px] w-[152px] items-center justify-center'
            leftIconClassName='text-white'
            variant='primary'
            size='base'
          >
            <span className='text-[14px]'>
              {buttonText ? buttonText : 'Add Candidate'}
            </span>
          </Button>
        </Link>
        : ""}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
