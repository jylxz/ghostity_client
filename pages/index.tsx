import Head from "next/head";
import { GetStaticProps } from "next";
import WelcomeBanner from "../components/Home/WelcomeSection";
import Stats from "../components/Home/StatsSection";
import Footer from "../components/general/Footer";
import PopularLiveChannels from "../components/Home/PopularLiveChannelsSection";
import OrganizationLogoCarousel from "../components/Home/OrganizationLogosSection";
import BrowseBar from "../components/Home/BrowseSection";
import Help from "../components/Home/HelpSection";


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
}: OrganizationLogos & Stats) {
  return (
    <>
      <Head>
        <title>Ghostity | Home</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
      </Head>
      <main className="bg-gradient-to-r from-[#DEECFC] via-[#E1F2FB] to-[#F1F9F9] ">
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
