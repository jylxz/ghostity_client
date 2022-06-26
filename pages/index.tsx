// Libraries
import Head from "next/head";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import axios from "axios";

// Components
import HomeWelcome from "../components/Home/HomeWelcome";
import Footer from "../components/general/Footer";
import HomeLive from "../components/Home/HomeLive";
import HomeOrganizations from "../components/Home/HomeOrganizations";
import HomeBrowse from "../components/Home/HomeBrowse";
import HomeHelp from "../components/Home/HomeHelp";
import HomeStats2 from "../components/Home/HomeStats2";

export const getStaticProps: GetStaticProps = async () => {
  const logos = await axios
    .get<OrganizationLogos>("https://api.ghostity.com/organizations/logos")
    .then((orgLogos) => orgLogos.data);

  return { props: { logos }, revalidate: 6000 };
};

export default function Home({ logos }: OrganizationLogos) {
  return (
    <motion.div className="overflow-hidden">
      <Head>
        <title>Ghostity | Home</title>
        <meta
          name="description"
          content="A comprehensive (not exhaustive!) directory for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="keywords"
          content="V-Tubers, VTubers, virtual youtubers, Hololive, Nijisanji, VShojo, VSPO, Twitch, Youtube, V-Tuber directory, livestreams, games"
        />
      </Head>
      <HomeWelcome />
      <HomeOrganizations logos={logos} />
      <HomeLive />
      <HomeBrowse />
      <HomeStats2 />
      <HomeHelp />
      <Footer />
    </motion.div>
  );
}
