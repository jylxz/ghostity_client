import GhostitySurprise from "../../public/images/GhostitySurprise.svg";

function ProblemLoading() {
  return (
    <div className="flex-1 flex flex-col sm:flex-row items-center justify-center">
      <GhostitySurprise className="h-2/5" />
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
