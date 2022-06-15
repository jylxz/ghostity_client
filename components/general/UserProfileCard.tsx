import React, { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";
import LinkTo from "./LinkTo";

export default function UserProfileCard({closeParent}: {closeParent: Dispatch<SetStateAction<boolean>>}) {
    const user = useContext(UserContext);
    const follows = useContext(UserFollowContext);

  return (
    <div className="bg-white h-36 rounded flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center  text-sm">
        <div className="w-14 h-14 rounded-full border" />
        <span className="line-clamp-1">
          {user?.displayName || "A Wandering Ghost"}
        </span>
        {user ? (
          <span className="text-sm text-gray-500">{`Following: ${follows?.channels?.length}`}</span>
        ) : null}
      </div>
      <button type="button" className=" text-sm text-center py-1.5 border-t" onClick={() => closeParent(false)}>
        <LinkTo href="/profile">View Profile</LinkTo>
      </button>
    </div>
  );
}
