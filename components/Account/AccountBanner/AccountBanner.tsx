import React, { useContext, useState } from 'react'
import Image from "next/image"

import BackgroundWrapper from '@general/BackgroundWrapper';
import { UserFollowContext } from 'contexts';
import { format } from 'date-fns';
import { User } from 'firebase/auth';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

export default function AccountBanner({
  user,
  setEditPfp,
}: {
  user: User;
  setEditPfp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const follow = useContext(UserFollowContext);
  const [showVerifiedWarning, setShowVerifiedWarning] = useState(false);
  const [hoverEditPfp, setHoverEditPfp] = useState(false);

  return (
    <BackgroundWrapper>
      <div className="flex flex-col justify-center items-center h-96">
        <div
          className="relative"
          onTouchStart={() => setEditPfp(true)}
          onMouseEnter={() =>
            user.emailVerified ||
            user.providerData[0].providerId === "google.com"
              ? setHoverEditPfp(true)
              : null
          }
          onMouseLeave={() => setHoverEditPfp(false)}
        >
          <Image
            src={
              user?.photoURL ||
              "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-primary_jg3evf.png"
            }
            alt="vGhostity profile image"
            height={144}
            width={144}
            className="rounded-full"
          />
          {hoverEditPfp ? (
            <button
              type="button"
              className="absolute left-0 top-0 h-36 w-36 bg-black/60 text-white rounded-full text-center text-lg"
              onClick={() => setEditPfp(true)}
            >
              Change
            </button>
          ) : null}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl dark:text-primary">
              {user?.displayName}
            </span>
            <span className="dark:text-text-primary-dark">{`Following: ${
              follow?.channels?.length || 0
            }`}</span>
          </div>
          <div className="flex flex-col items-center dark:text-text-secondary-dark text-gray-600">
            <span className="text-sm ">
              Member Since:{" "}
              {user?.metadata?.creationTime
                ? format(new Date(user?.metadata?.creationTime), "PPP")
                : "Not available"}
            </span>
            <span className=" text-sm flex items-center gap-1">
              Verified:
              {user?.emailVerified ||
              user?.providerData[0].providerId === "google.com" ? (
                <AiFillCheckCircle color="green" size={18} />
              ) : (
                <div
                  onMouseEnter={() => setShowVerifiedWarning(true)}
                  onMouseLeave={() => setShowVerifiedWarning(false)}
                  className="relative"
                >
                  <MdCancel color="red" size={18} />
                  {showVerifiedWarning ? (
                    <div className="absolute top-2 left-5 w-48 bg-black/70 text-white text-xs p-2 rounded">
                      Your account has not been verified. Editing your profile
                      will be disabled until it is verified.
                    </div>
                  ) : null}
                  {}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
