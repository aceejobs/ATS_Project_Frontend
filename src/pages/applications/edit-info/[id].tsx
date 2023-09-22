import { useRouter } from 'next/router';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';

import EditCandidatesForm from '@/components/lib/editCandidateForm/EditCandidateForm';
import Header from '@/components/lib/header/Header';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';
import Skeleton from '@/components/Skeleton';

import { getSingleCandidate } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';
import { ICandidate } from '@/utils/types';

const EditInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const candidateId = router.query.id;

  const { data } = useQuery({
    queryKey: ['candidate', candidateId],
    queryFn: () => getSingleCandidate(candidateId as string),

    initialData: () => {
      const activeCandidates = queryClient.getQueryData<ICandidate[]>(
        queryKeys.getActiveCandidates
      );
      const inactiveCandidates = queryClient.getQueryData<ICandidate[]>(
        queryKeys.getInactiveCandidates
      );

      const candidateData = [
        ...(activeCandidates || []),
        ...(inactiveCandidates || []),
      ].find((candidate) => candidate._id === candidateId);

      return candidateData;
    },
  });
  return (
    <MainContentLayout>
      <Header text='Candidate Details' add />

      <div className='mt-3     w-full rounded-[10px] bg-white py-10 px-20 shadow-lg'>
        {data ? (
          <EditCandidatesForm candidate={data} />
        ) : (
          <Skeleton className='my-3 h-20 w-full' />
        )}
      </div>
    </MainContentLayout>
  );
};

export default EditInfo;
