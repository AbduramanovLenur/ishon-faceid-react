import { useSyncExternalStore } from "react";

const EVENT = "storage:change";

const notify = () => window.dispatchEvent(new Event(EVENT));

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

export const getStorageItem = (key: string) => localStorage.getItem(key);

export const setStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
  notify();
};

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key);
  notify();
};

export const useStorage = (key: string): string | null => useSyncExternalStore(subscribe, () => getStorageItem(key));
