import Image from "next/image";
import BackgroundWrapper from "@general/BackgroundWrapper";
import React from "react";
import { IoMdClose } from "react-icons/io";
import PreviewChannelBannerExternals from "./Externals/PreviewChannelBannerExternals";
import PreviewChannelBannerBadgeBar from "./BadgeBar/PreviewChannelBannerBadgeBar";
import PreviewChannelBannerFollowButton from "./FollowButton/PreviewChannelBannerFollowButton";

export default function PreviewChannelBanner({
  profile,
  setShowPreview,
}: {
  profile: Profile;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <BackgroundWrapper>
      <div className="h-44 p-4 flex items-center justify-between gap-4 dark:bg-primary-dark bg-primary">
        <div className="flex items-center gap-4">
          <Image
            src={profile.profile.img}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl flex items-center">
              {profile.name}
              <PreviewChannelBannerFollowButton profile={profile}/>
            </h1>
            <PreviewChannelBannerBadgeBar profile={profile} />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <button
            type="button"
            className="self-end"
            onClick={() => setShowPreview(false)}
          >
            <IoMdClose size={20} />
          </button>
          <PreviewChannelBannerExternals profile={profile} />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
