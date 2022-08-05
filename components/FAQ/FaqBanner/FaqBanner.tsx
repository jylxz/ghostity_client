import React from 'react'

// Images and Icons
import Ghostity from "@logo/Ghostity.svg";
import { AiOutlineMail } from 'react-icons/ai';
import TwitterIcon from "@icons/TwitterBlue.svg";
import DiscordIcon from "@icons/Discord.svg";

// Components
import BackgroundWrapper from '@general/BackgroundWrapper';

export default function FaqBanner() {
  return (
    <BackgroundWrapper image="https://res.cloudinary.com/ghostity/image/upload/v1656533585/banner/Banner_1_hstgss.png">
      <div className="h-64 flex flex-col justify-center items-center">
        <div className="bg-primary w-20 h-20 p-4 rounded-full">
          <Ghostity />
        </div>
        <h1 className="text-2xl dark:text-text-primary-dark font-semibold">
          Frequently Asked Questions
        </h1>
        <div className="text-sm dark:text-text-primary-dark text-gray-500">
          Last Updated: July 6, 2022
        </div>
        <div className="mt-4 flex flex-wrap justify-center items-center gap-4 bg-gray-200/70 dark:bg-secondary-dark dark:text-text-primary-dark px-3 py-1 rounded-lg">
          <div>
            <a
              href="https://twitter.com/_jylx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm gap-2"
            >
              <div className="h-5 w-5 mt-1.5">
                <TwitterIcon />
              </div>
              <span>@_Jylx</span>
            </a>
          </div>
          |
          <div>
            <a
              href="https://discordapp.com/users/577727654011338753"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm gap-1"
            >
              <div className="h-5 w-5 mt-1.5">
                <DiscordIcon />
              </div>
              <span>Jylx#5461</span>
            </a>
          </div>
          |
          <div>
            <a
              href="mailto:jylx@ghostity.com"
              className="flex items-center text-sm gap-1"
            >
              <AiOutlineMail size={20} />
              <span>Jylx@ghostity.com</span>
            </a>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
