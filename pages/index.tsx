// Libraries
import Head from "next/head";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

// Components
import HomeWelcome from "../components/Home/HomeWelcome";
import Footer from "../components/general/Footer";
import HomeLive from "../components/Home/HomeLive";
import HomeOrganizations from "../components/Home/HomeOrganizations";
import HomeBrowse from "../components/Home/HomeBrowse";
import HomeHelp from "../components/Home/HomeHelp";
import HomeStats2 from "../components/Home/HomeStats2";

export const getStaticProps: GetStaticProps = async () => {
  const fetchLogos = await fetch(
    "https://api.ghostity.com/organizations/logos"
  );
  const logos = await fetchLogos.json();

  return { props: { logos }, revalidate: 6000 };
};

export default function Home({ logos }: OrganizationLogos) {

  return (
    <motion.div className="overflow-hidden">
      <Head>
        <title>Ghostity | Home</title>
      </Head>
      <HomeWelcome />
      <HomeOrganizations logos={logos} />
      <HomeLive />
      <HomeBrowse />
      <HomeStats2/>
      <HomeHelp />
      <Footer />
    </motion.div>
  );
}
