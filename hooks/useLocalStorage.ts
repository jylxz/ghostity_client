import React, { useEffect, useMemo, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [item, setItem] = useState<T>();
  const hasWindow = typeof window !== "undefined"
  const stringifiedItem = useMemo(() => JSON.stringify(item), [item]);

  useEffect(() => {
    if (hasWindow) {
      const getItem = localStorage.getItem(key);

      if (!getItem) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        setItem(defaultValue)
      } else {
        setItem(JSON.parse(getItem));
      }
    }
  }, [hasWindow]);

  useEffect(() => {
    if (item !== defaultValue) {
      localStorage.setItem(key, stringifiedItem);
    }
  }, [item]);

  return [item, setItem] as const;
}
