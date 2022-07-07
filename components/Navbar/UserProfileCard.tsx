import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";
import LinkTo from "../general/LinkTo";

export default function UserProfileCard({
  closeParent,
}: {
  closeParent: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  return (
    <div className="dark:bg-secondary-dark-2 bg-white h-40 rounded flex flex-col">
      <div className="flex-1 w-full flex-col justify-center items-center text-sm px-2 py-2">
        {/* <div className="w-14 h-14 rounded-full border mx-auto mb-2" /> */}
        <div className="flex justify-center mb-2">
          <Image
            src={
              user?.photoURL ||
              "https://res.cloudinary.com/ghostity/image/upload/v1655696219/profile-icons/ghostity-pfp-blue_cp5ctv.png"
            }
            width={56}
            height={56}
            className="rounded-full "
            alt="vGhostity profile image"
          />
        </div>
        <span className="dark:text-primary line-clamp-1 text-center font-medium">
          {user?.displayName || "A Wandering Ghost"}
        </span>
        {user ? (
          <div className="text-sm dark:text-text-primary-dark text-gray-500 text-center">{`Following: ${follows?.channels?.length || 0}`}</div>
        ) : null}
      </div>
        <LinkTo href="/profile" className="w-full">
          <button
            type="button"
            className="dark:text-text-primary-dark text-sm text-center py-1.5 border-t w-full font-medium"
            onClick={() => closeParent(false)}
          >
            View Profile
          </button>
        </LinkTo>
    </div>
  );
}
