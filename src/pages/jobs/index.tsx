import Image from 'next/image';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useQuery } from 'react-query';

import { JobsFilter } from '@/components/lib/filter/Filter';
import Header from '@/components/lib/header/Header';
import JobsOverview from '@/components/lib/jobs/JobsOverview';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getAllJobs } from '@/services/jobs';
import queryKeys from '@/utils/api/queryKeys';

const Jobs = () => {
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDateRange(date);

    // const [start, end] = date
  };

  const { data, isLoading } = useQuery([queryKeys.getAllJobs], () =>
    getAllJobs()
  );

  if (isLoading) {
    return <Skeleton className='h-screen w-full' />;
  }

  return (
    <MainContentLayout className='pb-20'>
      <Header
        text='Jobs Overview'
        componentWidth='w-[300px]'
        buttonText='Create Job'
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
      {data && data?.length === 0 ? (
        <div className='flex h-[80%] items-center  justify-center'>
          <p>No Jobs</p>
        </div>
      ) : (
        <div className='mt-3 flex justify-between gap-4'>
          <div className='w-[82%]'>
            <JobsOverview data={data} />
          </div>
          <div className='h-full w-[18%] rounded-[5px] bg-[#c9d0fc] p-6 shadow'>
            <JobsFilter />
          </div>
        </div>
      )}
    </MainContentLayout>
  );
};

export default Jobs;
