import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [delayValue, setDelayValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return delayValue;
}

export default useDebounce;
