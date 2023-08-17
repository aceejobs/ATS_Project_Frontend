/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';

import { APIResponse } from '@/utils/types';

import baseAxiosMethod from './baseAxiosMethod';

export const postRequest = async <ResponseData = any>({
  url,
  data,
  config,
}: {
  url: string;
  data: any;
  config?: AxiosRequestConfig;
}) => {
  const response = await baseAxiosMethod.post<APIResponse<ResponseData>>(
    url,
    data,
    config
  );

  return response?.data || response;
};

export const putRequest = async ({
  url,
  data,
}: {
  url: string;
  data?: any;
}) => {
  const response = await baseAxiosMethod.put(url, data);
  return response?.data || response;
};

export const patchRequest = async ({
  url,
  data,
  config,
}: {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}) => {
  const response = await baseAxiosMethod.patch(url, data, config);
  return response?.data || response;
};

export const getRequest = async <ResponseData = any, FormatResponse = any>(
  { url, params }: { url: string; params?: any },
  formatResponse?: (data: ResponseData) => FormatResponse
): Promise<ResponseData> => {
  const response = await baseAxiosMethod.get<APIResponse<ResponseData>>(url, {
    params,
  });
  if (formatResponse) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return formatResponse(response?.data.data);
  }
  return response?.data.data;
};

export const deleteRequest = async ({
  url,
  data,
}: {
  url: string;
  data?: any;
}) => {
  const response = await baseAxiosMethod.delete(url, { data });
  return response?.data || response;
};
