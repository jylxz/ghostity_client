import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function GradientCircularProgress() {
  return (
    <>
      <svg className="w-0 h-0">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor="#39F" />
          <stop offset="90%" stopColor="#F3F" />
        </linearGradient>
      </svg>
      <CircularProgress
        thickness={4}
        sx={{ "svg circle": { stroke: "url(#linearColors)" } }}
        size="4rem"
      />
    </>
  );
}
