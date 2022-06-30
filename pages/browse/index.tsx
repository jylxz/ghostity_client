import React from "react";
import Head from "next/head";

import BrowseStreams from "../../components/Browse/BrowseStreams";

export default function browse() {
  return (
    <>
      <Head>
        <title>Ghostity | Browse</title>
        <meta
          name="keywords"
          content="V-Tubers, VTubers, virtual youtubers, Vtuber agency, Vtuber organization, Hololive, Nijisanji, VShojo, VSPO, 774inc., NoriPro,"
        />
      </Head>
      <BrowseStreams />
    </>
  );
}
