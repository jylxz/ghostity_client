import React from "react";
import AnimateTabButton from "@general/AnimatedTabButton";

export default function FollowingTabsBar({
  currentTab,
  setCurrentTab,
  LiveCount,
  AllCount,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  LiveCount: number | undefined;
  AllCount: number | undefined;
}) {
  return (
    <div className="flex gap-4 mb-7 text-gray-400 relative">
      <AnimateTabButton
        tab="Live"
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        count={LiveCount}
      />
      <AnimateTabButton
        tab="All"
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        count={AllCount}
      />
      <div className="dark:border-text-secondary-dark border absolute bottom-0 w-full z-0" />
    </div>
  );
}
