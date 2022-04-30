import React from "react";

function SectionWrapper({ children, color }) {
  return (
    <section className={`${color} py-10 px-4 sm:px-24`}>{children}</section>
  );
}

export default SectionWrapper;
