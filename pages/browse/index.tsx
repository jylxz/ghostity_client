import React from "react";
import Head from "next/head";

import BrowseStreams from "../../components/Browse/BrowseStreams";
import DefaultKeywords from "../../components/Head/Keywords";
import DefaultDescription, {
  description,
} from "../../components/Head/Description";
import DefaultOpenGraph from "../../components/Head/OpenGraph";

export default function browse() {
  return (
    <>
      <Head>
        <title>vGhostity | Browse</title>
      </Head>
      <>
        <DefaultOpenGraph
          title="vGhostity | Browse"
          description={description}
        />
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <BrowseStreams />
    </>
  );
}
