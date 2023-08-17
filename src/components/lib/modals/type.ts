import { UseMutateFunction } from 'react-query';

import { APIResponse } from '@/utils/types';

export interface GenModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  title?: string;
  id?: string;
  company?: string;
}
export interface IDeleteAlertProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  candidate: { first: string; last: string; id: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteFn: UseMutateFunction<any, unknown, string, { snapshot: unknown }>;
  loading: boolean;
}
export interface IArchiveAlertProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  candidate: { first: string; last: string; id: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  archiveFn: UseMutateFunction<any, unknown, string, unknown>;
  loading: boolean;
}
export interface IHireOrInterviewAlertProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  candidate: { first: string; last: string; id: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hireFn: UseMutateFunction<APIResponse<any>, unknown, void, unknown>;
  loading: boolean;
  status: string;
}
