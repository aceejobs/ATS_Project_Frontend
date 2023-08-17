/* eslint-disable @typescript-eslint/no-explicit-any */
import { throwError } from './error';

export const processResponse = (response: any) => {
  if (!response) {
    throwError({
      response: {
        data: {
          message: 'Something went wrong, try again later.',
        },
      },
    });

    return null;
  }

  // if (response?.statusCode === '99') {
  // 	throwError({
  // 		response: {
  // 			data: {
  // 				message:
  // 					response?.message || 'Something went wrong, try again later.',
  // 			},
  // 		},
  // 	});

  // 	return null;
  // }

  return response.data;
};
