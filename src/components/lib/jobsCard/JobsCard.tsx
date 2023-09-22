import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { JobCardProps } from '@/components/lib/jobsCard/type';

import queryKeys from '@/utils/api/queryKeys';

import { changeJobStatus, deleteAJob } from '../../../services/jobs/index';

const JobsCard: React.FC<JobCardProps> = ({ data }) => {
  const router = useRouter();
  const [showTip, setShowTip] = useState(true);
  const [currentId, setCurrentId] = useState('');
  const tipRef = useRef<null | HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const moveToNext = () => {
    if (data.job.isAvailable) {
      router.push({
        pathname: `/jobs/view-job/${data?.job._id}`,
        // query: { id: data?.job._id },
      });
    }
  };

  useOnClickOutside(tipRef, () => setShowTip(false));

  const { mutate, isLoading } = useMutation(
    [queryKeys.deleteAJob],
    () => deleteAJob(data.job._id),
    {
      onSuccess(response) {
        toast.success(response.message);
        setShowTip(false);
        queryClient.invalidateQueries(queryKeys.getAllJobs);
      },
    }
  );
  const { mutate: statusMutate, isLoading: statusLoading } = useMutation(
    [queryKeys.changeJobStatus],
    () =>
      changeJobStatus(data.job._id, {
        status: !data.job.isAvailable,
      }),
    {
      onSuccess(response) {
        if (response) {
          toast.success('Job status updated');
          setShowTip(false);
          queryClient.invalidateQueries(queryKeys.getAllJobs);
        }
      },
    }
  );

  if (isLoading || statusLoading) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        className='fixed inset-0 z-[9999]'
      ></div>
    );
  }

  return (
    <div
      className={`jobs-card border-l-[8px]  bg-white p-6 ${
        data.job?.isAvailable
          ? 'cursor-pointer border-ace-blue '
          : 'border-ace-red text-[#7a7a7a]'
      }`}
    >
      <div
        ref={tipRef}
        className=' relative flex flex-wrap items-center justify-between'
      >
        <p className='w-[90%] text-[16px] '> {data.job?.title}</p>
        <Icon
          icon='carbon:overflow-menu-vertical'
          className='w-[10%] cursor-pointer text-xl'
          onClick={() => {
            setShowTip(true);
            setCurrentId(data?.job._id);
          }}
        />
        {showTip && currentId === data.job._id && (
          <div
            ref={tipRef}
            className='absolute top-10 -right-0 z-[999]  w-[117px] rounded-[5px] bg-white  p-4 text-[12px] text-ace-black shadow'
          >
            <div>
              <div
                onClick={() => statusMutate()}
                className='flex cursor-pointer items-center  gap-3'
              >
                <Image
                  src='/assets/svg/deactivate.svg'
                  alt='archive'
                  width={15}
                  height={15}
                />
                {data.job.isAvailable ? <p>Deactivate</p> : <p>Activate</p>}
              </div>
              <div className=' mt-2 flex cursor-pointer items-center  gap-3'>
                <Image
                  src='/assets/svg/archive-blue-2.svg'
                  alt='archive'
                  width={16}
                  height={16}
                />
                <p>Archive</p>
              </div>
              <div
                onClick={() => mutate()}
                className='mt-2 flex cursor-pointer items-center  gap-3'
              >
                <Image
                  src='/assets/svg/bin.svg'
                  alt='archive'
                  width={15}
                  height={15}
                />
                <p className='text-ace-red'>Delete</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className='mt-2 font-light'>{data.job?.company}</p>
      <div
        onClick={moveToNext}
        className={`my-4 w-full rounded-[5px]  px-2 py-3 text-center ${
          data.job?.isAvailable ? 'bg-ace-light-blue' : 'bg-[#E4E3E3]'
        }`}
      >
        <p className='text-[12px]  font-light'>Qualified Candidates</p>
        <div className='mt-2 flex items-center justify-center gap-2'>
          <Image
            alt='candidate'
            src={
              data.job?.isAvailable
                ? '/assets/svg/cand.svg'
                : '/assets/svg/grey-cand.svg'
            }
            width={30}
            height={30}
          />
          <p className='text-[18px]'>{data.totalCandidates}</p>
        </div>
      </div>
      <div className='flex items-center justify-between text-[12px]'>
        <p>{data.job?.location}</p>
        <p>₦ {data.job?.salary.toLocaleString()}</p>
      </div>
      <p className=' text-[12px]'>{data.job?.jobType}</p>
    </div>
  );
};

export default JobsCard;
