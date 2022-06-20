import { useState, useReducer, useEffect, useCallback } from 'react';
import {
  PromiseFun,
  BaseOptions,
  AsyncOptions,
  RunRequest,
  BaseResult,
  BaseFunResult,
  CacheResult,
  Result
} from './types';

const defaultOptions: BaseOptions = {
  manual: true
};

const initialResult = {
  data: undefined,
  loading: false,
  error: undefined,
  params: []
};

function useAsync(promiseRequest: PromiseFun, asyncOptions: AsyncOptions): Result {
  const [currentResult, setCurrentResult] = useState<BaseResult>({ ...initialResult });
  const [cachedResults, setCachedResults] = useState<CacheResult>({});

  const runRequest: RunRequest = useCallback(
    async (...args: any[]) => {
      const { cacheKey, coverLastResult } = {
        ...defaultOptions,
        ...asyncOptions
      };

      // 当需要覆盖上一次结果时
      if (coverLastResult) {
        if (cacheKey) {
          setCachedResults(oldState => ({
            ...oldState,
            [cacheKey]: {
              ...initialResult,
              loading: true,
              params: args,
              resetData,
              runRequest,
              cancelRequest
            }
          }));
        } else {
          setCurrentResult({
            ...initialResult,
            loading: true,
            params: args
          });
        }
      }

      await promiseRequest(...args)
        .then((data) => {
          console.log(data);
        })
        .catch(error => error);
    },
    [asyncOptions]
  );

  const cancelRequest = useCallback(() => {
    console.log(111);
  }, []);

  const resetData = useCallback(() => {
    console.log(222);
  }, []);

  return {
    ...currentResult,
    cachedResults,
    runRequest,
    cancelRequest,
    resetData
  };
}

export default useAsync;
