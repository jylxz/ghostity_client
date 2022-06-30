import Head from "next/head";
import React from "react";
import FaqMain from "../components/FAQ/FaqMain";

function faq() {
  return (
    <>
      <Head>
        <title>Ghostity | FAQ</title>
      </Head>
      <FaqMain />
    </>
  );
}

export default faq;
