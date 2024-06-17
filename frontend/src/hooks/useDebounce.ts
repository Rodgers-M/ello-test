import { useEffect, useMemo, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;
// eslint-disable-next-line
type CallbackFunction = (...args: any[]) => void;

// this can be extracted to a utils file and be reused elsewhere on the app
function debounce(callback: CallbackFunction, delay: number) {
  let timeout: Timer;

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const useDebounce = (callback: CallbackFunction, delay = 500) => {
  const ref = useRef<undefined | CallbackFunction>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const currentCallback = () => {
      // ref.current will have a reference to the latest callback
      ref.current?.();
    };

    return debounce(currentCallback, delay);
  }, []);

  return debouncedCallback;
};
