import Head from "next/head";
import React from "react";
import Footer from "../components/general/Footer";
import ProfileMain from "../components/Profile/ProfileMain";

export default function Profile() {

  return (
    <>
      <Head>
        <title>Ghostity | Profile</title>
      </Head>
      <ProfileMain />
      <Footer />
    </>
  );
}
