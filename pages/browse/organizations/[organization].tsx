import { ReactElement } from "react";
import Head from "next/head";

import OrganizationMain from "../../../components/Organization/OrganizationMain";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";
import BrowseLayout from "../../../layouts/BrowseLayout";
import API from "../../../API";

const getAllOrganizationNames = async () =>
  API.get<Organization[]>(`/organizations`).then((res) => {
    const organizations = res.data;

    return organizations.map((org) => ({
      params: {
        organization: org.name.toLowerCase(),
      },
    }));
  });

const getOrganizationData = async (organization: string) =>
  API.get<Organization>(`/organizations?name=${organization}`).then(
    (res) => res.data
  );

export async function getStaticPaths() {
  const paths = await getAllOrganizationNames();

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { organization: string };
}) {
  const organization = await getOrganizationData(params.organization);

  return {
    props: {
      organization,
    },
    revalidate: 1000,
  };
}

export default function OrganizationPage({
  organization,
}: {
  organization: Organization[];
}) {
  return (
    <>
      <Head>
        <title>vGhostity | {organization[0].name}</title>
        <meta
          name="description"
          content={`Discover and follow ${organization[0].name} and their VTubers on vGhostity! See who is live and start watching them instantly!`}
        />
      </Head>
      <>
        <DefaultOpenGraph
          title={`vGhostity | ${organization[0].name}`}
          description={`Discover and follow ${organization[0].name} and their VTubers on vGhostity! See who is live and start watching them instantly!`}
        />
        <DefaultKeywords
          keywords={`Vtuber agency, Vtuber organization, ${organization[0].name}, ${organization[0].name} members`}
        />
      </>
      <OrganizationMain org={organization[0]} />
    </>
  );
}

OrganizationPage.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
