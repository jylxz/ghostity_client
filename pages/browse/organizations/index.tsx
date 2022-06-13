import React from "react";
import Head from "next/head";
import BrowseOrganizations from "../../../components/Browse/BrowseOrganizations";

export async function getStaticProps() {
  const fetchOrganizations = await fetch(
    "https://api.ghostity.com/organizations"
  );
  const orgs = await fetchOrganizations.json();

  return { props: { orgs } };
}

function organizations({ orgs }: { orgs: Organization[] }) {
  return (
    <>
      <Head>
        <title>Ghostity | Organizations</title>
      </Head>
      <BrowseOrganizations organizations={orgs} />
    </>
  );
}

export default organizations;
