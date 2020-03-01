import { useRef, useCallback } from 'react';

export type DebounceFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  clear: () => void;
}

function useDebounce<T extends any[]>(fn: DebounceFn<T>, delay: number = 300): RV<T> {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const fnRef = useRef<DebounceFn<T>>(fn);
  fnRef.current = fn;

  const clear = useCallback(() => {
    timer.current && clearTimeout(timer.current);
  }, []);

  const run = useCallback(
    (...args: T) => {
      clear();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay, clear]
  );

  return { run, clear };
}

export default useDebounce;
