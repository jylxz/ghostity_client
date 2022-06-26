import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function GradientCircularProgress({
  loading = true,
}: {
  loading?: boolean;
}) {
  return loading ? (
    <>
      <svg className="w-0 h-0">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor="#DEECFC" />
          <stop offset="90%" stopColor="#F1F9F9" />
        </linearGradient>
      </svg>
      <CircularProgress
        thickness={4}
        sx={{ "svg circle": { stroke: "url(#linearColors)" } }}
        size="4rem"
      />
    </>
  ) : null;
}
