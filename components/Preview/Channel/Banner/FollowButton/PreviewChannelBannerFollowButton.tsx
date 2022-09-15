import { UserContext } from "contexts";
import { motion, AnimatePresence } from "framer-motion";
import { useHandleFollows } from "hooks";
import React, { useContext, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbHeartPlus } from "react-icons/tb";

function ButtonWrapper({
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  children,
  toolTipText,
}: {
  onPointerDown: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  children: React.ReactNode;
  toolTipText?: string;
}) {
  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="relative mt-1 ml-3"
    >
      {children}
      {toolTipText && (
        <div className="absolute left-3 top-4 bg-secondary-alt-2 dark:bg-secondary-dark py-1 px-2 rounded text-sm whitespace-nowrap">
          {toolTipText}
        </div>
      )}
    </button>
  );
}

export default function PreviewChannelBannerFollowButton({
  profile,
}: {
  profile: Profile;
}) {
  const user = useContext(UserContext);
  const [follow, followed] = useHandleFollows(profile.channels);
  const [hoverState, setHoverState] = useState(false);

  if (user) {
    switch (true) {
      case followed && !hoverState:
        return (
          <ButtonWrapper
            onPointerDown={() => follow()}
            onPointerLeave={() => setHoverState(false)}
            onPointerEnter={() => setHoverState(true)}
          >
            <AiFillHeart className="h-6 w-6" />
          </ButtonWrapper>
        );
      case followed && hoverState:
        return (
          <ButtonWrapper
            onPointerDown={() => follow()}
            onPointerLeave={() => setHoverState(false)}
            onPointerEnter={() => setHoverState(true)}
            toolTipText={`Unfollow ${profile.name}`}
          >
            <AiOutlineHeart className="h-6 w-6" />
          </ButtonWrapper>
        );
      case !followed && !hoverState:
        return (
          <ButtonWrapper
            onPointerDown={() => follow()}
            onPointerLeave={() => setHoverState(false)}
            onPointerEnter={() => setHoverState(true)}
          >
            <TbHeartPlus className="h-6 w-6" />
          </ButtonWrapper>
        );
      case !followed && hoverState:
        return (
          <ButtonWrapper
            onPointerDown={() => follow()}
            onPointerLeave={() => setHoverState(false)}
            onPointerEnter={() => setHoverState(true)}
            toolTipText={`Follow ${profile.name}`}
          >
            <AiFillHeart className="h-6 w-6" />
          </ButtonWrapper>
        );
      default:
        return null;
    }
  }

  return null;
}
