import { ReactElement, useState } from "react";
import Head from "next/head";
import { useQuery } from "react-query";

// Layout
import BrowseLayout from "layouts/BrowseLayout";

// Services
import API from "services/api";

// Components
import { DefaultKeywords, DefaultOpenGraph } from "components/Head";
import {
  OrganizationBanner,
  OrganizationLive,
  OrganizationMembers,
  OrganizationTabsBar,
} from "components/Organization";
import GradientCircularProgress from "@general/GradientCircularProgress";
import ProblemLoading from "@general/ProblemLoading";
import BrowseWrapper from "@general/BrowseWrapper";

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
  API.get<Organization[]>(`/organizations?name=${organization}`).then(
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
      organization: organization[0],
    },
    revalidate: 1000,
  };
}

export default function OrganizationPage({
  organization,
}: {
  organization: Organization;
}) {
  const [currentTab, setCurrentTab] = useState("Live Members");

  const fetchOrganizationStreams = async () =>
    API.get<Stream[]>(`/organizations/${organization.name}/streams`).then(
      (streams) => streams.data
    );

  const { isLoading, error, data } = useQuery<Stream[], Error>(
    `${organization.name}`,
    fetchOrganizationStreams
  );

  return (
    <>
      <Head>
        <title>vGhostity | {organization.name}</title>
        <meta
          name="description"
          content={`Discover and follow ${organization.name} and their VTubers on vGhostity! See who is live and start watching them instantly!`}
        />
      </Head>
      <>
        <DefaultOpenGraph
          title={`vGhostity | ${organization.name}`}
          description={`Discover and follow ${organization.name} and their VTubers on vGhostity! See who is live and start watching them instantly!`}
        />
        <DefaultKeywords
          keywords={`Vtuber agency, Vtuber organization, ${organization.name}, ${organization.name} members`}
        />
      </>
      <BrowseWrapper className="overflow-y-scroll">
        <OrganizationBanner organization={organization} />
        <OrganizationTabsBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {error && (
          <div className="flex flex-col h-48 text-sm">
            <ProblemLoading />
          </div>
        )}
        {isLoading && (
          <div className="flex-1 flex justify-center items-center">
            <GradientCircularProgress />
          </div>
        )}
        {currentTab === "Live Members" && data && (
          <OrganizationLive channels={data} />
        )}
        {currentTab === "All Members" && (
          <OrganizationMembers
            organization={organization.name}
            branches={organization.branches}
            members={organization.members}
          />
        )}
      </BrowseWrapper>
    </>
  );
}

OrganizationPage.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
