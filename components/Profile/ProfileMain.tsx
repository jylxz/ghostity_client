import React, { useContext, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useUpdateEmail } from "react-firebase-hooks/auth";
import UserContext from "../../context/UserContext";
import BackgroundWrapper from "../general/BackgroundWrapper";
import UserFollowContext from "../../context/UserFollowContext";
import ProfileResendVerification from "./ProfileResendVerification";
import ProfileDisplayName from "./ProfileDisplayName";
import ProfileEmail from "./ProfileEmail";
import ProfilePassword from "./ProfilePassword";

export default function ProfileMain() {
  const user = useContext(UserContext);
  const follow = useContext(UserFollowContext);
  const [showVerifiedWarning, setShowVerifiedWarning] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundWrapper>
        <div className="flex flex-col justify-center items-center h-96">
          <div className="">
            {/* <Image
              src={user?.photoURL}
              height={148}
              width={148}
              className="rounded-full"
            /> */}
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-2xl">{user?.displayName}</span>
              <span className="">{`Following: ${follow?.channels?.length}`}</span>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <span className="text-sm ">
                Member Since:{" "}
                {user?.metadata?.creationTime
                  ? format(new Date(user?.metadata?.creationTime), "PPP")
                  : "Not available"}
              </span>
              <span className=" text-sm flex items-center gap-1">
                Verified:
                {user?.emailVerified ? (
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
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <div className="my-12 w-4/5 md:w-1/2 self-center flex flex-col gap-8">
        {!user?.emailVerified ? <ProfileResendVerification /> : null}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Profile</h1>
          <div className="px-8 flex">
            <ProfileDisplayName />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Account Information</h1>
          <div className="flex flex-col gap-4">
            <div className="px-8 flex flex-col gap-3">
              <ProfileEmail />
              <ProfilePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
