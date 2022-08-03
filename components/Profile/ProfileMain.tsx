// Libraries
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";

// Contexts
import UserContext from "../../contexts/UserContext";
import UserFollowContext from "../../contexts/UserFollowContext";

// Components
import BackgroundWrapper from "../General/BackgroundWrapper";
import ProfileResendVerification from "./ProfileResendVerification";
import ProfileDisplayName from "./ProfileDisplayName";
import ProfileEmail from "./ProfileEmail";
import ProfilePassword from "./ProfilePassword";
import ProfileGoogleNotice from "./ProfileGoogleNotice";
import ProfileChangePfp from "./ProfileChangePfp";

export default function ProfileMain() {
  const user = useContext(UserContext);
  const follow = useContext(UserFollowContext);
  const [showVerifiedWarning, setShowVerifiedWarning] = useState(false);
  const [hoverEditPfp, setHoverEditPfp] = useState(false);
  const [editPfp, setEditPfp] = useState(false);

  return (
    <div className="relative font-medium">
      <AnimatePresence exitBeforeEnter>
        {editPfp ? <ProfileChangePfp setEditPfp={setEditPfp} /> : null}
      </AnimatePresence>
      {user ? (
        <div className={`flex flex-col min-h-screen ${!user ? "blur" : ""}`}>
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
                  <span className="text-2xl dark:text-primary">{user?.displayName}</span>
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
                            Your account has not been verified. Editing your
                            profile will be disabled until it is verified.
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
          <div className="my-12 w-4/5 md:w-1/2 self-center flex flex-col gap-8">
            {!user?.emailVerified &&
            user?.providerData[0].providerId !== "google.com" ? (
              <ProfileResendVerification />
            ) : null}
            <div className="flex flex-col gap-4">
              <h1 className="dark:text-text-primary-dark text-2xl">Profile</h1>
              <div className="px-8 flex items-center">
                
                <ProfileDisplayName />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="dark:text-text-primary-dark text-2xl">Account Information</h1>
              {user?.providerData[0].providerId === "google.com" ? (
                <ProfileGoogleNotice />
              ) : null}
              <div className="flex flex-col gap-4">
                <div className="px-8 flex flex-col gap-3">
                  <ProfileEmail />
                  <ProfilePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen" />
      )}
      {!user ? (
        <div className="w-full top-1/3 absolute flex flex-col justify-center items-center text-center gap-4">
          <div className="h-20 w-20">
            <VGhostityLogo />
          </div>
          Please Login or Create an Account to view your profile
        </div>
      ) : null}
    </div>
  );
}
