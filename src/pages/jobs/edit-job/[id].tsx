import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import Button from '@/components/buttons/Button';
import EditJobForm from '@/components/lib/editJob/EditJobForm';
import Header from '@/components/lib/header/Header';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getASingleJob } from '@/services/jobs';
import queryKeys from '@/utils/api/queryKeys';

const EditDetails = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery([queryKeys.getSingleJob], () =>
    getASingleJob(router.query.id)
  );

  if (isLoading) {
    return <Skeleton className='h-screen w-full' />;
  }

  return (
    <MainContentLayout>
      <div>
        <Header text='' buttonText='Create Job' />
        {/* <div className='mt-3 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
          <div className=' my-auto flex h-full items-center justify-between'>
            <Button variant='primary' className=' h-[40px] w-[207px]'>
              <span>Job Details</span>
            </Button>
            <p>Hiring Stage</p>
          </div>
        </div> */}
        <div className='mt-10   w-full  rounded-[10px] bg-white p-10 shadow-lg border-t-8 border-blue-700'>         
          <EditJobForm data={data} />
        </div>
      </div>
    </MainContentLayout>
  );
};

export default EditDetails;
