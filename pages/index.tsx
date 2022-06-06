// Libraries
import Head from "next/head";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

// Components
import HomeWelcome from "../components/Home/HomeWelcome";
import HomeStats from "../components/Home/HomeStats";
import Footer from "../components/general/Footer";
import HomeLive from "../components/Home/HomeLive";
import HomeOrganizations from "../components/Home/HomeOrganizations";
import HomeBrowse from "../components/Home/HomeBrowse";
import HomeHelp from "../components/Home/HomeHelp";

export const getStaticProps: GetStaticProps = async () => {
  const fetchLogos = await fetch(
    "https://api.ghostity.com/organizations/logos"
  );
  const logos = await fetchLogos.json();

  const fetchStats = await fetch("https://api.ghostity.com/general/stats");
  const stats = await fetchStats.json();

  return { props: { logos, stats }, revalidate: 6000 };
};

export default function Home({ logos, stats }: OrganizationLogos & Stats) {
  return (
    <motion.div key="home">
      <Head>
        <title>Ghostity | Home</title>
      </Head>
      <HomeWelcome />
      <HomeOrganizations logos={logos} />
      <HomeLive />
      <HomeBrowse />
      <HomeStats stats={stats} />
      <HomeHelp /> 
      <Footer />
    </motion.div>
  );
}
