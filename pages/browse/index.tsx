import React from "react";
import Head from "next/head";

import BrowseStreams from "../../components/Browse/BrowseStreams";

export default function browse() {
  return (
    <>
      <Head>
        <title>Ghostity | Browse</title>
      </Head>
      <BrowseStreams />
    </>
  );
}
