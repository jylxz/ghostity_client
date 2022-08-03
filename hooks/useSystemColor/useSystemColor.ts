import React, {useState, useEffect} from 'react'

export default function useSystemColor() {
  const [systemColor, setSystemColor] = useState<"light" | "dark" | undefined>()

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSystemColor("dark")
    } else {
      setSystemColor("light")
    }
  }, [])

  return [systemColor] as const
}
