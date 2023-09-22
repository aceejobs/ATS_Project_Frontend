import Image from 'next/image';
import React from 'react';
import ReactDatePicker from 'react-datepicker';

import Header from '@/components/lib/header/Header';
import InactiveCandidate from '@/components/lib/inactiveCandidate/InactiveCandidate';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

const InActive = () => {
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, stopDate] = dateRange;

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDateRange(date);

    // const [start, end] = date
  };

  return (
    <MainContentLayout className='pb-14'>
      <div>
        <Header
          candidate
          text='Inactive Applications'
          componentWidth='w-[300px]'
          add
          component={
            <div className='flex items-center gap-2 px-4'>
              <Image
                src='/assets/svg/calender.svg'
                alt='calender'
                width={18}
                height={20}
              />
              <ReactDatePicker
                onChange={handleDateChange}
                startDate={startDate}
                endDate={stopDate}
                selectsRange={true}
                isClearable={true}
                showIcon={true}
                placeholderText='Feb 24 2023 -March 24 2023'
                dateFormat='yyyy/MM/dd'
                className=' h-full w-full rounded-[5px] border-none text-center outline-none'
                monthsShown={2}
                showYearDropdown
              />
            </div>
          }
        />
        <div className='mt-3   w-full  rounded-[10px] bg-white px-10 shadow-lg'>
          <InactiveCandidate
            filterData={startDate && stopDate ? { startDate, stopDate } : {}}
          />
        </div>
      </div>
    </MainContentLayout>
  );
};

export default InActive;
