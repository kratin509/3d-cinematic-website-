import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
import CustomizerSection from "@/components/CustomizerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0B0B0B] text-white">
      <Header />
      <HeroSection />
      <ParallaxSection />
      <CustomizerSection />
      <Footer />
    </main>
  );
}
