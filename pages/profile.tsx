import Head from "next/head";
import React, { useContext } from "react";
import Footer from "../components/general/Footer";
import ProfileMain from "../components/Profile/ProfileMain";
import UserContext from "../context/UserContext";

export default function Profile() {
  const user = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Ghostity | Profile</title>
      </Head>
      {!user ? "Please Login to your account to view profile" : <ProfileMain />}
      <Footer />
    </>
  );
}
