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
      </Head>
      <BrowseOrganizations organizations={orgs} />
    </>
  );
}

export default organizations;
