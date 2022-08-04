import AnimatedTabButton from "@general/AnimatedTabButton";
import React, { Dispatch, SetStateAction } from "react";

export default function OrganizationTabsBar({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex gap-4 mb-7 relative">
      <AnimatedTabButton
        tab="Live Members"
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        layoutId="organization"
      />
      <AnimatedTabButton
        tab="All Members"
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        layoutId="organization"
      />
      <div className="dark:border-text-secondary-dark border absolute bottom-0 w-full z-0" />
    </div>
  );
}
