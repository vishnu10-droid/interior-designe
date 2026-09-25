import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { reviews } from "../data/content";
import { GalleryGrid } from "../components/Gallery";
import { ContactSection } from "../components/Contact";
import { TestimonialsSection } from "../components/Testimonials";
import { PageHero } from "./Services";
import { Reveal, SectionHeading, Stars } from "../components/ui";

export function GalleryPage() {
  return (
    <div className="pt-[72px]">
      <PageHero eyebrow="Gallery" title="Design Gallery" desc="Living rooms, bedrooms, kitchens, offices and commercial spaces." image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14"><GalleryGrid /></div>
    </div>
  );
}

export function ReviewsPage() {
  return (
    <div className="pt-[72px]">
      <TestimonialsSection />
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <SectionHeading eyebrow="All Reviews" title="What Agra Says" desc="Customer feedback displayed for presentation purposes." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.07}>
              <div className="bg-white rounded-2xl p-7 shadow-card border border-charcoal/5 h-full">
                <Stars />
                <p className="text-[15px] text-charcoal/85 leading-relaxed mt-4">“{r.text}”</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-charcoal/8">
                  <span className="w-10 h-10 rounded-full bg-beige grid place-items-center font-serif text-espresso">{r.name[0]}</span>
                  <div><p className="text-sm font-medium">{r.name}</p><p className="text-xs text-coffee">{r.location} • {r.date}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="pt-[72px]">
      <PageHero eyebrow="Contact" title="Let's Create Your Space" desc="Call, WhatsApp or send the form — we respond within a few hours." image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" />
      <ContactSection />
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <Reveal className="rounded-3xl overflow-hidden shadow-card border border-charcoal/10">
          <iframe title="AF Interior location map" src="https://www.google.com/maps?q=Sanjay+Place+Civil+Lines+Agra+282002&output=embed" className="w-full h-[380px] border-0" loading="lazy" />
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
        <h1 className="font-serif text-3xl mt-2">This space is still being designed.</h1>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm">Back to Home <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}
