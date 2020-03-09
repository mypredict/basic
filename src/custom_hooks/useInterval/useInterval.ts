import { useRef, useCallback, useEffect } from 'react';

export type Fn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  clear: () => void;
}

function useInterval<T extends any[]>(fn: Fn<T>, delay: number = 0): RV<T> {
  const timer = useRef<ReturnType<typeof setInterval>>();

  const fnRef = useRef<Fn<T>>(fn);
  fnRef.current = fn;

  const clear = useCallback(() => {
    timer.current && clearInterval(timer.current);
  }, []);

  const run = useCallback(
    (...args: T) => {
      clear();
      timer.current = setInterval(() => {
        fnRef.current(...args);
      }, delay);
    },
    [clear, delay]
  );

  useEffect(() => {
    console.log(1111);
    return () => {
      console.log('end');
    };
  }, []);

  return { run, clear };
}

export default useInterval;
