import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "../components/Contact";
import { PageHero } from "./Services";
import { Reveal } from "../components/ui";
import { IMAGES } from "../data/services";

export function ContactPage() {
  return (
    <div className="pt-[72px]">
      <PageHero eyebrow="Contact" title="Let's Create Your Space" desc="Call, WhatsApp or send the form — we respond within a few hours." image={IMAGES.aboutSmall} />
      <ContactSection />
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <Reveal className="rounded-3xl overflow-hidden shadow-card border border-charcoal/10">
          <iframe title="Ananya Interior location map" src="https://www.google.com/maps?q=Sanjay+Place+Civil+Lines+Agra+282002&output=embed" className="w-full h-[380px] border-0" loading="lazy" />
        </Reveal>
        <div className="text-center mt-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-coffee hover:text-charcoal">Back to home <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="pt-[72px] min-h-[70vh] grid place-items-center px-5">
      <div className="text-center">
        <p className="font-serif text-7xl text-sand">404</p>
        <h1 className="font-serif text-3xl mt-2">This space is still being tradeed.</h1>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm">Back to Home <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}
