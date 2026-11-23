import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { IMAGES } from "../data/services";
import { TextReveal, useIsMobile } from "./ui";

export default function Hero() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Smooth scroll handler for the scroll down indicator
  const scrollToContent = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  // 1. Advanced Scroll-Based Parallax & Zoom Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image Zoom: subtle on desktop, disabled on mobile / reduced motion.
  const imageScale = useTransform(scrollYProgress, [0, 1], isMobile || reduceMotion ? [1, 1] : [1, 1.35]);

  // Parallax Y Movement: Background moves downwards on scroll (desktop only).
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile || reduceMotion ? ["0%", "0%"] : ["0%", "35%"]);

  // Opacity fade on scroll for better contrast
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // Content Parallax (moves upward slightly faster)
  const contentY = useTransform(scrollYProgress, [0, 1], isMobile || reduceMotion ? ["0%", "0%"] : ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 2. Mouse Move Parallax Setup (Interactive Desktop Micro-Tilt)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const bgMouseX = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const bgMouseY = useTransform(mouseYSpring, [-0.5, 0.5], ["-1.2%", "1.2%"]);

  const handleMouseMove = (e) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={isMobile || reduceMotion ? undefined : handleMouseMove}
      className="relative min-h-screen flex items-end overflow-hidden bg-charcoal"
    >
      {/* Dynamic Scroll-Zoom & Parallax Background Image */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          opacity: imageOpacity,
          x: bgMouseX,
          translateY: bgMouseY,
        }}
        className="absolute inset-0 w-full h-full will-change-transform origin-center"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={IMAGES.hero}
          alt="Luxury home interior by Ananya Interior Agra"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
      </motion.div>

      {/* Modern Gradient Overlays for Cinematic Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/40 z-[1] pointer-events-none" />

      {/* Vertical Decorative Coordinate Line */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-10 text-white/40"
      >
        <span
          className="text-[10px] tracking-[0.45em] uppercase font-light text-gold/80"
          style={{ writingMode: "vertical-rl" }}
        >
          Ananya — 27.17° N
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-gold/60 via-white/20 to-transparent" />
      </motion.div>

      {/* Decorative circular heritage badge */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 1, delay: 0.7 }, scale: { duration: 1, delay: 0.7 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
        className="hidden lg:grid absolute right-12 top-28 z-10 h-36 w-36 place-items-center rounded-full border border-gold/40 bg-charcoal/30 text-center shadow-xl backdrop-blur-md"
      >
        <span className="absolute inset-2 rounded-full border border-dashed border-gold/25" />
        <span className="relative">
          <span className="block text-[9px] tracking-[0.35em] uppercase text-gold/80">Est.</span>
          <span className="block font-serif text-3xl text-cream leading-tight">1995</span>
          <span className="block text-[9px] tracking-[0.28em] uppercase text-cream/60">Ananya · Agra</span>
        </span>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 pt-36 w-full"
      >
        {/* Top Tag / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.35em] uppercase text-gold border border-gold/30 bg-charcoal/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-black/20">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            Ananya - endless Decore Ideas
          </span>
        </motion.div>

        {/* Hero Heading — cinematic enter from the left */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] max-w-3xl mt-5 tracking-tight drop-shadow-md"
        >
          <TextReveal delay={0.2}>A Unit of Bansal Wood</TextReveal> <br />
          {/* <TextReveal delay={0.3}>
            <span className="text-white/90">That Feel Like </span>
          </TextReveal> */}
          <TextReveal delay={0.42}>
            <em className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-amber-400 not-italic font-serif italic">
              Decore Pvt.Ltd
            </em>
          </TextReveal>
        </motion.h1>

        {/* Subtitle — reveals just after the heading */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 max-w-xl mt-4 text-sm md:text-base leading-relaxed font-light drop-shadow-sm"
        >
          Premium interior trade solutions crafted around your lifestyle,
          personality, and architectural vision.
        </motion.p>

        {/* Call To Action Buttons — slight delay after the copy */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 mt-8"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-charcoal px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl hover:shadow-gold/25 transition-all duration-300"
            >
              Explore Products
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white bg-white/5 hover:bg-white hover:text-charcoal px-6 py-3 rounded-full text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 shadow-lg"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Interactive Bouncing Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToContent}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 group-hover:text-gold transition-colors duration-300 font-light">
          Scroll Down
        </span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/10 transition-colors duration-300 shadow-lg"
        >
          <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}