import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import UserFollowContext from "../context/UserFollowContext";

export default function useHandleFollows(channelIds: string | Channel[]) {
  const follows = useContext(UserFollowContext);
  let currentlyFollowing: boolean = true;

  if (typeof channelIds !== "string") {
    channelIds.forEach((channel) => {
      if (!follows?.data()?.channel_ids.includes(channel.id))
        currentlyFollowing = false;
    });
  } else {
    currentlyFollowing = follows?.data()?.channel_ids.includes(channelIds);
  }

  const handleFollow = async () => {
    if (typeof channelIds === "string") {
      if (currentlyFollowing) {
        return updateDoc(follows!.ref, {
          channel_ids: arrayRemove(channelIds),
        });
      }

      return updateDoc(follows!.ref, {
        channel_ids: arrayUnion(channelIds),
      });
    }
    if (currentlyFollowing) {
      return Promise.all(
        channelIds.map((channel) =>
          updateDoc(follows!.ref, {
            channel_ids: arrayRemove(channel.id),
          })
        )
      );
    }

    return Promise.all(
      channelIds.map((channel) =>
        updateDoc(follows!.ref, {
          channel_ids: arrayUnion(channel.id),
        })
      )
    );
  };

  return [handleFollow, currentlyFollowing] as const;
}
