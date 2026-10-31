import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { services } from "../data/services";
import { Reveal, SectionHeading } from "./ui";

export function ServiceCard({ s }) {
  const Icon = s.icon;
  
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
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
              whileHover={{ rotate: 15, scale: 1.15 }}
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
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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

export function AboutSection() {
  const containerRef = useRef(null);

  // Advanced Scroll Parallax & Scale Effect for About Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  const points = [
    "Residential interiors",
    "Commercial interiors",
    "Customized design solutions",
    "Quality-focused execution",
    "Modern aesthetics",
  ];

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden"
    >
      {/* Left Image Column with 3D Depth & Scroll Parallax */}
      <Reveal className="relative">
        <motion.div
          style={{ scale: imageScale }}
          className="rounded-3xl overflow-hidden shadow-2xl relative bg-charcoal will-change-transform"
        >
          <motion.div
            style={{ y: imageParallaxY }}
            className="w-full h-[520px] will-change-transform"
          >
            <img
              src={services[0].image}
              alt="Ananya project"
              loading="lazy"
              className="w-full h-full object-cover scale-110 filter brightness-95"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Floating Continuous 3D Float Animation Review Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          animate={{ y: [0, -8, 0] }}
          viewport={{ once: true }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8, delay: 0.3 },
          }}
          className="absolute -bottom-6 -right-2 md:right-8 bg-charcoal text-cream rounded-2xl px-8 py-5 shadow-2xl border border-white/10 backdrop-blur-xl"
        >
          <p className="font-serif text-4xl text-gold font-bold">4.9</p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-cream/70 mt-1 font-medium">
            254+ happy reviews
          </p>
        </motion.div>
      </Reveal>

      {/* Right Content Column with Staggered Entrance */}
      <div className="flex flex-col justify-center">
        <Reveal>
          <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-golddark font-semibold mb-3">
            About Ananya
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl text-charcoal font-semibold tracking-tight leading-[1.15]">
            Spaces Designed Around You.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-coffee mt-6 leading-relaxed font-light text-base md:text-lg">
            Ananya, a front-runner one-stop interior and exterior products mall
            has it's origin in the year 1995. A humble start-up by Mr. Vikas
            Bansal by the name of "M/s Bansal Wood Decor (P) Ltd.", focusing on
            a single point i.e. plywood, laminates, doors, veneers and other
            interior & exterior products. It's been almost two and half decades
            in the journey of providing the best of the products in the best of
            the class under one roof.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-8 space-y-3.5">
            {points.map((p, idx) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                className="flex items-center gap-3 text-[15px] text-charcoal/85 font-medium"
              >
                <motion.div
                  whileHover={{ scale: 1.25, rotate: 12 }}
                  className="w-6 h-6 rounded-full bg-gold/10 grid place-items-center text-golddark shrink-0 cursor-pointer shadow-sm"
                >
                  <BadgeCheck size={16} />
                </motion.div>
                {p}
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 bg-charcoal text-cream px-8 py-4 rounded-full text-sm font-medium tracking-wide shadow-xl hover:bg-espresso transition-colors duration-300"
              >
                Discover Our Story
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </motion.div>
          </div>
        </Reveal>
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
          title="What We Design"
          desc="From single rooms to complete homes and workplaces — every detail planned around you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.08} className="h-full">
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}