import { useState, useRef, useCallback } from 'react';

export type ThrottleFn<T extends any[]> = (...args: T) => any;

export interface RV<T extends any[]> {
  run: (...args: T) => void;
  clear: () => void;
}

function useThrottle<T extends any[]>(fn: ThrottleFn<T>, delay: number = 0): RV<T> {
  const [pendding, setPendding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const fnRef = useRef<ThrottleFn<T>>(fn);
  fnRef.current = fn;

  const clear = useCallback(() => {
    timer.current && clearTimeout(timer.current);
  }, []);

  const run = useCallback(
    (...args: T) => {
      if (!pendding) {
        setPendding(true);
        clear();
        timer.current = setTimeout(() => {
          setPendding(false);
          fnRef.current(...args);
        }, delay);
      }
    },
    [clear, pendding, delay]
  );

  return { run, clear };
}

export default useThrottle;
