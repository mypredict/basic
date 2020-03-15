import { useRef, useMemo } from 'react';
import useAsync from './useAsync';
import fetching from './fetching';
import { RequestParams, PromiseFun, Options, AsyncOptions, Result } from './types';

function useRequest(requestParams: RequestParams, options: Options = {}): Result {
  const requestParamsRef = useRef<RequestParams>(requestParams);
  requestParamsRef.current = requestParams;

  const optionsRef = useRef<Options>(options);
  optionsRef.current = options;

  const request: [PromiseFun, AsyncOptions] = useMemo(() => {
    // requestParams 为字符串(url)时, 默认使用 useFetch 发送请求
    if (typeof requestParams === 'string') {
      return [fetching, { url: requestParams, ...options, customRequest: false }];
    }

    // requestParams 为函数(自定义请求)时, options 只包含请求本身配置外的配置
    if (typeof requestParams === 'function') {
      return [requestParams, { url: '', ...options, customRequest: true }];
    }

    // requestParams 为一个对象时, 默认请求配置都在此对象中, options 只包含请求本身配置外的配置
    const { url, ...requestConfig } = requestParams;
    return [fetching, { url, ...options, requestConfig, customRequest: false }];
  }, [requestParams, options]);

  return useAsync(request[0], request[1]);
}

export default useRequest;
