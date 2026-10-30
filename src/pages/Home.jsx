import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import { AboutSection, ServicesSection } from "../components/Sections";
import { ProjectsSection } from "../components/Projects";
import { ProcessSection, WhySection } from "../components/Process";
import { TestimonialsSection } from "../components/Testimonials";
import { GallerySection } from "../components/Gallery";
import { ContactSection } from "../components/Contact";
import { Reveal } from "../components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection limit={8} />
      <ProjectsSection limit={6} />
      <ProcessSection />
      <WhySection />
      <TestimonialsSection />
      <GallerySection limit={6} />
      <Reveal className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <div className="rounded-3xl overflow-hidden relative shadow-lift">
          <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1800&auto=format&fit=crop" alt="CTA" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
          <div className="relative px-8 py-16 md:py-20 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Free First Consultation</p>
            <h2 className="font-serif text-2xl md:text-3xl text-cream mt-3">Want a Similar Space?</h2>
            <p className="text-cream/70 mt-3 max-w-xl mx-auto text-[15px]">Share your floor plan or photos on WhatsApp — we will suggest a design direction within 24 hours.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-7 bg-gold text-charcoal px-8 py-3.5 rounded-full text-sm font-medium hover:bg-cream transition-colors">
              Book a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>
      <ContactSection />
    </>
  );
}
