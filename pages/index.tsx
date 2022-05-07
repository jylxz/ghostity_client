import Head from "next/head";
import { GetStaticProps } from "next";
import WelcomeBanner from "../components/Home/WelcomeBanner";
import Stats from "../components/Home/Stats";
import Footer from "../components/general/Footer";
import PopularLiveChannels from "../components/Home/PopularLiveChannels";
import OrganizationLogoCarousel from "../components/Home/OrganizationLogoCarousel";
import BrowseBar from "../components/Home/BrowseBar";
import Help from "../components/Home/Help";

import * as interfaces from "../interfaces/API.interface";

export const getStaticProps: GetStaticProps = async () => {
  const fetchLogos = await fetch("https://api.ghostity.com/organizations/logos");
  const logos = await fetchLogos.json();

  const fetchStats = await fetch("https://api.ghostity.com/general/stats");
  const stats = await fetchStats.json();

  return { props: { logos, stats }, revalidate: 6000 };
};

export default function Home({
  logos,
  stats,
}: interfaces.OrganizationLogos & interfaces.Stats) {
  return (
    <>
      <Head>
        <title>Ghostity | Home</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
      </Head>
      <main className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <WelcomeBanner />
        <OrganizationLogoCarousel logos={logos} />
        <PopularLiveChannels />
        <BrowseBar />
        <Stats stats={stats} />
        <Help />
      </main>
      <Footer />
    </>
  );
}
