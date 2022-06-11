import React from "react";
import Head from "next/head";
import BrowseGames from "../../../components/Browse/BrowseGames";

export default function games() {
  return (
    <>
      <Head>
        <title>Ghostity | Games</title>
      </Head>
      <BrowseGames />
    </>
  );
}

