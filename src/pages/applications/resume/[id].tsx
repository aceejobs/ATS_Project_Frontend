import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';

import Button from '@/components/buttons/Button';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

import { getSingleCandidate } from '@/services/candidate';

const Resume = () => {
  const router = useRouter();

  const candidateId = router.query.id;
  const { data } = useQuery({
    queryKey: ['candidate', candidateId],
    queryFn: () => getSingleCandidate(candidateId as string),
  });
  console.log(data)

  return (
    <MainContentLayout>
      {/* <div className=' mb-4 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
        <div className=' my-auto flex h-full items-center justify-between'>
          <Button variant='primary' className=' h-[40px] w-[207px]'>
            <span>Details</span>
          </Button>
          <p>Hiring Stage</p>
        </div>
      </div> */}
      <div className=' relative  h-full w-full'>
      <iframe src={data?.cv} /> 
      </div>
      {/* <embed src={data?.cv} width='100%' height='100%' /> */}
    </MainContentLayout>
  );
};

export default Resume;
