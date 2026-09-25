import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, desc, center = true, light = false }) {
  return (
    <Reveal className={`${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium">{eyebrow}</p>
      <h2 className={`font-serif text-3xl md:text-5xl leading-tight mt-3 ${light ? "text-cream" : "text-charcoal"}`}>{title}</h2>
      <div className={`mt-4 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
      {desc && <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-cream/70" : "text-coffee"}`}>{desc}</p>}
    </Reveal>
  );
}

export function Stars({ size = 14 }) {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );
}
