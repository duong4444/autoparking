import { useEffect, useState } from 'react';

// <T> cho phép useDebounce hđộng vs bky` kiểu dlieu nào
export const useDebounce = <T>(
  value: T,
  delay = 1000,
): // return value của hàm , T giá trị debounce
[T, { debouncing: boolean }] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // true: đang chờ để cập nhật gtri, false: đã hoàn tất
  const [debouncing, setDebouncing] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncing(false);
    }, delay);

    setDebouncing(true);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, { debouncing }];
};
