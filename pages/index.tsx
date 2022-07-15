// Libraries
import Head from "next/head";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

// Components
import { ReactElement } from "react";
import HomeWelcome from "../components/Home/HomeWelcome";
import Footer from "../components/general/Footer";
import HomeLive from "../components/Home/HomeLive";
import HomeOrganizations from "../components/Home/HomeOrganizations";
import HomeBrowse from "../components/Home/HomeBrowse";
import HomeHelp from "../components/Home/HomeHelp";
import HomeStats from "../components/Home/HomeStats";
import API from "../API";
import DefaultDescription, {
  description,
} from "../components/Head/Description";
import DefaultKeywords from "../components/Head/Keywords";
import DefaultOpenGraph from "../components/Head/OpenGraph";

export const getStaticProps: GetStaticProps = async () => {
  const logos = await API.get<OrganizationLogos>("/organizations/logos").then(
    (orgLogos) => orgLogos.data
  );

  return { props: { logos }, revalidate: 6000 };
};

function Home({ logos }: OrganizationLogos) {
  return (
    <motion.div className="overflow-hidden">
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
    </motion.div>
  );
}

export default Home