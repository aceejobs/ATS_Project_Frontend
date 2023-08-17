import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useQuery } from 'react-query';

import Header from '@/components/lib/header/Header';
import QualifiedCandidates from '@/components/lib/qualifiedCandidates/QualifiedCandidates';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getAQualifiedJob } from '@/services/jobs';
import queryKeys from '@/utils/api/queryKeys';

const Qualified = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDateRange(date);

    // const [start, end] = date;
  };

  const router = useRouter();

  const { data, isLoading } = useQuery([queryKeys.getQualifiedJob], () =>
    getAQualifiedJob(router.query.id)
  );

  if (isLoading) {
    return <Skeleton className='h-screen w-full' />;
  }

  return (
    <MainContentLayout>
      <div>
        <Header
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
          text='Qualified Candidates'
          candidate
          componentWidth='w-[300px]'
        />
        <div className='mt-3   w-full  rounded-[10px] bg-white px-10 shadow-lg'>
          <QualifiedCandidates data={data?.candidates} />
        </div>
      </div>
    </MainContentLayout>
  );
};

export default Qualified;
