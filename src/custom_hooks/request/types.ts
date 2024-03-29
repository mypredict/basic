export interface RequestOptions {
  url: string;
  config?: Object;
}

export interface NewRequestOptions {
  url?: string;
  requestConfig?: Object;
}

export interface FetchConfig {
  [key: string]: any;
}

export interface RequestConfig {
  url: string;
  [key: string]: any;
}

// 函数定义
export interface PromiseFun {
  (...args: any[]): Promise<any>;
}

export type RunRequest = (...args: any[] | [NewRequestOptions]) => void;

export type RequestParams = string | RequestConfig | PromiseFun;

// 配置定义
export interface BaseOptions {
  dependencies?: Array<any>; // 重新发起请求的依赖(默认只依赖url)
  initialData?: any; // 初始返回数据
  manual?: boolean; // 是否手动触发请求
  polling?: boolean; // 是否开启轮询
  pollingDelay?: number; // 轮询时间间隔
  loadingDelay?: number; // 请求过程中loading出现时间
  debounce?: number; // 是否开启防抖
  throttle?: number; // 是否开启节流
  cacheKey?: string; // 是否开启缓存返回值
  coverLastResult?: boolean; // 当重新发起请求时是否覆盖上一次结果
  onSuccess?: (data: any | undefined, params: any) => void; // 请求成功回调
  onError?: (error: Error | undefined, params: any) => void; // 请求失败回调
}

export interface Options extends BaseOptions {
  requestConfig?: Object; // 请求配置
}

export interface AsyncOptions extends Options {
  url: string; // 请求的url
  customRequest: boolean; // 是否是自定义请求
}

// 返回值定义
export interface BaseResult {
  data: any;
  loading: boolean;
  error: Error | undefined;
  params: Array<any>;
}

export interface BaseFunResult {
  runRequest: RunRequest;
  cancelRequest: Function;
  resetData: Function;
}

export interface CacheResult {
  [key: string]: BaseResult & BaseFunResult;
};

export interface Result extends BaseResult, BaseFunResult {
  cachedResults: CacheResult;
}
