import Image from "next/image";
import GhostityLogo from "../public/images/Ghostity-svg.svg";

function ProblemLoading() {
  return (
    <div className="flex justify-center gap-10">
      <div className="relative min-w-[25%] min-h-[25%]">
        <Image src={GhostityLogo} height={100} width={100}></Image>
        <span className="text-5xl font-bold absolute">!</span>
      </div>
      <div>
        <div className="text-3xl mb-4">
          Spoooky! Looks like there was a problem!
        </div>
        <div className="text-gray-600">Refresh or Try Again Later!</div>
      </div>
    </div>
  );
}

export default ProblemLoading;
