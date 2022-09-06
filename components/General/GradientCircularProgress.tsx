import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function GradientCircularProgress({
  loading = true,
  size = "4rem",
}: {
  loading?: boolean;
  size?: string;
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
        role="progressbar"
        thickness={4}
        sx={{ "svg circle": { stroke: "url(#linearColors)" } }}
        size={size}
      />
    </>
  ) : null;
}
