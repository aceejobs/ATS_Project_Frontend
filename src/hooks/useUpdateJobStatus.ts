import { useMutation, useQueryClient } from 'react-query';

import { setHireOrInterviewCandidate } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';

export default function useUpdateJobStatus(id: string, status: string) {
  const queryClient = useQueryClient();

  const {
    mutate: handleUpdateJobStatus,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: () => setHireOrInterviewCandidate(status, id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getQualifiedJob);
    },
  });

  return { handleUpdateJobStatus, isLoading, isSuccess };
}
