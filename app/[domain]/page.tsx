import { notFound } from "next/navigation";
import { getLanguageData, getPostsForSite, getSiteData } from "@/lib/fetchers";
import db from "@/lib/db";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/HeroSection";
import LaunchPanel from "@/components/landing/LaunchPanel";
import FeatureCards from "@/components/landing/FeatureCards";
import ServiceCards from "@/components/landing/ServiceCards";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
export async function generateStaticParams() {
  const allSites = await db.query.sites.findMany({
    // feel free to remove this filter if you want to generate paths for all sites
    columns: {
      subdomain: true,
      customDomain: true,
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, language] = await Promise.all([
    getSiteData(domain),
    getLanguageData(domain)
  ]);

  if (!data || !language) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10 bg-gradient-to-r from-purple-900 via-blue-900 to-black ">
      <Navbar data={data} language={language} />
      <Hero language={language}/>
      <LaunchPanel />
      <section className="container mx-auto mt-10 px-4">
        <FeatureCards />
        <h2 className="mt-16 text-3xl font-bold text-white">Our Services</h2>
        <ServiceCards />
      </section>
      <Cta />
      <Footer />
    </main>
  );
}