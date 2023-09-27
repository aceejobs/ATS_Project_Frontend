import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { ICandidate } from '@/utils/types';

const BackgroundDetails = ({ candidate }: { candidate: ICandidate }) => {
  const router = useRouter();
  return (
    <div>
        <div className='mt-10   w-full  rounded-[10px] bg-white p-10 shadow-lg border-t-8 border-blue-700'>         
        <div className='mb-6 rounded-[5px] bg-bg p-4 text-center font-[700]'>
          <p>Background and Employment Details </p>
        </div>
        <section>
          <div className='mt-6'>
            <div className='mb-4 grid  grid-cols-2'>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Name</p>
                <p className='text-[16px] text-gray-700'>
                  {candidate.fullName}
                </p>
              </div>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Email</p>
                <p className='text-[16px] text-gray-700'>{candidate.email}</p>
              </div>
            </div>
            <div className='mb-4 grid  grid-cols-2'>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Experience</p>
                <p className='text-[16px] text-gray-700'>{candidate.experience} years</p>
              </div>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Salary</p>
                <p className='text-[16px] text-gray-700'>NGN {candidate.salary}</p>
              </div>
            </div>
            <div className='mb-4 grid  grid-cols-1'>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Cover Letter</p>
                <p className='text-[16px] text-gray-700'>{candidate.coverLeter}</p>
              </div>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Next of Kin</p>
                <p className='text-[16px] text-gray-700'>
                  {candidate.nextOfKinFirstName} {candidate.nextOfKinLastName}
                </p>
              </div>
            </div>
            {/* <div className=' grid  grid-cols-2'>
              <div className='mt-3'>
                <p className='text-[14px] font-[700]'>Recruitment Staff</p>
                <p className='text-[16px] text-gray-700'>
                  {candidate.staffId.firstName} {candidate.staffId.lastName}
                </p>
              </div>
            </div> */}
          </div>
        </section>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <div className=' relative  h-[300px] w-full'>
        <iframe src={candidate.cv} /> 
        </div>
        <div
          className=' relative flex h-[300px] w-full cursor-pointer items-center justify-center border'
          onClick={() => router.push(`/applications/resume/${candidate._id} `)}
        >
          <p>Click here to view Resume</p>
          {/* <Image
            src={candidate.resume}
            alt=''
            fill={true}
            className='object-cover'
          /> */}
        </div>
      </div>
    </div>
  );
};

export default BackgroundDetails;
