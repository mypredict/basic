import { useEffect, useCallback } from 'react';
import { Options, Result, PromiseFun } from './types';

const defaultOptions: Options = {
  manual: true
};

function useAsync(promiseRequest: PromiseFun, options = defaultOptions): Result {
  const request = useCallback(() => {
    const a = promiseRequest();
    a.then(data => console.log(data));
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return {
    data: 123,
    loading: true,
    error: undefined
  };
}

export default useAsync;
