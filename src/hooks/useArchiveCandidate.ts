import { useMutation, useQueryClient } from 'react-query';

import { archiveCandidate } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';

export default function useArchiveCandidate() {
  const queryClient = useQueryClient();

  const {
    mutate: handleArchiveCandidate,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: archiveCandidate,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getActiveCandidates,
      });
    },
  });

  return { handleArchiveCandidate, isLoading, isSuccess };
}
