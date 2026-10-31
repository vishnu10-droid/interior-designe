import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "../data/services";
import { ServiceCard } from "../components/Sections";
import { ContactSection } from "../components/Contact";
import { Reveal } from "../components/ui";

export function PageHero({ eyebrow, title, desc, image }) {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-charcoal">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-30 text-3xl md:text-4xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">{eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-cream mt-4">{title}</h1>
          {desc && <p className="text-cream/70 max-w-xl mt-4">{desc}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <PageHero eyebrow="Our Services" title="What We Design" desc="Eight specialised services — one accountable studio from concept to handover." image={services[1].image} />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => <Reveal key={s.id} delay={(i % 4) * 0.06}><ServiceCard s={s} /></Reveal>)}
      </section>
      <ContactSection />
    </div>
  );
}

export function ServiceDetail() {
  const { id } = useParams();
  const s = services.find((x) => x.id === id);
  if (!s) {
    return (
      <div className="pt-[72px] max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-serif text-4xl">Service not found</h1>
        <Link to="/services" className="inline-flex items-center gap-2 mt-6 text-golddark"><ArrowLeft size={16} /> Back to services</Link>
      </div>
    );
  }
  const Icon = s.icon;
  return (
    <div className="pt-[72px]">
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden bg-charcoal">
        <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-cream/70 text-sm hover:text-cream w-fit"><ArrowLeft size={15} /> All services</Link>
          <span className="w-14 h-14 rounded-2xl bg-gold text-charcoal grid place-items-center mt-5"><Icon size={24} /></span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4">{s.name}</h1>
          <p className="text-white/75 max-w-xl mt-3">{s.desc}</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-6">
        <Reveal className="md:col-span-2 bg-white rounded-3xl p-8 shadow-card border border-charcoal/5">
          <h2 className="font-serif text-2xl">What is included</h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {["Free site measurement", "2D layout + 3D views", "Material & colour palette", "Branded hardware", "Skilled execution team", "Post-handover support"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-charcoal/85"><CheckCircle2 size={17} className="text-golddark shrink-0" />{f}</li>
            ))}
          </ul>
          <h2 className="font-serif text-2xl mt-8">Our approach</h2>
          <p className="text-coffee text-[15px] leading-relaxed mt-3">Every {s.name.toLowerCase()} project begins with understanding how you live or work. We then plan storage, light and movement before selecting finishes — so the space looks premium and works effortlessly every day.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-7 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm hover:bg-espresso transition-colors">Book a Consultation <ArrowRight size={15} /></Link>
        </Reveal>
        <Reveal delay={0.1} className="bg-charcoal rounded-3xl p-8 text-cream h-fit">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Other services</p>
          <ul className="mt-4 space-y-1">
            {services.filter((x) => x.id !== s.id).slice(0, 6).map((o) => (
              <li key={o.id}><Link to={`/services/${o.id}`} className="flex items-center justify-between py-2.5 border-b border-white/10 text-sm text-cream/80 hover:text-gold transition-colors">{o.name}<ArrowRight size={14} /></Link></li>
            ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
