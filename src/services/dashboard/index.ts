import {
  IDemographicData,
  IOverviewData,
  IPlotData,
} from '@/services/dashboard/payload';
import { getRequest } from '@/utils/api/calls';

type DateFilter = { startDate?: string; stopDate?: string };

const getOverViewData = (data: DateFilter = {}) => {
  return getRequest<IOverviewData[]>({
    url: `/jobs`,
    params: data,
  });
};

const getDemographicData = (data: DateFilter = {}) => {
  return getRequest<IDemographicData[]>({
    url: `/applicants`,
    params: data,
  });
};

const getPlotData = (data: DateFilter = {}) => {
  return getRequest<IPlotData>({
    url: `/admin/plot`,
    params: data,
  });
};

export { getDemographicData, getOverViewData, getPlotData };
