import { useReducer, useEffect, useCallback } from 'react';
import {
  PromiseFun,
  BaseOptions,
  AsyncOptions,
  NewRequestOptions,
  Result,
  RunRequest
} from './types';

const defaultOptions: BaseOptions = {
  manual: true
};

function useAsync(promiseRequest: PromiseFun, asyncOptions: AsyncOptions): Result {
  // const [] = useReducer();

  const runRequest: RunRequest = useCallback(
    (...args: any[] | [NewRequestOptions]) => {
      const { customRequest, url, requestConfig } = {
        ...defaultOptions,
        ...asyncOptions
      };

      if (customRequest) {
        promiseRequest(...args);
      } else {
        promiseRequest(args[0]?.url || url, args[0]?.requestConfig || requestConfig);
      }
    },
    [asyncOptions]
  );

  return {
    data: 123,
    loading: true,
    error: undefined,
    runRequest
    // cancelRequest: () => {}
  };
}

export default useAsync;
