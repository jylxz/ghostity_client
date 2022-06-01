import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@mui/material/LinearProgress";

export default function PageProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(50));
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    });
    router.events.on("routeChangeError", () => {
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    });
  }, [router.events]);

  return (
    <div className="w-full">
      <LinearProgress
        variant="determinate"
        className="bg-gradient-to-r from-primary via-secondary to-secondary2 child:bg-gray-400 h-1"
        value={progress}
      />
    </div>
  );
}
