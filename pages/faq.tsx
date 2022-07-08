import Head from "next/head";
import React from "react";
import FaqMain from "../components/FAQ/FaqMain";
import DefaultDescription from "../components/Head/Description";
import DefaultKeywords from "../components/Head/Keywords";

export default function Faq() {
  return (
    <>
      <Head>
        <title>vGhostity | FAQ</title>
      </Head>
      <>
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <FaqMain />
    </>
  );
}
