import Head from "next/head";
import React from "react";
import useSystemColor from "../../hooks/useSystemColor";

export default function Favicons() {
  const [systemColor] = useSystemColor();

  return (
    <Head>
      {systemColor === "dark" ? (
        <>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/DarkMode/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/DarkMode/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/DarkMode/favicon-16x16.png"
          />

          <link
            rel="mask-icon"
            href="/favicon/DarkMode/safari-pinned-tab.svg"
            color="#deecfc"
          />
        </>
      ) : null}
      {systemColor === "light" ? (
        <>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/LightMode/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/LightMode/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/LightMode/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/favicon/LightMode/safari-pinned-tab.svg"
            color="#000000"
          />
        </>
      ) : null}
      {!systemColor ? (
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      ) : null}
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#deecfc" />
      <meta name="theme-color" content="#deecfc" />
    </Head>
  );
}
