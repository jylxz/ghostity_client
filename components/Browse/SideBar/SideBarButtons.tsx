import LinkTo from "../../general/LinkTo";

export default function SideBarButtons({
  length,
  showChannels,
  setShowChannels,
}: {
  length: number;
  showChannels: number;
  setShowChannels: React.Dispatch<React.SetStateAction<number>>;
}) {
  return length > 5 ? (
    <div
      className={`flex ${
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
      {showChannels === 50 && length > 50 ? (
        <LinkTo href="/browse/following">
          <button type="button" className="text-sm">
            Show more
          </button>
        </LinkTo>
      ) : (
        <button
          type="button"
          onClick={() => setShowChannels(showChannels + 5)}
          className="text-sm"
        >
          Show more
        </button>
      )}
    </div>
  ) : null;
}
