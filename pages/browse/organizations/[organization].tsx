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

const getProfiles = (ids: string[]): Promise<Profile[]> =>
  axios
    .get(`https://api.ghostity.com/general/profiles`, {data: {ids}})
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
  const ids = organization[0].members.map((member) => member.profile_id);
  const profiles = await getProfiles(ids);

  return {
    props: {
      organization,
      profiles,
    },
    revalidate: 10,
  };
}

function OrganizationPage({
  organization,
  profiles,
}: {
  organization: Organization[];
  profiles: Profile[];
}) {
  return (
    <>
      <Head>
        <title>Ghostity | {organization[0].name}</title>
      </Head>
      <OrganizationMain org={organization[0]} profiles={profiles} />
    </>
  )
}

export default OrganizationPage;
