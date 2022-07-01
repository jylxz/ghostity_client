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
  const API = process.env.NEXT_PUBLIC_API as string;

  const logos = await axios
    .get<OrganizationLogos>(`${API}/organizations/logos`)
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
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="keywords"
          content="V-Tubers, VTubers, virtual youtubers, Hololive, Nijisanji, VShojo, VSPO, Twitch, Youtube, V-Tuber directory, VTuber app, livestreams, games"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Ghostity | Home" />
        <meta
          name="twitter:description"
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ghostity/image/upload/v1656661542/Logos/ghostity-720x720_jznyvc.png"
        />
        <meta property="og:title" content="Ghostity | Home" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/ghostity/image/upload/v1656661542/Logos/ghostity-720x720_jznyvc.png"
        />
        <meta
          property="description"
          content="A comprehensive (not exhaustive!) app for V-Tubers! Keep up with your favorite V-Tubers from Hololive or Nijisanji, or even explore and discover a new V-Tuber that you haven't even heard about!"
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="360" />
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
