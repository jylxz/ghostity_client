import Head from "next/head";
import React, { ReactElement } from "react";
import FollowingMain from "../../components/Following/FollowingMain";
import DefaultDescription from "../../components/Head/Description";
import DefaultKeywords from "../../components/Head/Keywords";
import BrowseLayout from "../../layouts/BrowseLayout";

export default function Following() {
  return (
    <>
      <Head>
        <title>vGhostity | Following</title>
      </Head>
      <>
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <FollowingMain />
    </>
  );
}

Following.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};

