import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import DesignBanner from "@/components/home/DesignBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-950">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <DesignBanner />
      <HowItWorks />
      <Footer />
    </main>
  );
}
