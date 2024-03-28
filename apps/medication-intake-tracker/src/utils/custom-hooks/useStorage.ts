import { useState } from 'react';

type SetValue<T> = (value: T) => void;
type UseStorageHookResult<T> = [T, SetValue<T>];

export function useStorage<T>(key: string, initialValue: T): UseStorageHookResult<T> {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}