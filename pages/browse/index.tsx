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
          content="V-Tubers, VTubers, virtual youtubers, Vtuber agency, Vtuber organization, V-Tuber directory, VTuber app, Hololive, Nijisanji, VShojo, VSPO, 774inc., NoriPro,"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Ghostity | Browse" />
        <meta
          name="twitter:description"
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ghostity/image/upload/v1656661542/Logos/ghostity-720x720_jznyvc.png"
        />
      </Head>
      <BrowseStreams />
    </>
  );
}
