import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import Button from '@/components/buttons/Button';
import BackgroundDetails from '@/components/lib/backgroundDetails/BackgroundDetails';
import BioData from '@/components/lib/bioData/BioData';
import Header from '@/components/lib/header/Header';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

import { getSingleCandidate } from '@/services/candidate';

const CandidateInfo = () => {
  const router = useRouter();
  const candidateId = router.query.id;
  const { data } = useQuery({
    queryKey: ['candidate', candidateId],
    queryFn: () => getSingleCandidate(candidateId as string),
  });
  console.log("view", data)
  return (
    <MainContentLayout>
      <div>
        <Header
          text='Candidate Details'
          component={
            <Link
              href={`/applications/edit-info/${router.query.id}`}
              className='flex h-[45px] w-[102px] cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-white '
            >
              <Image
                alt='filter'
                src='/assets/svg/pen.svg'
                width={16}
                height={16}
              />
              <p className='text-[14px] font-light'>Edit info</p>
            </Link>
          }
          componentWidth='w-[102px]'
        />
        {/* <div className='mt-3 h-[60px] w-full rounded-[5px] bg-white px-[12rem]   shadow '>
          <div className=' my-auto flex h-full items-center justify-between'>
            <Button variant='primary' className=' h-[40px] w-[207px]'>
              <span>Details</span>
            </Button>
            <p>Hiring Stage</p>
          </div>
        </div> */}
        <section className='mt-2  md:flex gap-6'>
          <div className=' md:w-[49%]'>{data && <BioData candidate={data} />}</div>
          <div className=' md:w-[49%]'>
            {data && <BackgroundDetails candidate={data} />}
          </div>
        </section>
      </div>
    </MainContentLayout>
  );
};

export default CandidateInfo;
