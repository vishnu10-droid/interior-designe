import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Navigation,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ContactSection } from "../components/Contact";
import { Reveal } from "../components/ui";
import {
  IMAGES,
  MAPS_LINK,
  PHONE_LINK,
} from "../data/services";

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  Cinematic contact hero                                                     */
/* -------------------------------------------------------------------------- */

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

function ContactHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[340px] items-center overflow-hidden bg-espressodeep md:min-h-[380px]">
      <motion.img
        src={IMAGES.hero}
        alt="A warm wooden chair in a sunlit interior"
        initial={reduce ? false : { scale: 1.14 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-70 brightness-[0.72] saturate-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#160f0a]/95 via-[#160f0a]/65 to-[#160f0a]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-espressodeep/70 via-transparent to-transparent" />

      <motion.div
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        variants={heroContainer}
        className="relative mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-16"
      >
        <motion.div variants={heroItem}>
          <span className="inline-flex items-center gap-2 rounded-full border border-champagne/50 bg-espressodeep/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-champagne backdrop-blur-md">
            <Sparkles size={12} />
            Contact
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="mt-6 max-w-2xl font-serif text-[2.5rem] leading-[1.06] text-cream sm:text-[3.4rem] md:text-[4.1rem]"
        >
          Let&rsquo;s Create
          <br />
          <em className="italic text-[#F3E3C8]">Your Space</em>
        </motion.h1>

        <motion.div variants={heroItem}>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/75 md:text-[15px]">
            Call, WhatsApp or send the form — we respond within a few hours.
          </p>

          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs font-medium tracking-wide text-espressodeep shadow-[0_14px_34px_-16px_rgba(196,154,90,0.95)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#d9b274]"
          >
            Get In Touch
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trust statistics                                                           */
/* -------------------------------------------------------------------------- */

const stats = [
  { value: "24+", label: "Projects Delivered", icon: PackageCheck },
  { value: "8", label: "Trade Services", icon: Award },
  { value: "1995", label: "Established", icon: CalendarDays },
  { value: "100%", label: "Client Satisfaction", icon: ShieldCheck },
];

function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
      <Reveal className="grid grid-cols-2 overflow-hidden rounded-[26px] border border-champagne/40 bg-white/70 shadow-[0_22px_60px_-38px_rgba(73,48,32,0.6)] backdrop-blur-sm md:grid-cols-4">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-6 md:gap-4 md:px-7 ${
              i % 2 === 1 ? "border-l border-champagne/25" : ""
            } ${i >= 2 ? "border-t border-champagne/25 md:border-t-0" : ""} ${
              i > 0 ? "md:border-l md:border-champagne/25" : ""
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-champagne/35 bg-champagne/10 text-champagne md:h-11 md:w-11">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-serif text-[24px] leading-none text-espressodeep md:text-[30px]">
                {value}
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-coffee">
                {label}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact page                                                               */
/* -------------------------------------------------------------------------- */

export function ContactPage() {
  return (
    <div className="pt-[72px]">
      <ContactHero />
      <ContactSection />
      <StatsStrip />

      <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <Reveal className="rounded-[28px] border border-champagne/50 bg-white p-1.5 shadow-[0_30px_70px_-36px_rgba(33,25,20,0.6)]">
          <div className="overflow-hidden rounded-[20px]">
            <iframe
              title="Ananya Interior location map"
              src="https://www.google.com/maps?q=Sanjay+Place+Civil+Lines+Agra+282002&output=embed"
              className="block h-[320px] w-full border-0 md:h-[420px]"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-espressodeep px-7 py-3 text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-brownrich"
          >
            <Navigation size={15} />
            Get Directions
            <ArrowRight size={15} />
          </motion.a>

          <motion.a
            href={PHONE_LINK}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-champagne/50 px-7 py-3 text-xs uppercase tracking-[0.16em] text-brownrich transition-colors hover:bg-champagne/10"
          >
            Call the studio
          </motion.a>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-creamwarm px-6 py-2.5 text-sm text-coffee transition-colors hover:border-champagne hover:text-espressodeep"
          >
            Back to home <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 pt-[72px]">
      <div className="text-center">
        <p className="font-serif text-7xl text-sand">404</p>
        <h1 className="mt-2 font-serif text-3xl">This space is still being tradeed.</h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm text-cream"
        >
          Back to Home <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
