import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import Button from '@/components/buttons/Button';
import Header from '@/components/lib/header/Header';
import QualifiedCandidates from '@/components/lib/qualifiedCandidates/QualifiedCandidates';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getAQualifiedJob } from '@/services/jobs';
import queryKeys from '@/utils/api/queryKeys';

const ViewJob = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery([queryKeys.getQualifiedJob], () =>
    getAQualifiedJob(router.query.id)
  );

  if (isLoading) {
    return <Skeleton className='h-screen w-full' />;
  }

  return (
    <MainContentLayout className='pb-20'>
      <div>
        <Header text='' buttonText='Create Job' />
        <section>
          <div className='mt-3 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
            <div className=' my-auto flex h-full items-center justify-between'>
              <Button variant='primary' className=' h-[40px] w-[207px]'>
                <span>Job Details</span>
              </Button>
              <p>Hiring Stage</p>
            </div>
          </div>
          <div className='mt-8   w-full  rounded-[10px] bg-white p-10 shadow-lg border-t-8 border-blue-700'>

            <section className=' w-[60%] '>
              <div className='grid grid-cols-3'>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Job Title</p>
                  <p className='mt-3 text-[16px] font-light '>
                    {' '}
                    {data?.job.title}
                  </p>
                </div>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Job Type</p>
                  <p className='mt-3 text-[16px] font-light '>
                    {' '}
                    {data?.job.jobType}
                  </p>
                </div>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Company</p>
                  <p className='mt-3 text-[16px] font-light '>
                    {' '}
                    {data?.job.company}
                  </p>
                </div>
              </div>
              <div className='mt-8  grid grid-cols-3'>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Experience</p>
                  <p className='mt-3 text-[16px] font-light '>
                    {' '}
                    {data?.job.experience} Years
                  </p>
                </div>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Salary</p>
                  <p className='mt-3 text-[16px] font-light '>
                    {' '}
                    ₦{data?.job.salary}
                  </p>
                </div>
                <div className=''>
                  <p className='text-[16px] font-semibold'>Location</p>
                  <p className='mt-3  text-[16px] font-light'>
                    {' '}
                    {data?.job.location}
                  </p>
                </div>
              </div>
            </section>
            <Button
              onClick={() => router.push(`/jobs/view-job/${data?.job._id}`)}
              className='h-[45px] bg-[#314ce2] '
            >
              <span>View Full Details </span>
            </Button>
          </div>
        </section>
        <section>
          <div className='mt-6   w-full  rounded-[10px] bg-white p-10 shadow-lg'>
            <p className='text-[20px]  '>Qualified Candidates</p>
            <QualifiedCandidates data={data?.candidates} />
          </div>
        </section>
      </div>
    </MainContentLayout>
  );
};

export default ViewJob;
