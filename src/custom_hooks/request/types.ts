export type PromiseFun = () => Promise<any>;
export interface RequestConfig {
  url: string;
  [key: string]: any;
}
export type Request = string | RequestConfig | PromiseFun;

export type Options = {
  dependencies?: Array<any>; // 重新发起请求的依赖(默认只依赖url)
  initData?: any; // 初始返回数据
  manual?: boolean; // 是否手动触发请求
  polling?: boolean; // 是否开启轮询
  pollingDelay?: number; // 轮询时间间隔
  loadingDelay?: number; // 请求过程中loading出现时间
  debounce?: number; // 是否开启防抖
  throttle?: number; // 是否开启节流
  onSuccess?: (data: any | undefined, params: any) => void; // 请求成功回调
  onError?: (error: Error | undefined, params: any) => void; // 请求失败回调
};

export type Result = {
  data: any;
  loading: boolean;
  error?: Error;
  runRequest?: (url?: string, options?: any) => Promise<any>;
};
