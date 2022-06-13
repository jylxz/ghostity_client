import React from "react";

function SectionWrapper({ children, color, className }: {children: React.ReactNode; color: string; className?: string}) {
  return (
    <section className={`${color} py-10 px-4 sm:px-24 ${className || ""}`}>{children}</section>
  );
}

export default SectionWrapper;
