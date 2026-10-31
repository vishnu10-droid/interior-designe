import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { IMAGES } from "../data/services";
import { Reveal, SectionHeading } from "../components/ui";
import { WhySection } from "../components/Process";

export default function About() {
  return (
    <div className="pt-[72px]">
      <section className="relative py-24 md:py-32 overflow-hidden bg-charcoal">
        <img src={IMAGES.about} alt="About AF Interior" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">About AF Interior</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mt-4 max-w-2xl leading-tight">Your space. Reimagined tomorrow.</h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="img-zoom rounded-2xl overflow-hidden shadow-soft">
          <img src={IMAGES.aboutSmall} alt="Studio work" loading="lazy" className="w-full h-[460px] object-cover" />
        </Reveal>
        <div>
          <Reveal><h2 className="font-serif text-3xl md:text-4xl leading-tight">Spaces Designed Around You.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="text-coffee mt-5 leading-relaxed">Ananya, a front-runner one-stop interior and exterior products mall have it's origin in the year1995. A humble start-up by Mr. Vikas Bansal by the name of "M/s Bansal Wood Decor (P) Ltd.", focusing on a single point i.e. plywood, laminates, doors, veneers and other interior & exterior products. It's been almost two and half decade in the journey of providing the best of the products in the best of the class under one roof.</p>
            
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {["Residential interiors", "Commercial interiors", "Customized design solutions", "Quality-focused execution", "Modern aesthetics", "Open 24 Hours support"].map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm bg-white border border-charcoal/8 rounded-xl px-4 py-3 shadow-card"><BadgeCheck size={17} className="text-golddark shrink-0" />{p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm hover:bg-espresso transition-colors">Discover Our Story <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige/60 py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[["4.9/5", "Google rating"], ["254+", "Happy reviews"], ["24+", "Projects delivered"], ["8", "Design services"]].map(([v, l]) => (
            <Reveal key={l} className="bg-white rounded-2xl p-7 text-center shadow-card">
              <div className="inline-flex items-center gap-2">
                <p className="font-serif text-3xl md:text-4xl text-espresso">{v}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-coffee">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <WhySection />
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <SectionHeading eyebrow="Visit Us" title="Our Agra Studio" desc="Shop No. 1, Block No. 4, Cloth Market, Sanjay Place, Civil Lines, Agra â€“ 282002. Open 24 Hours." center />
        <Reveal className="mt-8 rounded-3xl overflow-hidden shadow-card border border-charcoal/10">
          <iframe title="AF Interior location map" src="https://www.google.com/maps?q=Sanjay+Place+Civil+Lines+Agra+282002&output=embed" className="w-full h-[380px] border-0" loading="lazy" />
        </Reveal>
      </div>
    </div>
  );
}
