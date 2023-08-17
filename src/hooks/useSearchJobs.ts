import { useAppSelector } from '@/store/store.hooks';

import { IJobsData } from '@/services/jobs/payload';

export const useSearchJobs = (data: IJobsData[] | undefined) => {
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
      value.job.title
        .toLocaleLowerCase()
        .includes(search?.value?.toLocaleLowerCase())
    ) {
      return value;
    }
    return false;
  });

  return { filteredData };
};
