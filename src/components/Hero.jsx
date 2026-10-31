import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "../data/services";
import { Stars } from "./ui";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <img
          src={IMAGES.hero}
          alt="Luxury home interior by AF Interior Agra"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />

      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white/50">
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Ananya — 27.17° N
        </span>
        <span className="w-px h-20 bg-white/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24 pt-40 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase text-gold border border-gold/40 bg-white/5 backdrop-blur px-4 py-2 rounded-full"
        >
          AF Interior • Agra
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="font-serif text-white text-2xl md:text-3xl leading-tight max-w-3xl mt-6"
        >
          Designing Spaces
          <br />
          That Feel Like{" "}
          <em className="text-gold not-italic font-serif italic">Home.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white/75 max-w-xl mt-5 text-[15px] md:text-lg leading-relaxed"
        >
          Premium interior design solutions crafted around your lifestyle,
          personality and vision.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-cream transition-colors"
          >
            Explore Our Work <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-full text-sm tracking-wide backdrop-blur hover:bg-white hover:text-charcoal transition-colors"
          >
            Book a Consultation
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl px-5 py-4"
        >
          <Stars />
          <span className="flex items-center gap-2 text-white">
            <span className="font-serif text-xl leading-none">4.9/5</span>
            <span className="text-xs text-white/70">
              254+ Google Reviews • Open 24 Hours
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
