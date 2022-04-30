import Navbar from "../components/Navbar";
import BannerCarousel from "../components/BannerCarousel";
import InfoBar from "../components/InfoBar";
import Footer from "../components/Footer";
import PopularLiveChannels from "../components/PopularLiveChannels";
import OrganizationLogoCarousel from "../components/OrganizationLogoCarousel";
import BrowseBar from "../components/BrowseBar";
import Help from "../components/Help";

export async function getStaticProps() {
  const logos = await fetch("https://api.ghostity.com/organizations/logos");
  const organizationLogos = await logos.json();

  const stats = await fetch("https://api.ghostity.com/general/stats");
  const generalStats = await stats.json();

  return { props: { organizationLogos, generalStats }, revalidate: 6000 };
}

export default function Home({ banner, organizationLogos, generalStats }) {
  return (
    <>
      <main className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <Navbar />
        <BannerCarousel banner={banner} />
        <OrganizationLogoCarousel logos={organizationLogos} />
        <PopularLiveChannels />
        <BrowseBar />
        <InfoBar stats={generalStats} />
        <Help />
      </main>
      <Footer />
    </>
  );
}
