import useAsync from './useAsync';
import fetching from './fetching';
import { Request, Options, Result, PromiseFun } from './types';

function useRequest(requestParams: Request, options?: Options): Result {
  let promiseRequest: PromiseFun;
  if (typeof requestParams === 'string') {
    promiseRequest = () => fetching(requestParams);
  } else if (typeof requestParams === 'function') {
    promiseRequest = requestParams;
  } else {
    const { url, ...config } = requestParams;
    promiseRequest = () => fetching(url, config);
  }

  return useAsync(promiseRequest, options);
}

export default useRequest;
