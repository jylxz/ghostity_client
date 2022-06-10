import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { GoLocation } from "react-icons/go";
import { BiGlobe } from "react-icons/bi";
import OrganizationLive from "./OrganizationLive";
import OrganizationMembers from "./OrganizationMembers";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import TwitterIcon from "../../public/images/TwitterBlue.svg";
import YTIcon from "../../public/images/yt_icon_rgb.svg";
import BrowseWrapper from "../general/BrowseWrapper";
import BackgroundWrapper from "../general/BackgroundWrapper";

export default function OrganizationMain({
  org,
  profiles,
}: {
  org: Organization;
  profiles: Profile[];
}) {
  const [currentTab, setCurrentTab] = useState("live");

  const fetchOrganizationStreams = async () =>
    axios
      .get(`https://api.ghostity.com/organizations/${org.name}/streams`)
      .then((streams) => streams.data);

  const { isLoading, error, data } = useQuery<Stream[], Error>(
    `${org.name}`,
    fetchOrganizationStreams
  );

  const socialMedia = (social: { platform: string; url: string }) => {
    if (social.platform === "twitter") {
      return (
        <div className="w-5">
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
        </div>
      );
    }

    return null
  };

  return (
    <BrowseWrapper>
      <BackgroundWrapper nextImage={false} image={org.logo}>
        <div className="flex flex-col md:flex-row items-center gap-4 py-8">
          <div className="bg-white flex justify-center h-48 min-w-[12rem] w-48 items-center p-8 rounded-full shadow-md border-2">
            <img
              src={org.logo}
              alt=""
              className="bg-white select-none"
              draggable={false}
            />
          </div>
          <div className="flex flex-col flex-1 justify-center items-center md:items-start gap-1">
            <div>
              <h2 className="flex text-4xl font-semibold">{org.name}</h2>
            </div>
            <div className="flex gap-2 text-sm">
              {org.languages.map((lang) => (
                <div key={lang}>{lang}</div>
              ))}
            </div>
            <div className="flex items-center">
              <GoLocation />
              {org.based}
            </div>
            <div className="text-sm">
              Total Members:{" "}
              <span className="font-bold">{org.members.length}</span>
            </div>
          </div>
          <div className="md:self-start">
            <div className="flex justify-center items-center gap-2">
              <a href={org.website} target="_blank" rel="noopener noreferrer">
                <BiGlobe size={20} />
              </a>
              {org.main_channel ? (
                <div className="w-5">
                  <a
                    href={org.main_channel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YTIcon />
                  </a>
                </div>
              ) : null}
              {org.social_media.map((social) => (
                <div key={social.url}>{socialMedia(social)}</div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <div className="flex flex-col relative">
        {currentTab === "live" ? (
          <div className="flex text-gray-400 z-10">
            <button
              type="button"
              className="text-black border-b-2 border-black px-2"
              onClick={() => setCurrentTab("live")}
            >
              Live Members
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("members")}
              className="px-2"
            >
              All Members
            </button>
          </div>
        ) : (
          <div className="flex text-gray-400 z-10">
            <button
              type="button"
              className="px-2"
              onClick={() => setCurrentTab("live")}
            >
              Live Members
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("members")}
              className="text-black border-b-2 border-black px-2 "
            >
              All Members
            </button>
          </div>
        )}

        <div className="border absolute bottom-0 w-full z-0" />
      </div>
      {error ? (
        <div className="flex flex-col h-48 text-sm">
          <ProblemLoading />
        </div>
      ) : null}
      {isLoading ? (
        <div className="flex h-48 justify-center items-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {!isLoading && currentTab === "live" ? (
        <OrganizationLive channels={data} />
      ) : null}
      {currentTab === "members" ? (
        <OrganizationMembers
          organization={org.name}
          profiles={profiles}
          branches={org.branches}
          members={org.members}
        />
      ) : null}
    </BrowseWrapper>
  )
}
