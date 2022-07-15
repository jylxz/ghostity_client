import React, { ReactElement } from "react";
import Head from "next/head";

import BrowseStreams from "../../components/Browse/BrowseStreams";
import DefaultKeywords from "../../components/Head/Keywords";
import DefaultDescription, {
  description,
} from "../../components/Head/Description";
import DefaultOpenGraph from "../../components/Head/OpenGraph";
import BrowseLayout from "../../layouts/BrowseLayout";

export default function Browse() {
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

Browse.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};

