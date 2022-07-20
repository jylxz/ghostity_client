import React from 'react'
import Head from "next/head"

export default function DefaultOpenGraph({title, description}: {title:string, description: string}) {
  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/ghostity/image/upload/v1658357167/Logos/vghostity-full-1280x720_gq5jda.png"
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/ghostity/image/upload/v1658357167/Logos/vghostity-full-1280x720_gq5jda.png"
      />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
    </Head>
  );
}
