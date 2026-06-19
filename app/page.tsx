import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/shared/WhatsAppFloatingButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06060e] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <WorkflowSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <Footer />
      <WhatsAppFloatingButton />
    </main>
  );
}

