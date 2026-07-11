import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/ui/Hero";
import Services from "@/components/ui/Services";
import Products from "@/components/ui/Products";
import HowItWorks from "@/components/ui/HowItWorks";
import Gallery from "@/components/ui/Gallery";
import Testimonials from "@/components/ui/Testimonials";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <WhatsAppButton />
      <Footer />
    </>
  );
}