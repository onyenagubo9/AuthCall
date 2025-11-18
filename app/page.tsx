import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import CountriesSection from "@/components/CountriesSection";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader /> {/* 👈 FULL SCREEN LOADER */}

      <Navbar />

      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <CountriesSection />

      <Footer />
    </>
  );
}
