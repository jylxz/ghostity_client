// Libraries
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";

// Icons
import { GoLocation } from "react-icons/go";
import { BiGlobe } from "react-icons/bi";
import YTIcon from "../../public/images/yt_icon_rgb.png";
import TwitterIcon from "../../public/images/TwitterBlue.svg";

// Hooks
import useWindowDimensions from "../../hooks/useWindowDimensions";

// Components
import OrganizationLive from "./OrganizationLive";
import OrganizationMembers from "./OrganizationMembers";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import BrowseWrapper from "../general/BrowseWrapper";
import BackgroundWrapper from "../general/BackgroundWrapper";
import AnimatedTabButton from "../general/AnimatedTabButton";
import AnimatedButton from "../general/AnimatedButton";

function SocialMedia({
  social,
  isWindowSmall,
}: {
  social: Organization["social_media"][0];
  isWindowSmall?: boolean;
}) {
  if (social.platform === "twitter") {
    return (
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 font-medium"
      >
        <div className="w-5 h-5 flex">
          <TwitterIcon />
        </div>
        {!isWindowSmall ? social.tag || "Twitter" : null}
      </a>
    );
  }

  return null;
}

export default function OrganizationMain({ org }: { org: Organization }) {
  const [currentTab, setCurrentTab] = useState("Live Members");
  const [isWindowSmall, setIsWindowSmall] = useState<boolean>();
  const window = useWindowDimensions();

  useEffect(() => {
    if (window && window.width) {
      setIsWindowSmall(window.width < 640);
    }
  }, [window]);

  const API = process.env.NEXT_PUBLIC_API as string;

  const fetchOrganizationStreams = async () =>
    axios
      .get<Stream[]>(`${API}/organizations/${org.name}/streams`)
      .then((streams) => streams.data);

  const { isLoading, error, data } = useQuery<Stream[], Error>(
    `${org.name}`,
    fetchOrganizationStreams
  );

  return (
    <BrowseWrapper className="overflow-y-scroll">
      <BackgroundWrapper nextImage={false} image={org.logo}>
        <div className="flex flex-col md:flex-row flex-wrap items-center gap-5 py-8">
          <div className="bg-white flex justify-center h-48 min-w-[12rem] w-48 items-center p-8 rounded-full shadow-md border-2">
            <Image
              src={org.logo}
              alt={`${org.name}'s logo`}
              height="192"
              width="192"
              className="bg-white select-none text-xs object-scale-down"
              draggable={false}
            />
          </div>
          <div className="flex flex-col flex-1 justify-center items-center md:items-start gap-1 mr-5">
            <div>
              <h2 className="flex text-4xl font-semibold dark:text-primary">
                {org.name}
              </h2>
            </div>
            <div className="flex gap-2 text-sm font-semibold dark:text-text-secondary-dark text-gray-600">
              {org.languages.map((lang) => (
                <div key={lang}>{lang}</div>
              ))}
            </div>
            <div className="flex items-center font-medium dark:text-text-primary-dark">
              <GoLocation />
              {org.based}
            </div>
            <div className="font-medium text-sm dark:text-text-primary-dark">
              Total Members:{" "}
              <span className="font-bold dark:text-primary">
                {org.members.length}
              </span>
            </div>
          </div>
          <div className=" flex flex-col md:self-start md:mt-6">
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <AnimatedButton className="text-xs font-medium dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 py-1 rounded">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <BiGlobe size={20} />
                  {!isWindowSmall ? "Website" : null}
                </a>
              </AnimatedButton>
              {org.main_channel ? (
                <AnimatedButton className="text-xs font-medium dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 rounded">
                  <a
                    href={org.main_channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 py-1.5"
                  >
                    <div className="w-5 flex items-center">
                      <Image src={YTIcon} height={15} width={20} alt="YouTube Icon"/>
                    </div>
                    {!isWindowSmall ? "Youtube" : null}
                  </a>
                </AnimatedButton>
              ) : null}
              {org.social_media.map((social) => (
                <AnimatedButton
                  key={social.url}
                  className="text-xs dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 py-1 rounded"
                >
                  <SocialMedia social={social} isWindowSmall={isWindowSmall} />
                </AnimatedButton>
              ))}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
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
      {error ? (
        <div className="flex flex-col h-48 text-sm">
          <ProblemLoading />
        </div>
      ) : null}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {!isLoading && currentTab === "Live Members" && data ? (
        <OrganizationLive channels={data} />
      ) : null}
      {currentTab === "All Members" ? (
        <OrganizationMembers
          organization={org.name}
          branches={org.branches}
          members={org.members}
        />
      ) : null}
    </BrowseWrapper>
  );
}
