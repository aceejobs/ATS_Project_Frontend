import React from 'react';

import Button from '@/components/buttons/Button';
import CreateJobForm from '@/components/lib/createjobForm/CreateJobForm';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

const CreateJob = () => {
  return (
    <MainContentLayout>
      <div className='mt-3 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
        <div className=' my-auto flex h-full items-center justify-between'>
          <Button variant='primary' className=' h-[40px] w-[207px]'>
            <span>Details</span>
          </Button>
          <p>Hiring Stage</p>
        </div>
      </div>
      <div className='mt-3   w-full  rounded-[10px] bg-white p-10 shadow-lg'>
        <CreateJobForm />
      </div>
    </MainContentLayout>
  );
};

export default CreateJob;
