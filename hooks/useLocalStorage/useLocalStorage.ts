import React, { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [item, setItem] = useState<T | undefined>(undefined);
  const hasWindow = typeof window !== "undefined"

  useEffect(() => {
    if (hasWindow) {
      const getItem = localStorage.getItem(key);

      if (!getItem) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        setItem(defaultValue)
      } else {
        setItem(JSON.parse(getItem) as T);
      }
    }
  }, [hasWindow]);

  useEffect(() => {
    if (item !== undefined) {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [item, setItem]);

  return [item, setItem] as const;
}
