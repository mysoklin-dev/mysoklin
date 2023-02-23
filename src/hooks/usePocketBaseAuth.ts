import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    if (isBrowser) {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
      } catch {
        // Return the initial value if there's an error with localStorage
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (isBrowser) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore errors with localStorage
      }
    }
  }, [key, value]);

  return [value, setValue];
};

const usePocketBaseAuth = (): [
  string | null,
  (value: string | null) => void
] => {
  return useLocalStorage<any | null>('pocketbase_auth', null) as any;
};

export default usePocketBaseAuth;
