import Head from "next/head";
import React from "react";
import FollowingMain from "../../components/Following/FollowingMain";

function following() {
  return (
    <>
      <Head>
        <title>Ghostity | Following</title>
      </Head>
      <FollowingMain />
    </>
  );
}

export default following;
