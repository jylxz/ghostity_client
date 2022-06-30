import React from "react";
import Head from "next/head";
import axios from "axios";
import BrowseOrganizations from "../../../components/Browse/BrowseOrganizations";

export async function getStaticProps() {
  const orgs = await axios
    .get<Organization[]>("https://api.ghostity.com/organizations")
    .then((allOrgs) => allOrgs.data);

  return { props: { orgs } };
}

function organizations({ orgs }: { orgs: Organization[] }) {
  return (
    <>
      <Head>
        <title>Ghostity | Organizations</title>
        <meta
          name="keywords"
          content="V-Tubers, VTubers, virtual youtubers, Vtuber agency, Vtuber organization, Hololive, Nijisanji, VShojo, VSPO, 774inc., NoriPro,"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Ghostity | Organizations" />
        <meta
          name="twitter:description"
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ghostity/image/upload/v1655696219/profile-icons/ghostity-pfp-blue_cp5ctv.png"
        />
      </Head>
      <BrowseOrganizations organizations={orgs} />
    </>
  );
}

export default organizations;
