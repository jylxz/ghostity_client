import React, { useEffect, useState } from "react";

export default function useRandomProfileIcon() {
  const [profileIcon, setProfileIcon] = useState<string>();
  const profileIconLinks =
    process.env.NEXT_PUBLIC_PROFILE_ICON_LINKS?.split(",");
  const randomNumber = Math.floor(Math.random() * 8);

  useEffect(() => {
    if (profileIconLinks) {
      setProfileIcon(profileIconLinks[randomNumber]);
    }
  }, [profileIconLinks, randomNumber]);

  return [profileIcon];
}
