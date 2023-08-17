import { QueryKey, useMutation, useQueryClient } from 'react-query';

import { deleteCandidate } from '@/services/candidate';
import { ICandidate } from '@/utils/types';

export default function useDeleteCandidate({
  queryKey,
}: {
  queryKey: QueryKey;
}) {
  const queryClient = useQueryClient();

  const {
    mutate: handleDeleteCandidate,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: deleteCandidate,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const snapshot = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(
        queryKey,
        (oldData?: ICandidate[]) => oldData?.filter((c) => c._id !== id) || []
      );
      return { snapshot };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(queryKey, context?.snapshot);
    },
  });

  return { handleDeleteCandidate, isLoading, isSuccess };
}
