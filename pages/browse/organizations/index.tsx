import React, { ReactElement } from "react";
import Head from "next/head";
import axios from "axios";
import BrowseOrganizations from "../../../components/Browse/BrowseOrganizations";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultDescription, {
  description,
} from "../../../components/Head/Description";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";
import BrowseLayout from "../../../layouts/BrowseLayout";
import Organization from "./[organization]";

export async function getStaticProps() {
  const API = process.env.NEXT_PUBLIC_API as string;

  const orgs = await axios
    .get<Organization[]>(`${API}/organizations`)
    .then((allOrgs) => allOrgs.data);

  return { props: { orgs }, revalidate: 1000 };
}

export default function Organizations({ orgs }: { orgs: Organization[] }) {
  return (
    <>
      <Head>
        <title>vGhostity | Organizations</title>
        <meta
          name="description"
          content="vGhostity supports the biggest Vtuber organizations and agencies, such as Hololive, NIJISANJI, and VShojo. Learn more about them and explore all the other Vtuber organizations and agencies that are currently on vGhostity!"
        />
      </Head>
      <>
        <DefaultOpenGraph
          title="vGhostity | Organization"
          description="vGhostity supports the biggest Vtuber organizations and agencies, such as Hololive, NIJISANJI, and VShojo. Learn more about them and explore all the other Vtuber organizations and agencies that are currently on vGhostity!"
        />
        <DefaultKeywords keywords={orgs.map((org) => org.name)} />
      </>
      <BrowseOrganizations organizations={orgs} />
    </>
  );
}

Organizations.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
