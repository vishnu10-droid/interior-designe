import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./ui";

const KITCHEN_IMAGE = "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=2000&auto=format&fit=crop";
const CONSULT_IMAGE = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop";

export function FeatureBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

  return (
    <section ref={ref} className="relative w-full min-h-[460px] md:min-h-[560px] flex items-center overflow-hidden bg-charcoal">
      <motion.img
        src={KITCHEN_IMAGE}
        alt="Premium modular kitchen by Ananya Interior"
        loading="lazy"
        style={{ y: imageY, scale: imageScale }}
        className="absolute -inset-[6%] h-[112%] w-[112%] object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
        <Reveal className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-gold">
            <Sparkles size={14} /> Featured Space
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mt-5 leading-[1.15]">
            Kitchens That Inspire <em className="italic text-gold">Everyday Living.</em>
          </h2>
          <div className="mt-5 h-px w-20 bg-gold" />
          <p className="text-cream/75 mt-5 text-[15px] leading-relaxed max-w-lg">
            Tall storage, quartz islands and easy-clean finishes — chef-grade
            workflow shaped around the way your family gathers.
          </p>
          <Link
            to="/services/modular-kitchen"
            className="group mt-8 inline-flex items-center gap-3 bg-gold text-charcoal px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-cream transition-colors"
          >
            Explore More
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ConsultationBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative w-full min-h-[480px] md:min-h-[560px] grid place-items-center overflow-hidden bg-charcoal">
      <motion.img
        src={CONSULT_IMAGE}
        alt="Luxury interior by Ananya Interior"
        loading="lazy"
        style={{ y: imageY }}
        className="absolute -inset-[6%] h-[112%] w-[112%] object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-charcoal/75" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/40" />

      <Reveal className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-8 py-20 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Free First Consultation</p>
        <h2 className="font-serif text-3xl md:text-5xl text-cream mt-4 leading-tight">
          Let's Create Your <em className="italic text-gold">Dream Space.</em>
        </h2>
        <p className="text-cream/75 mt-5 max-w-xl mx-auto text-[15px] leading-relaxed">
          Share your floor plan or photos on WhatsApp — we will suggest a trade
          direction within 24 hours.
        </p>
        <Link
          to="/contact"
          className="group mt-8 inline-flex items-center gap-3 bg-gold text-charcoal px-9 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-cream transition-colors shadow-lift"
        >
          Book a Consultation
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
