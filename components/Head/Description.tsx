import React from "react";
import Head from "next/head";

export const description =
  "A comprehensive (not exhaustive!) app for VTubers! Keep up and watch your favorite VTubers from Hololive or Nijisanji, or even explore and discover a new VTuber that you haven't even heard about, regardless if they stream on Twitch or YouTube!";

export default function DefaultDescription() {
  return (
    <Head>
      <meta
        name="description"
        content={description}
      />
    </Head>
  );
}
