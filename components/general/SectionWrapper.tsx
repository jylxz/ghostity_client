import React from "react";

function SectionWrapper({ children, color, className }: {children: React.ReactNode; color: string; className?: string}) {
  return (
    <section className={`${color} py-10 px-4  ${className || ""}`}><div className="mx-auto sm:w-[min(80%,_96rem)]">{children}</div></section>
  );
}

export default SectionWrapper;
