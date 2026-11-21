import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "../data/services";
import { ServiceCard } from "../components/Sections";
import { ContactSection } from "../components/Contact";
import { Reveal } from "../components/ui";

export function PageHero({ eyebrow, title, desc, image }) {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 100, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 24 });
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative flex min-h-[390px] items-end overflow-hidden bg-charcoal py-16 md:min-h-[470px] md:py-20"
      style={{ perspective: 1200 }}
    >
      <motion.img
        src={image}
        alt={title}
        animate={reduceMotion ? undefined : { scale: [1.08, 1.14, 1.08] }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          y: reduceMotion ? 0 : imageY,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformPerspective: 1200,
          scale: reduceMotion ? 1 : undefined,
        }}
        className="absolute -inset-[6%] h-[112%] w-[112%] object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/10" />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-charcoal/30 px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-gold backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(198,168,124,0.9)]" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {desc && <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/75 md:text-base">{desc}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        eyebrow="Our Services"
        title="What We Design"
        desc="Explore interior design services and trusted materials for every space."
        image={services[1].image}
      />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={(i % 4) * 0.06}>
            <ServiceCard s={s} />
          </Reveal>
        ))}
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
        <Link
          to="/services"
          className="inline-flex items-center gap-2 mt-6 text-golddark"
        >
          <ArrowLeft size={16} /> Back to services
        </Link>
      </div>
    );
  }
  const Icon = s.icon;
  return (
    <div className="pt-[72px]">
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden bg-charcoal">
        <img
          src={s.image}
          alt={s.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-cream/70 text-sm hover:text-cream w-fit"
          >
            <ArrowLeft size={15} /> All services
          </Link>
          <span className="w-14 h-14 rounded-2xl bg-gold text-charcoal grid place-items-center mt-5">
            <Icon size={24} />
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4">
            {s.name}
          </h1>
          <p className="text-white/75 max-w-xl mt-3">{s.desc}</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-6">
        <Reveal className="md:col-span-2 bg-white rounded-3xl p-8 shadow-card border border-charcoal/5">
          <h2 className="font-serif text-2xl">What is included</h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {[
              "Free site measurement",
              "2D layout + 3D views",
              "Material & colour palette",
              "Branded hardware",
              "Skilled execution team",
              "Post-handover support",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm text-charcoal/85"
              >
                <CheckCircle2 size={17} className="text-golddark shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <h2 className="font-serif text-2xl mt-8">Our approach</h2>
          <p className="text-coffee text-[15px] leading-relaxed mt-3">
            Every {s.name.toLowerCase()} project begins with understanding how
            you live or work. We then plan storage, light and movement before
            selecting finishes — so the space looks premium and works
            effortlessly every day.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-7 bg-charcoal text-cream px-7 py-3.5 rounded-full text-sm hover:bg-espresso transition-colors"
          >
            Book a Consultation <ArrowRight size={15} />
          </Link>
        </Reveal>
        <Reveal
          delay={0.1}
          className="bg-charcoal rounded-3xl p-8 text-cream h-fit"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">
            Other services
          </p>
          <ul className="mt-4 space-y-1">
            {services
              .filter((x) => x.id !== s.id)
              .slice(0, 6)
              .map((o) => (
                <li key={o.id}>
                  <Link
                    to={`/services/${o.id}`}
                    className="flex items-center justify-between py-2.5 border-b border-white/10 text-sm text-cream/80 hover:text-gold transition-colors"
                  >
                    {o.name}
                    <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
