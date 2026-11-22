import { useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck, Compass, Lightbulb, Award, MapPin, Clock } from "lucide-react";
import { services } from "../data/services";
import { productCategories, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { steps } from "./Process";
import { ProductCard } from "./ProductCard";
import { Reveal, RevealLeft, RevealRight, SectionHeading, StaggerContainer, StaggerItem, useIsMobile } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export function ServiceCard({ s }) {
  const Icon = s.icon;
  const reduceMotion = useReducedMotion();
  
  // 3D Tilt Mouse Setup for Service Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        <Link
          to={`/services/${s.id}`}
          className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-shadow duration-500 border border-black/5 h-full"
        >
          {/* Card Image Container with Smooth Zoom */}
          <div className="relative h-56 overflow-hidden bg-charcoal" style={{ transform: "translateZ(30px)" }}>
            <motion.img
              src={s.image}
              alt={s.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Animated 3D Icon Badge */}
            <motion.span
              whileHover={reduceMotion ? undefined : { rotate: 15, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-cream/95 backdrop-blur-md grid place-items-center text-espresso shadow-lg"
            >
              <Icon size={19} />
            </motion.span>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col flex-grow justify-between bg-white" style={{ transform: "translateZ(20px)" }}>
            <div>
              <h3 className="font-serif text-xl text-charcoal group-hover:text-golddark transition-colors duration-300">
                {s.name}
              </h3>
              <p className="text-sm text-coffee mt-2.5 leading-relaxed font-light line-clamp-2">
                {s.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center">
              <span className="inline-flex items-center gap-1.5 text-[13px] tracking-wide text-golddark font-medium">
                Explore Service{" "}
                <motion.span
                  animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
                  transition={{ duration: reduceMotion ? 0 : 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/** Static catalogue card — used only in the mobile 2-column grid. */
function MobileCategoryCard({ category }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gold/40 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift active:shadow-lift"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-xl bg-beige">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          onError={(event) => {
            const image = event.currentTarget;
            if (!image.src.endsWith(PRODUCT_RANGE_FALLBACK_IMAGE)) {
              image.src = PRODUCT_RANGE_FALLBACK_IMAGE;
            }
          }}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-1 font-serif text-[13px] font-semibold leading-tight text-charcoal transition-colors group-hover:text-golddark">
          {category.name}
        </h3>
        <p className="line-clamp-1 text-[10px] leading-tight text-coffee">
          {category.brands?.length ? category.brands.slice(0, 3).join(" · ") : "Premium materials"}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-gold/20 pt-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-golddark">Explore</span>
          <ArrowRight
            size={13}
            className="shrink-0 text-golddark transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}

export function InteriorCategories() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // useLayoutEffect (not useEffect) so GSAP's pin-spacer is reverted BEFORE
  // React removes the section from the DOM on route change — otherwise React
  // throws "removeChild: node is not a child" and the next page stays blank.
  useLayoutEffect(() => {
    if (reduceMotion || isMobile) return undefined;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    // Travel exactly as far as the track overflows the viewport, so the last
    // card is completely visible before the pinned section releases.
    const getTravel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTravel()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ctx.revert(); // kills tween + ScrollTrigger + pin spacer on unmount
    };
  }, [reduceMotion, isMobile]);

  // Mobile never mounts the pinned slider track — no scrolling, no animation.
  if (isMobile) {
    return (
      <section id="categories" className="relative overflow-hidden bg-beige/60 py-14">
        <div className="mx-auto w-full max-w-7xl px-5">
          <SectionHeading
            eyebrow="All Categories"
            title="Browse Every Category"
            desc="From the first sketch to the final detail — interiors shaped around the way you live and work. Open a category to see all its products."
          />
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-3" stagger={0.09}>
            {productCategories.map((category, i) => (
              <StaggerItem key={category.id} direction={["left", "up", "right"][i % 3]} scale={0.96}>
                <MobileCategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="categories"
      className={`relative bg-beige/60 ${
        reduceMotion ? "py-20" : "flex h-screen flex-col justify-center overflow-hidden"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="All Categories"
          title="Browse Every Category"
          desc="From the first sketch to the final detail — interiors shaped around the way you live and work. Open a category to see all its products."
        />
      </div>

      <div
        ref={viewportRef}
        className={`mt-6 overflow-hidden py-12 ${reduceMotion ? "overflow-x-auto" : ""}`}
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex w-max gap-5 px-5 md:gap-6 md:px-8">
          {productCategories.map((category, i) => (
            <div
              key={category.id}
              className={`w-[210px] shrink-0 sm:w-[240px] lg:w-[280px] ${
                i % 2 === 0 ? "-translate-y-6" : "translate-y-6"
              }`}
            >
              <ProductCard category={category} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Static grid version used by the dedicated /categories page (no slider/pin). */
export function CategoryGrid() {
  return (
    <section id="categories" className="bg-beige/60 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="All Categories"
          title="Browse Every Category"
          desc="From the first sketch to the final detail — interiors shaped around the way you live and work. Open a category to see all its products."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, i) => (
            <Reveal key={category.id} delay={Math.min((i % 8) * 0.05, 0.3)} className="h-full">
              <ProductCard category={category} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const points = [
    "Residential interiors",
    "Commercial interiors",
    "Customized trade solutions",
    "Quality-focused execution",
    "Modern aesthetics",
  ];

  const principles = [
    {
      icon: Lightbulb,
      label: "Our Vision",
      text: "Thoughtful, beautiful interiors made for real life.",
    },
    {
      icon: Compass,
      label: "Trade Philosophy",
      text: "Plan light, storage and flow before finishes.",
    },
    {
      icon: Award,
      label: "Our Experience",
      text: "Since 1995 — trusted across Agra.",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: introduction and supporting information */}
        <RevealLeft>
          <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-golddark font-semibold mb-3">
            About Ananya
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight leading-[1.15]">
            Spaces Tradeed <br className="hidden md:block" /> Around You.
          </h2>
          <div className="mt-5 h-px w-20 bg-gold" />
          <p className="text-coffee mt-6 leading-relaxed font-light text-base md:text-lg">
            Ananya, a front-runner one-stop interior and exterior products mall
            has its origin in the year 1995. A humble start-up by Mr. Vikas
            Bansal by the name of “M/s Bansal Wood Decor (P) Ltd.”, focusing on a
            single point — plywood, laminates, doors, veneers and other interior
            &amp; exterior products.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
            {[
              ["1995", "Founded"],
              ["24+", "Years of craft"],
              ["Agra", "Our home"],
            ].map(([value, label]) => (
              <div key={label} className="border-l-2 border-gold/60 pl-4">
                <p className="font-serif text-2xl md:text-3xl text-espresso">{value}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-stonewarm mt-1">{label}</p>
              </div>
            ))}
          </div>

       

          <div className="mt-9">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 bg-charcoal text-cream px-8 py-4 rounded-full text-sm font-medium tracking-wide shadow-xl hover:bg-espresso transition-colors duration-300"
            >
              Discover Our Story
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Our Vision / Trade Philosophy / Our Experience — placed below Discover Our Story. */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {principles.map(({ icon: Icon, label, text }, i) => (
              <Reveal key={label} direction={["left", "up", "right"][i % 3]} delay={0.18 + i * 0.06} className="h-full">
                <div className="h-full rounded-2xl bg-beige/50 border border-charcoal/5 p-5 hover:border-gold/40 hover:shadow-card transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-charcoal text-gold grid place-items-center shrink-0">
                    <Icon size={18} />
                  </span>
                  <h4 className="font-serif text-lg text-charcoal mt-4">{label}</h4>
                  <p className="text-coffee text-[13px] leading-relaxed mt-2">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </RevealLeft>

        {/* Right: detailed company information */}
        <div className="space-y-5">
          <RevealRight delay={0.08}>
            <div className="rounded-3xl border border-charcoal/5 bg-white p-7 md:p-9 shadow-card">
              <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium">Our Story</p>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-3">
                Two decades of crafting under one roof.
              </h3>
              <p className="text-coffee text-[15px] leading-relaxed mt-4">
                It's been almost two and a half decades in the journey of
                providing the best products in the best class under one roof.
                What began with plywood and laminates has grown into a complete
                interior and exterior destination — backed by a trade studio
                that plans, executes and handovers with care.
              </p>
              <p className="flex items-center gap-2 text-sm text-stonewarm mt-5">
                <MapPin size={15} className="text-gold" /> Agra, Uttar Pradesh · Open 24 Hours
              </p>
            </div>
          </RevealRight>

          {/* "How We Work" — process overview in the right column. */}
          <RevealRight delay={0.12}>
            <div className="rounded-3xl bg-charcoal p-7 md:p-9 text-cream">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold">How We Work</p>
              <h4 className="font-serif text-2xl mt-2">From Vision to Reality</h4>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {steps.map((step) => (
                  <div key={step.n} className="flex items-start gap-3 border-t border-white/10 pt-3">
                    <step.icon size={16} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-cream/90">{step.title}</p>
                      <p className="text-xs text-cream/50 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="flex items-center gap-2 text-xs text-cream/50 mt-6">
                <Clock size={14} className="text-gold" /> Open 24 Hours — call or WhatsApp anytime for guidance.
              </p>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="bg-beige/60 py-20 md:py-28 relative overflow-hidden">
      {/* Animated Multi-Layer Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <SectionHeading
          eyebrow="Our Expertise"
          title="What We Trade"
          desc="From single rooms to complete homes and workplaces — every detail planned around you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {list.map((s, i) => (
            <Reveal key={s.id} direction={["left", "up", "right", "up"][i % 4]} delay={(i % 4) * 0.08} className="h-full">
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}