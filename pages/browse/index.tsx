import React from "react";
import Head from "next/head";

import SearchBar from "../../components/general/SeachBar";
import BrowseSideBar from "../../components/Browse/BrowseSideBar";
import BrowseStreams from "../../components/Browse/BrowseStreams";

export default function browse() {
  return (
    <>
      <Head>
        <title>Ghostity | Browse</title>
      </Head>
      <main className="flex">
        <BrowseSideBar />
        <div className="w-full">
          <SearchBar placeholder="Search streams" />
          <BrowseStreams />
        </div>
      </main>
    </>
  );
}
