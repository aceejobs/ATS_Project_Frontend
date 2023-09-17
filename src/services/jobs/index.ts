import { deleteRequest, getRequest, postRequest } from '@/utils/api/calls';

import { CreateJobPayload, IJobs, IJobsData, JobStatus } from './payload';
import { patchRequest } from '../../utils/api/calls';

const ENDPOINT = '/jobs';

export const createJob = (data: CreateJobPayload) => {
  return postRequest({
    url: ENDPOINT,
    data,
  });
};

export const updateJob = (
  id: string | string[] | undefined,
  data: CreateJobPayload
) => {
  return patchRequest({
    url: `${ENDPOINT}/${id}`,
    data,
  });
};

// export const activateCandidate = (id: string) => {
//   return patchRequest({
//     url: `${ENDPOINT}/activate/${id}`,
//   });
// };

export const getAllJobs = () => {
  return getRequest({
    url: `${ENDPOINT}/overview`,
  });
};

export const getAQualifiedJob = (id: string | undefined | string[]) => {
  return getRequest<IJobsData>({
    url: `${ENDPOINT}/qualified/${id}`,
  });
};

export const getASingleJob = (id: string | undefined | string[]) => {
  return getRequest<IJobs>({
    url: `${ENDPOINT}/${id}`,
  });
};

export const deleteAJob = (id: string | undefined | string[]) => {
  return deleteRequest({
    url: `${ENDPOINT}/${id}`,
  });
};
export const changeJobStatus = (
  id: string | undefined | string[],
  data: JobStatus
) => {
  return patchRequest({
    url: `${ENDPOINT}/status/${id}`,
    data,
  });
};
