import Image from "next/image";
import BackgroundWrapper from "@general/BackgroundWrapper";
import React from "react";
import { IoMdClose } from "react-icons/io";
import YoutubeIcon from "@icons/Youtube.png";
import  TwitchIcon from "@icons/TwitchGlitchPurple.svg"
import PreviewChannelBannerOrgLogo from "./PreviewChannelBannerOrgLogo";

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
            <h1 className="text-5xl ">{profile.name}</h1>
            <div className="px-1">
              {profile.profile.affiliations.map((org) => (
                <PreviewChannelBannerOrgLogo key={org.organization_id} org={org} />
              ))}
            </div>
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
          <div className="flex flex-col gap-2 items-end">
            {profile.channels.some(
              (channel) => channel.platform === "youtube"
            ) && (
              <a
                href={
                  profile.channels.find(
                    (channel) => channel.platform === "youtube"
                  )?.link
                }
                target="_blank"
                rel="noreferrer"
              >
                <button
                  type="button"
                  className="text-sm bg-secondary-alt-2 dark:bg-secondary-dark px-2 py-1 rounded flex items-center gap-2"
                >
                  <Image src={YoutubeIcon} width={20} height={16} />
                  Visit YouTube Channel
                </button>
              </a>
            )}
            {profile.channels.some(
              (channel) => channel.platform === "twitch"
            ) && (
              <a
                href={
                  profile.channels.find(
                    (channel) => channel.platform === "twitch"
                  )?.link
                }
                target="_blank"
                rel="noreferrer"
              >
                <button
                  type="button"
                  className="text-sm bg-secondary-alt-2 dark:bg-secondary-dark px-2 py-1 rounded flex items-center gap-2"
                >
                  <TwitchIcon className="w-5 h-5"/>
                  Visit Twitch Channel
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
