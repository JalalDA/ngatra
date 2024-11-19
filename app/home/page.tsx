// import Navbar from "@/components/NavBar";
// import FeatureCards from "@/components/landing/FeatureCards";
// import Footer from "@/components/landing/Footer";
// import Hero from "@/components/landing/HeroSection";
// import ServiceCards from "@/components/landing/ServiceCards";

import Navbar from "@/components/Navbar";
import Cta from "@/components/landing/Cta";
import FeatureCards from "@/components/landing/FeatureCards";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/HeroSection";
import LaunchPanel from "@/components/landing/LaunchPanel";
import ServiceCards from "@/components/landing/ServiceCards";

export default async function Home() {

  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10 bg-gradient-to-r from-purple-900 via-blue-900 to-black ">
      <Navbar/>
      <Hero />
      <LaunchPanel/>
      <section className="container mx-auto mt-10 px-4">
        <FeatureCards />
        <h2 className="mt-16 text-3xl font-bold text-white">Our Services</h2>
        <ServiceCards />
      </section>
      <Cta/>
      <Footer />
    </main>
  );
}
