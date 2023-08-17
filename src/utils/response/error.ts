/* eslint-disable @typescript-eslint/no-explicit-any */
import toaster from 'react-hot-toast';

export const throwError = (error: any) => {
  toaster.error(
    error?.response?.data?.error || 'Something went wrong, try again later.'
  );
};
