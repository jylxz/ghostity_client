import React from "react";
import Head from "next/head";
import BrowseGames from "../../../components/Browse/BrowseGames";
import PageAnimateWrapper from "../../../components/general/PageAnimateWrapper";

function games() {
  return (
    <PageAnimateWrapper>
      <Head>
        <title>Ghostity | Games</title>
      </Head>
      <BrowseGames />;
    </PageAnimateWrapper>
  );
}

export default games;
