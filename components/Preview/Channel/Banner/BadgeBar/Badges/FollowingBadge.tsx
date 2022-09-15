import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

export default function FollowingBadge({ following }: { following: boolean }) {
  const [showText, setShowText] = useState(false);

  switch (following) {
    case true:
      return (
        <div
          className="relative bg-gray-300 dark:bg-primary rounded-full w-5 h-5 flex items-center justify-center"
          onPointerEnter={() => setShowText(true)}
          onPointerLeave={() => setShowText(false)}
        >
          <AiFillHeart fill="red" />
          {showText && (
            <div className="absolute whitespace-nowrap left-3 top-4 bg-secondary-alt-2 dark:bg-secondary-dark py-1 px-2 rounded text-sm">
              Following since
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
