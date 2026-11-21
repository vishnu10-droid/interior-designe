import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

export function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
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
      <h2 className={`font-serif text-3xl md:text-3xl leading-tight mt-3 ${light ? "text-cream" : "text-charcoal"}`}>{title}</h2>
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

/** Shared accessible modal used by project and journal detail views. */
export function DetailModal({ open, onClose, children, label = "Details" }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-cream shadow-lift"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="sticky top-4 float-right z-10 mr-4 mt-4 grid h-10 w-10 place-items-center rounded-full bg-charcoal text-cream shadow-lg transition-transform hover:scale-105"
            >
              <X size={17} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
