import type { QueryClientConfig } from 'react-query';

import { throwError } from '../response/error';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      onError: (error) => {
        throwError(error);
      },
    },
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      onError: (error) => {
        throwError(error);
      },
    },
  },
};
