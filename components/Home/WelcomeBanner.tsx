import React from "react";
import Link from "next/link";
import GhostityLogo from "../../public/images/Ghost-discovering-ghostity.svg";

function WelcomeBanner() {
  return (
    <section className="px-4 sm:px-36 h-[30rem] flex items-center justify-center">
      <div className="flex justify-center items-center gap-6">
        <div className="rounded max-w-[75ch]">
          <h2 className="text-5xl lg:text-6xl font-medium mb-8">
            Welcome to{" "}
            <span className="text-white animate-fade-out-2">ghostity</span> !
          </h2>
          <p className="lg:text-xl text-gray-100 mb-6">
            A comprehensive (not exhaustive!) directory for V-Tubers! Keep up
            with your favorite V-Tubers from Hololive or Nijisanji, or even
            explore and discover a new V-Tuber that you haven&apos;t even heard
            about!
          </p>

          <Link href="/browse" passHref>
            <button type="button" className="bg-white py-2 px-7 rounded text-gray-600 shadow hover:bg-slate-100 hover:animate-scale">
              Browse
            </button>
          </Link>
        </div>
        <div className="hidden lg:flex w-1/4 min-w-[400px] justify-center">
          <GhostityLogo className="scale-[3.5]" />
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
