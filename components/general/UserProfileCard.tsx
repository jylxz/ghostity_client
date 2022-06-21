import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";
import LinkTo from "./LinkTo";

export default function UserProfileCard({
  closeParent,
}: {
  closeParent: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  return (
    <div className="bg-white h-40 rounded flex flex-col">
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
            alt="Ghostity profile image"
          />
        </div>
        <span className="line-clamp-1 text-center">
          {user?.displayName || "A Wandering Ghost"}
        </span>
        {user ? (
          <div className="text-sm text-gray-500 text-center">{`Following: ${follows?.channels?.length}`}</div>
        ) : null}
      </div>
      <button
        type="button"
        className=" text-sm text-center py-1.5 border-t"
        onClick={() => closeParent(false)}
      >
        <LinkTo href="/profile">View Profile</LinkTo>
      </button>
    </div>
  );
}
