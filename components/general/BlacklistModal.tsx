import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import UserContext from "../../context/UserContext";

export default function BlacklistModal({
  channel,
  showBlacklistModal,
  setShowBlacklistModal,
  setBlacklistChannel,
}: {
  channel: Stream | null;
  showBlacklistModal: boolean;
  setShowBlacklistModal: Dispatch<SetStateAction<boolean>>;
  setBlacklistChannel: Dispatch<SetStateAction<Stream | null>>;
}) {
  const userContext = useContext(UserContext);

  const handleClose = () => {
    setBlacklistChannel(null);
    setShowBlacklistModal(false);
  };

  const handleBlacklist = async () =>
    axios
      .delete("https://api.ghostity.com/admin/channel", {
        headers: {
          authorization: userContext?.uid || "",
        },
        data: {
          liveId: channel?._id,
          channelId: channel?.channel_id,
          channelName: channel?.channel_name,
          platform: channel?.platform,
          blacklistedBy: userContext?.uid,
        },
      })
      .then(() => handleClose());

  return (
    <AnimatePresence exitBeforeEnter>
      {showBlacklistModal ? (
        <motion.div
          initial={{ translateX: 500 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: 500 }}
          className="fixed flex items-center gap-1 bottom-4 right-2 p-2 bg-red-400 text-white z-40 w-80 rounded"
        >
          <div className="flex border-r gap-1 pr-1">
            ADMIN
            <AiOutlineExclamationCircle className="h-6 w-6" />
          </div>
          <div className="flex-1 flex flex-col items-center text-sm">
            <span className="line-clamp-1">{`BLACKLIST ${
              channel?.channel_name || ""
            }?`}</span>
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => handleBlacklist()}
                className="bg-white text-red-400 rounded px-1"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => handleClose()}
                className="bg-gray-100 text-gray-600 rounded px-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
