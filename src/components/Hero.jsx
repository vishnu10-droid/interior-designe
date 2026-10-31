import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { IMAGES } from "../data/services";
import { Stars } from "./ui";

export default function Hero() {
  const containerRef = useRef(null);

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

  // Image Zoom: Scales smoothly from 1.0 to 1.35 on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  
  // Parallax Y Movement: Background moves downwards on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  // Opacity fade on scroll for better contrast
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // Content Parallax (moves upward slightly faster)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
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
      onMouseMove={handleMouseMove}
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
          alt="Luxury home interior by AF Interior Agra"
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
            AF Interior • Agra
          </span>
        </motion.div>

        {/* Hero Heading (Made Smaller) */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] max-w-3xl mt-5 tracking-tight drop-shadow-md"
        >
          Designing Spaces <br />
          <span className="text-white/90">That Feel Like </span>
          <em className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-amber-400 not-italic font-serif italic">
            Home.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/80 max-w-xl mt-4 text-sm md:text-base leading-relaxed font-light drop-shadow-sm"
        >
          Premium interior design solutions crafted around your lifestyle,
          personality, and architectural vision.
        </motion.p>

        {/* Call To Action Buttons (Made Smaller & Compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="flex flex-wrap items-center gap-3 mt-8"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-gold via-amber-400 to-gold text-charcoal px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl hover:shadow-gold/25 transition-all duration-300"
            >
              Explore Our Work
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

        {/* Social Proof / Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 inline-flex items-center gap-3.5 rounded-2xl bg-charcoal/50 border border-white/15 backdrop-blur-xl px-5 py-3 shadow-2xl"
        >
          <Stars />
          <div className="flex flex-col">
            <span className="font-serif text-white text-lg font-bold leading-none">
              4.9 <span className="text-[11px] text-white/50 font-normal">/ 5.0</span>
            </span>
            <span className="text-[11px] text-white/75 mt-1 tracking-wide">
              254+ Google Reviews • Open 24 Hours
            </span>
          </div>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/10 transition-colors duration-300 shadow-lg"
        >
          <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}