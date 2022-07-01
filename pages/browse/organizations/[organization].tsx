import Head from "next/head";
import axios from "axios";

import OrganizationMain from "../../../components/Organization/OrganizationMain";

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
        <title>Ghostity | {organization[0].name}</title>
        <meta
          name="keywords"
          content={`V-Tubers, VTubers, virtual youtubers, Vtuber agency, Vtuber organization, ${organization[0].name}, ${organization[0].name} members`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Ghostity | ${organization[0].name}`}
        />
        <meta
          name="twitter:description"
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ghostity/image/upload/v1656659048/OG/GhostityFullLogo_bgnhbs.png"
        />
      </Head>
      <OrganizationMain org={organization[0]} />
    </>
  );
}

export default OrganizationPage;
