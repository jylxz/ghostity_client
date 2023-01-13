// Libraries
import Head from "next/head";
import { GetStaticProps } from "next";

// Services
import API from "@services/api";

// Components
import Footer from "@general/Footer";
import {
  HomeLive,
  HomeWelcome,
  HomeOrganizations,
  HomeBrowse,
  HomeHelp,
  HomeStats,
} from "@components/Home";
import {
  DefaultDescription,
  DefaultKeywords,
  DefaultOpenGraph,
} from "@components/Head";
import { description } from "@components/Head/Description";

export const getStaticProps: GetStaticProps = async () => {
  const logos = await API.get<OrganizationLogos>("/organizations/logos").then(
    (orgLogos) => orgLogos.data
  );

  return { props: { logos }, revalidate: 6000 };
};

function Home({ logos }: OrganizationLogos) {
  return (
    <>
      <Head>
        <title>vGhostity | Home</title>
      </Head>
      <>
        <DefaultOpenGraph title="vGhostity | Home" description={description} />
        <DefaultKeywords />
        <DefaultDescription />
      </>
      <HomeWelcome />
      <HomeOrganizations logos={logos} />
      <HomeLive />
      <HomeBrowse />
      <HomeStats />
      <HomeHelp />
      <Footer />
    </>
  );
}

export default Home;
