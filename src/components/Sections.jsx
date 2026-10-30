import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { services } from "../data/services";
import { Reveal, SectionHeading } from "./ui";

export function ServiceCard({ s }) {
  const Icon = s.icon;
  return (
    <Link
      to={`/services/${s.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift hover:-translate-y-1.5 transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden img-zoom">
        <img
          src={s.image}
          alt={s.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-70" />
        <span className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-cream/90 backdrop-blur grid place-items-center text-espresso">
          <Icon size={19} />
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-charcoal">{s.name}</h3>
        <p className="text-sm text-coffee mt-2 leading-relaxed">{s.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-[13px] tracking-wide text-golddark font-medium mt-4">
          Explore Service{" "}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>
    </Link>
  );
}

export function AboutSection() {
  const points = [
    "Residential interiors",
    "Commercial interiors",
    "Customized design solutions",
    "Quality-focused execution",
    "Modern aesthetics",
  ];
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      <Reveal className="relative">
        <div className="rounded-2xl overflow-hidden shadow-soft img-zoom">
          <img
            src={services[0].image}
            alt="Ananya project"
            loading="lazy"
            className="w-full h-[480px] object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-2 md:right-8 bg-charcoal text-cream rounded-2xl px-7 py-5 shadow-lift">
          <p className="font-serif text-4xl text-gold">4.9</p>
          <p className="text-xs tracking-[0.2em] uppercase text-cream/70 mt-1">
            254+ happy reviews
          </p>
        </div>
      </Reveal>
      <div>
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium">
            About Ananya
          </p>
          <h2 className="font-serif text-2xl md:text-4xl mt-3 leading-tight">
            Spaces Designed Around You.
          </h2>
        </Reveal>{" "}
        <Reveal delay={0.1}>
          <p className="text-coffee mt-5 leading-relaxed">
            Ananya, a front-runner one-stop interior and exterior products mall
            have it's origin in the year1995. A humble start-up by Mr. Vikas
            Bansal by the name of "M/s Bansal Wood Decor (P) Ltd.", focusing on
            a single point i.e. plywood, laminates, doors, veneers and other
            interior & exterior products. It's been almost two and half decade
            in the journey of providing the best of the products in the best of
            the class under one roof.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 text-[15px] text-charcoal/85"
              >
                <BadgeCheck size={18} className="text-golddark shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-espresso transition-colors"
          >
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesSection({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
 <section className="bg-beige/60 pt-10 pb-16 md:pt-14 md:pb-20">
  <div className="max-w-7xl mx-auto px-5 md:px-8">
    <SectionHeading
      eyebrow="Our Expertise"
      title="What We Design"
      desc="From single rooms to complete homes and workplaces — every detail planned around you."
    />

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
      {list.map((s, i) => (
        <Reveal key={s.id} delay={(i % 4) * 0.07}>
          <ServiceCard s={s} />
        </Reveal>
      ))}
    </div>
  </div>
</section>
  );
}
