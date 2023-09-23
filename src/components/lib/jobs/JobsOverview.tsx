import React from 'react';

import { useSearchJobs } from '@/hooks/useSearchJobs';

import { JobsOverviewProps } from '@/components/lib/jobs/type';
import JobsCard from '@/components/lib/jobsCard/JobsCard';

const JobsOverview: React.FC<JobsOverviewProps> = ({ data }) => {
  const { filteredData } = useSearchJobs(data);
  return (
    <>
      <div className='grid grid-cols-2 gap-4 xl:grid-cols-3'>
        {data &&
          filteredData?.map((item, index) => (
            <JobsCard key={index} data={item} />
          ))}
      </div>
    </>
  );
};

export default JobsOverview;
