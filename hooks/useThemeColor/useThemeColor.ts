import React, { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../useLocalStorage";
import useSystemColor from "../useSystemColor/useSystemColor";

export default function useThemeColor() {
  const [systemColor] = useSystemColor();
  const [theme, setTheme] = useLocalStorage("theme", {
    theme: systemColor,
    systemOverride: false,
  });
  const overrideSystem = () => {
    document.documentElement.classList.remove("light", "dark");

    if (theme?.theme === "dark") {
      document.documentElement.classList.add("light");
      setTheme({
        theme: "light",
        systemOverride: systemColor === "dark" || false,
      });
    }

    if (theme?.theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme({
        theme: "dark",
        systemOverride: systemColor === "light" || false,
      })
    }

  };

  useEffect(() => {
    if (systemColor && !theme?.theme) {
      document.documentElement.classList.add("dark");
      setTheme({
        theme: systemColor,
        systemOverride: false,
      });
    }

    if (theme?.theme) {
      document.documentElement.classList.add(theme.theme);
    }
  }, [systemColor, theme?.theme]);

  return [theme?.theme, overrideSystem] as const;
}
