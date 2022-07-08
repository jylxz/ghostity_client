import Head from "next/head";
import axios from "axios";

import OrganizationMain from "../../../components/Organization/OrganizationMain";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";

const getAllOrganizationNames = async () => {
  const API = process.env.NEXT_PUBLIC_API as string;
  return axios.get<Organization[]>(`${API}/organizations`).then((res) => {
    const organizations = res.data;

    return organizations.map((org) => ({
      params: {
        organization: org.name.toLowerCase(),
      },
    }));
  });
};

const getOrganizationData = async (organization: string) => {
  const API = process.env.NEXT_PUBLIC_API as string;
  return axios
    .get<Organization>(`${API}/organizations?name=${organization}`)
    .then((res) => res.data);
};

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

function OrganizationPage({ organization }: { organization: Organization[] }) {
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

export default OrganizationPage;
