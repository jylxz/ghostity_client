import Head from "next/head";
import React from "react";
import FollowingMain from "../../components/Following/FollowingMain";
import PageAnimateWrapper from "../../components/general/PageAnimateWrapper";

function following() {
  return (
    <PageAnimateWrapper>
      <Head>
        <title>Ghostity | Following</title>
      </Head>
      <FollowingMain />
    </PageAnimateWrapper>
  );
}

export default following;
