import React, { useState, useEffect } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import OrganizationSocialMedia from "./OrganizationSocialMedia";
import OrganizationWebsite from "./OrganizationWebsite";
import OrganizationYouTube from "./OrganizationYouTube";

export default function OrganizationBannerLinks({
  organization,
}: {
  organization: Organization;
}) {
  const [isWindowSmall, setIsWindowSmall] = useState<boolean>();
  const window = useWindowDimensions();

  useEffect(() => {
    if (window && window.width) {
      setIsWindowSmall(window.width < 640);
    }
  }, [window]);

  return (
    <div className=" flex flex-col md:self-start md:mt-6">
      <div className="flex flex-wrap gap-2 justify-center md:justify-end">
        <OrganizationWebsite
          url={organization.website}
          isWindowSmall={isWindowSmall}
        />
        {organization.main_channel && (
          <OrganizationYouTube
            url={organization.main_channel}
            isWindowSmall={isWindowSmall}
          />
        )}
        {organization.social_media.map((social) => (
          <OrganizationSocialMedia
            key={social.url}
            social={social}
            isWindowSmall={isWindowSmall}
          />
        ))}
      </div>
    </div>
  );
}
