import Head from "next/head";
import React from "react";
import useSystemColor from "../../hooks/useSystemColor";

export default function Favicons() {
  const [systemColor] = useSystemColor()

  if (systemColor === "dark") {
    return (
      <Head>
        <link
          rel="icon"
          href="/favicon/favicon-alt.svg"
          sizes="any"
          type="image/svg+xml"
          color="#ffffff"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon/favicon-alt.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <link
          rel="mask-icon"
          href="/favicon/favicon-alt.svg"
          sizes="any"
          type="image/svg+xml"
          color="#ffffff"
        />
      </Head>
    );
  }

  if (systemColor === "light") {
    <Head>
      <link
        rel="icon"
        href="/favicon/favicon.svg"
        sizes="any"
        type="image/svg+xml"
        color="#000000"
      />
      <link
        rel="apple-touch-icon"
        href="/favicon/favicon.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <link
        rel="mask-icon"
        href="/favicon/favicon.svg"
        sizes="any"
        type="image/svg+xml"
        color="#000000"
      />
    </Head>;
  }

  return (
    <Head>
      <link
        rel="icon"
        href="/images/Ghostity-svg.svg"
        sizes="any"
        type="image/svg+xml"
        color="#000000"
      />
      <link
        rel="apple-touch-icon"
        href="/images/Ghostity-svg.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <link
        rel="mask-icon"
        href="/images/Ghostity-svg.svg"
        sizes="any"
        type="image/svg+xml"
        color="#000000"
      />
    </Head>
  )
}
