import React from 'react'
import Image from 'next/image';
import ReactDatePicker from 'react-datepicker';
import Header from '@/components/lib/header/Header';
import JobsOverview from '@/components/lib/jobs/JobsOverview';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

const index = () => {
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDateRange(date);

    // const [start, end] = date
  };

  return (
    <MainContentLayout className='pb-20'>
      <Header
        text='Contact'
        componentWidth='w-[300px]'
        buttonText=''
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
              endDate={endDate}
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
        <div>
        <p className="text-2xl">This page is to show list of everyone who contacts us</p>
      </div>
      </MainContentLayout>

   
  )
}

export default index