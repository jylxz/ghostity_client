import Head from "next/head";
import React from "react";
import FollowingMain from "../../components/Following/FollowingMain";
import DefaultDescription from "../../components/Head/Description";
import DefaultKeywords from "../../components/Head/Keywords";

function following() {
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

export default following;
