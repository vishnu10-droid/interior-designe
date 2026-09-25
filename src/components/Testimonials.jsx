import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "../data/content";
import { Reveal, SectionHeading, Stars } from "./ui";

export function TestimonialsSection() {
  const approved = reviews.filter((r) => r.status === "Approved");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % approved.length), 6000);
    return () => clearInterval(t);
  }, [approved.length]);

  const prev = () => setIdx((i) => (i - 1 + approved.length) % approved.length);
  const next = () => setIdx((i) => (i + 1) % approved.length);
  const r = approved[idx];

  return (
    <section className="bg-beige/60 py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Client Love" title="Rated 4.9 by Agra" desc="254+ Google reviews from homeowners and businesses we have designed for." />
        <Reveal className="relative mt-12">
          <div className="bg-charcoal rounded-3xl px-7 md:px-14 py-12 text-center shadow-lift relative overflow-hidden">
            <Quote size={90} className="absolute -top-2 left-6 text-white/5" />
            <Stars size={16} />
            <div className="min-h-[150px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={idx} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}>
                  <p className="font-serif text-xl md:text-2xl text-cream leading-relaxed max-w-2xl">“{r.text}”</p>
                  <p className="text-gold text-sm tracking-[0.2em] uppercase mt-6">{r.name}</p>
                  <p className="text-cream/50 text-xs mt-1">{r.location} • {r.date}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <button onClick={prev} aria-label="Previous review" className="w-11 h-11 rounded-full border border-white/20 text-white grid place-items-center hover:bg-white hover:text-charcoal transition-colors"><ChevronLeft size={18} /></button>
              <div className="flex gap-1.5">
                {approved.map((_, i) => (
                  <button key={i} aria-label={`Go to review ${i + 1}`} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-3 bg-white/25"}`} />
                ))}
              </div>
              <button onClick={next} aria-label="Next review" className="w-11 h-11 rounded-full border border-white/20 text-white grid place-items-center hover:bg-white hover:text-charcoal transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>
        </Reveal>
        <p className="text-center text-[11px] text-stonewarm mt-6">Customer feedback displayed for presentation purposes.</p>
      </div>
    </section>
  );
}
