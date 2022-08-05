import React, { ReactElement } from "react";
import Head from "next/head";

// Services
import API from "services/API";

// Layout
import BrowseLayout from "layouts/BrowseLayout";

// Images
import Ghostity from "@logo/Ghostity.svg";

// Components
import { DefaultKeywords, DefaultOpenGraph } from "components/Head";
import BrowseWrapper from "@general/BrowseWrapper";
import OrganizationCard from "@general/OrganizationCard";

export async function getStaticProps() {
  const orgs = await API.get<Organization[]>(`/organizations`).then(
    (allOrgs) => allOrgs.data
  );

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
      <BrowseWrapper>
        <div className="w-full flex flex-wrap text-xl font-medium justify-center gap-2 mb-4">
          <h2 className="flex dark:text-text-primary-dark">
            Organizations currently on
          </h2>
          <span className=" text-primary flex gap-2">
            vGhostity
            <div className="w-8 h-8 -scale-x-100 dark:fill-white">
              <Ghostity />
            </div>
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-7 justify-items-center">
          {orgs.map((org) => (
            <OrganizationCard
              key={org._id}
              title={org.name}
              image={org.logo}
              languages={org.languages}
            />
          ))}
        </div>
      </BrowseWrapper>
    </>
  );
}

Organizations.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
