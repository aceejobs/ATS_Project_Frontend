import moment from 'moment';
import Image from 'next/image';
import React from 'react';

import { ICandidate } from '@/utils/types';

const BioData = ({ candidate }: { candidate: ICandidate }) => {
  return (
    <div className='rounded-[5px] bg-white px-10 py-6 shadow-sm '>
      <div className='mb-6 rounded-[5px] bg-bg p-4 text-center font-[700]'>
        <p>Bio Data</p>
      </div>
      <section>
        <div className='relative mx-auto h-[250px] w-[238px]'>
          <Image
            fill={true}
            alt='bio'
            src={candidate.profileImage}
            className='block rounded-full object-cover'
          />
        </div>
        <p className='font-[500 mt-2 text-center text-[20x] '>
          {candidate.firstName} {candidate.lastName}
        </p>
        <div className='mt-6'>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Name</p>
            <p className='text-[16px]'>
              {candidate.firstName} {candidate.lastName}
            </p>
          </div>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Email</p>
            <p className='text-[16px]'>{candidate.email}</p>
          </div>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Address</p>
            <p className='text-[16px]'>
              {candidate.street}, {candidate.city} {candidate.country}
            </p>
          </div>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Phone Number</p>
            <p className='text-[16px]'>{candidate.phone}</p>
          </div>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Profession</p>
            <p className='text-[16px]'>{candidate.profession}</p>
          </div>
          <div className='mt-3'>
            <p className='text-[16px] font-[700]'>Date of Birth</p>
            <p className='text-[16px]'>
              {moment(candidate.dateOfBirth).format('MM/DD/YYYY')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BioData;
