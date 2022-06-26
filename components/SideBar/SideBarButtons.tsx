import { motion } from "framer-motion";
import LinkTo from "../general/LinkTo";

export default function SideBarButtons({
  length,
  showChannels,
  setShowChannels,
}: {
  length: number;
  showChannels: number;
  setShowChannels: React.Dispatch<React.SetStateAction<number>>;
}) {
  const showMore = () => {
    if (showChannels === 50 && length > 50) {
      return (
        <LinkTo href="/browse/following">
          <button type="button" className="text-sm">
            Show more
          </button>
        </LinkTo>
      );
    }

    if (showChannels < length) {
      return (
        <button
          type="button"
          onClick={() => setShowChannels(showChannels + 5)}
          className="text-sm"
        >
          Show more
        </button>
      );
    }

    return null
  }

  return length > 5 ? (
    <motion.div
    layout="position"
      className={`flex font-medium text-gray-600 ${
        showChannels > 5 ? "justify-between" : "justify-center"
      }`}
    >
      {showChannels > 5 ? (
        <button
          type="button"
          onClick={() => setShowChannels(showChannels - 5)}
          className="text-sm"
        >
          Show less
        </button>
      ) : null}
      {showMore()}
    </motion.div>
  ) : null;
}
