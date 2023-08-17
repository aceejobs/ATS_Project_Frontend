import { useAppSelector } from '@/store/store.hooks';

import { ICandidate } from '@/utils/types';

export const useSearchCandidate = (data: ICandidate[] | undefined) => {
  const { search } = useAppSelector((state) => state.search);

  const filteredData = data?.filter((value) => {
    if (
      search?.value === '' ||
      search?.value === null ||
      search?.value === undefined
    ) {
      return value;
    }
    if (
      value.firstName
        .toLocaleLowerCase()
        .includes(search?.value?.toLocaleLowerCase()) ||
      value.lastName
        .toLocaleLowerCase()
        .includes(search?.value?.toLocaleLowerCase())
    ) {
      return value;
    }
    return false;
  });

  return { filteredData };
};
