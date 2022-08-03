import React from "react";
import AnimatedButton from "@general/AnimatedButton";

export default function HomeStatsTimeSettings({
  time,
  setTime,
}: {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex gap-2 text-sm justify-center sm:justify-end ">
      <AnimatedButton
        onClick={() => setTime("1day")}
        className={`px-2 py-0.5 rounded dark:border-0 border-2 shadow-sm ${
          time === "1day"
            ? "dark:bg-secondary-dark dark:text-primary text-black border-primary bg-white font-medium"
            : "dark:bg-text-secondary-dark dark:text-gray-300 text-gray-400 bg-gray-100 "
        }`}
      >
        1 Day
      </AnimatedButton>
      <AnimatedButton
        onClick={() => setTime("3day")}
        className={`px-2 py-0.5 rounded dark:border-0 border-2 shadow-sm ${
          time === "3day"
            ? "dark:bg-secondary-dark dark:text-primary text-black border-primary bg-white font-medium"
            : "dark:bg-text-secondary-dark dark:text-gray-300 bg-gray-100"
        }`}
      >
        3 Day
      </AnimatedButton>
      <AnimatedButton
        onClick={() => setTime("week")}
        className={` px-2 py-0.5 rounded dark:border-0 border-2 shadow-sm ${
          time === "week"
            ? "dark:bg-secondary-dark dark:text-primary text-black border-primary bg-white font-medium"
            : "dark:bg-text-secondary-dark dark:text-gray-300 bg-gray-100"
        }`}
      >
        Week
      </AnimatedButton>
      <AnimatedButton
        onClick={() => setTime("month")}
        className={`px-2 py-0.5 rounded dark:border-0 border-2 shadow-sm ${
          time === "month"
            ? "dark:bg-secondary-dark dark:text-primary text-black border-primary bg-white font-medium "
            : "dark:bg-text-secondary-dark dark:text-gray-300 bg-gray-100 "
        }`}
      >
        Month
      </AnimatedButton>
    </div>
  );
}
