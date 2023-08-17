import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import Button from '@/components/buttons/Button';
import Header from '@/components/lib/header/Header';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getASingleJob } from '@/services/jobs';
import queryKeys from '@/utils/api/queryKeys';

const SingleJobDetails = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery([queryKeys.getSingleJob], () =>
    getASingleJob(router.query.id)
  );

  if (isLoading) {
    return <Skeleton className='h-screen w-full' />;
  }
  return (
    <MainContentLayout>
      <Header
        text=''
        buttonText='Create Job'
        component={
          <div
            onClick={() => router.push(`/jobs/edit-job/${router.query.id}`)}
            className='flex h-[45px] w-[102px] cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-white '
          >
            <Image
              alt='filter'
              src='/assets/svg/pen.svg'
              width={16}
              height={16}
            />
            <p className='text-[14px] font-light'>Edit info</p>
          </div>
        }
        componentWidth='w-[102px]'
      />
      <div className='mt-3 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
        <div className=' my-auto flex h-full items-center justify-between'>
          <Button variant='primary' className=' h-[40px] w-[207px]'>
            <span>Job Details</span>
          </Button>
          <p>Hiring Stage</p>
        </div>
      </div>
      <section className=' mt-6  rounded-[5px] bg-white p-10 shadow'>
        <section className=' w-[40%] '>
          <div className='grid grid-cols-2'>
            <div className=''>
              <p className='text-[16px] font-semibold'>Job Title</p>
              <p className='mt-3 text-[16px] font-light '> {data?.title}</p>
            </div>
            <div className=''>
              <p className='text-[16px] font-semibold'>Job Type</p>
              <p className='mt-3 text-[16px] font-light '> {data?.jobType}</p>
            </div>
            <div className='mt-8'>
              <p className='text-[16px] font-semibold'>Company</p>
              <p className='mt-3 text-[16px] font-light '> {data?.company}</p>
            </div>
            <div className='mt-8'>
              <p className='text-[16px] font-semibold'>Location</p>
              <p className='mt-3  text-[16px] font-light'> {data?.location}</p>
            </div>
          </div>
          <div className='mt-8  '>
            <div className=''>
              <p className='text-[16px] font-semibold'>Experience</p>
              <p className='mt-3 text-[16px] font-light '>
                {' '}
                {data?.experience} Years
              </p>
            </div>
            <div className='mt-8'>
              <p className='text-[16px] font-semibold'>Salary</p>
              <p className='mt-3 text-[16px] font-light '> ₦{data?.salary}</p>
            </div>
          </div>
        </section>
        <section className='mt-8 w-[80%]'>
          <div className=''>
            <p className='text-[16px] font-semibold '>Job Description</p>
            <p className='mt-3 text-[16px] font-light '> {data?.description}</p>
          </div>
          <div className=' mt-8'>
            <p className='text-[16px] font-semibold'>Job Responsibilities</p>
            <ul className='list-disc'>
              {data?.responsibility?.split('\n').map((str) => (
                <li className='my-2 font-light' key={str}>
                  {str}
                </li>
              ))}
            </ul>
          </div>
          <div className=' mt-8'>
            <p className='text-[16px] font-semibold'>Job Requirements</p>

            <ul className='list-disc'>
              {data?.requirement?.split('\n').map((str) => (
                <li className='my-2 font-light' key={str}>
                  {str}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Button
          className=' mt-8 h-[52px] w-[251px]'
          onClick={() => router.push(`/jobs/qualified-candidates/${data?._id}`)}
        >
          <span>See Qualified Candidates</span>
        </Button>
      </section>
    </MainContentLayout>
  );
};

export default SingleJobDetails;
