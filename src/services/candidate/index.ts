import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/utils/api/calls';
import { ICandidate, ICandidateFilter } from '@/utils/types';

const ENDPOINT = '/candidate';

export const createCandidate = (data: FormData) => {
  return postRequest<ICandidate>({
    url: ENDPOINT,
    data,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });
};
export const updateCandidate = (id: string, data: FormData) => {
  return patchRequest({
    url: `${ENDPOINT}/${id}`,
    data,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  });
};
export const activateCandidate = (id: string) => {
  return patchRequest({
    url: `${ENDPOINT}/activate/${id}`,
  });
};
export const sendPaymentLink = (id: string) => {
  return postRequest({
    url: `/payment`,
    data: {
      amount: 5000,
      candidateId: id,
    },
  });
};
export const archiveCandidate = (id: string) => {
  return patchRequest({
    url: `${ENDPOINT}/archive/${id}`,
  });
};
export const deleteCandidate = (id: string) => {
  return deleteRequest({
    url: `${ENDPOINT}/${id}`,
  });
};

export const getSingleCandidate = (id: string) => {
  return getRequest<ICandidate>({
    url: `${ENDPOINT}/${id}`,
  });
};

export const getActiveCandidates = async (filter?: ICandidateFilter) => {
  const response = await getRequest<ICandidate[]>({
    url: `${ENDPOINT}`,
    params: { profileMode: 'Active', ...filter },
  });
  return response;
};
export const getInactiveCandidates = async (filter?: ICandidateFilter) => {
  const response = await getRequest<ICandidate[]>({
    url: `${ENDPOINT}`,
    params: { profileMode: 'Inactive', ...filter },
  });
  return response;
};

export const setHireOrInterviewCandidate = (
  data: string,
  id: string | string[] | undefined
) => {
  const response = patchRequest({
    url: `${ENDPOINT}/${id}`,
    data: {
      jobStatus: data,
    },
  });
  return response;
};
