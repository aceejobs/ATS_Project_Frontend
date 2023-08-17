import { useAppSelector } from '@/store/store.hooks';

import { IOverviewData } from '@/services/dashboard/payload';

export const useSearchActivity = (data: IOverviewData[] | undefined) => {
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
      value._id.toLocaleLowerCase().includes(search?.value?.toLocaleLowerCase())
    ) {
      return value;
    }
    return false;
  });

  return { filteredData };
};
