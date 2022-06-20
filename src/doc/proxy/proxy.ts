export const proxyHandler: ProxyHandler<any> = {
  get(target: any, prop: string | number | symbol, receiver: any): any {
    return {};
  },
  set(target: any, prop: string | number | symbol, value: any, receiver: any): boolean {
    return true;
  },
  apply(target: any, thisArg: any, argArray?: any): any {},
  construct(target: any, argArray: any, newTarget?: any): object {
    return {};
  },
  defineProperty(target: any, p: string | number | symbol, attributes: PropertyDescriptor): boolean {
    return true;
  },
  deleteProperty(target: any, p: string | number | symbol): boolean {
    return true;
  },
  getOwnPropertyDescriptor(target: any, p: string | number | symbol): PropertyDescriptor {
    return {};
  },
  getPrototypeOf(target: any): object {
    return {};
  },
  has(target: any, p: string | number | symbol): boolean {
    return true;
  },
  isExtensible(target: any): boolean {
    return true;
  },
  ownKeys(target: any): Array<string | number | symbol> {
    return [];
  },
  preventExtensions(target: any): boolean {
    return true;
  },
  setPrototypeOf(target: any, v: any): boolean {
    return true;
  }
}

const { proxy, revoke } = Proxy.revocable({}, proxyHandler);
