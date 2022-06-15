import Head from "next/head";
import axios from "axios";

import OrganizationMain from "../../../components/Organization/OrganizationMain";

const getAllOrganizationNames = async () =>
  axios.get("https://api.ghostity.com/organizations").then((res) => {
    const organizations: Organization[] = res.data;

    return organizations.map((org) => ({
      params: {
        organization: org.name.toLowerCase(),
      },
    }));
  });

const getOrganizationData = async (
  organization: string
): Promise<Organization[]> =>
  axios
    .get(`https://api.ghostity.com/organizations?name=${organization}`)
    .then((res) => res.data);

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

function OrganizationPage({
  organization,
}: {
  organization: Organization[];
}) {
  return (
    <>
      <Head>
        <title>Ghostity | {organization[0].name}</title>
      </Head>
      <OrganizationMain org={organization[0]} />
    </>
  );
}

export default OrganizationPage;
