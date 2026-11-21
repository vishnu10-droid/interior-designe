import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import { GUIDE_FALLBACK_IMAGE, materialGuides } from "../data/guides";
import { SectionHeading } from "./ui";

function GuideCard({ item, index, reduceMotion }) {
  const handleImageError = (event) => {
    const image = event.currentTarget;
    if (!image.src.endsWith(GUIDE_FALLBACK_IMAGE)) {
      image.src = GUIDE_FALLBACK_IMAGE;
    }
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min((index % 3) * 0.06, 0.2) }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-card transition-shadow duration-300 hover:border-gold/40 hover:shadow-lift"
    >
      {/* Material image */}
      <div className="relative h-44 shrink-0 overflow-hidden bg-beige">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-charcoal/85 text-[11px] font-semibold text-gold backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Material details */}
      <div className="flex flex-grow flex-col p-5">
        <h4 className="font-serif text-lg leading-snug text-charcoal transition-colors group-hover:text-golddark">
          {item.name}
        </h4>
        <p className="mt-2.5 text-[13px] leading-relaxed text-coffee">{item.text}</p>

        <div className="mt-auto border-t border-gold/25 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-golddark">Best For</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal/80">{item.bestFor}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function MaterialGuides() {
  const [active, setActive] = useState(materialGuides[0].id);
  const reduceMotion = useReducedMotion();
  const guide = materialGuides.find((g) => g.id === active) || materialGuides[0];

  return (
    <section id="material-guide" className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        eyebrow="Material Guide"
        title="Know The Difference"
        desc="Straightforward guidance from Bansal Wood Decor — choose the right material for the right space, every time."
      />

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
        {materialGuides.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] tracking-wide transition-all ${
              active === item.id
                ? "bg-charcoal text-cream shadow-card"
                : "border border-charcoal/10 bg-white text-coffee hover:border-gold hover:text-charcoal"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={guide.id}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-3xl border border-charcoal/5 bg-beige/40 p-6 md:p-10"
        >
          <p className="border-l-2 border-gold pl-5 font-serif text-lg leading-relaxed text-charcoal/90 md:text-xl">
            {guide.intro}
          </p>

          <div className="mt-10 space-y-12">
            {guide.sections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-3">
                  <Sparkles size={15} className="text-golddark" />
                  <h3 className="text-[11px] font-semibold tracking-[0.28em] uppercase text-golddark">
                    {section.title}
                  </h3>
                  <span className="h-px flex-1 bg-gold/30" />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, i) => (
                    <GuideCard key={item.name} item={item} index={i} reduceMotion={reduceMotion} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {guide.rule && (
            <div className="mt-12 overflow-hidden rounded-3xl bg-charcoal p-7 text-cream shadow-lift md:p-9">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
                  <Lightbulb size={18} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold">The cheat sheet</p>
                  <p className="font-serif text-xl text-cream mt-0.5">Simple Rule to Remember</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {guide.rule.map((line) => (
                  <p key={line} className="rounded-xl border border-gold/20 bg-white/[0.06] px-4 py-3.5 text-sm leading-relaxed text-cream/85 transition-colors hover:border-gold/50">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {guide.note && (
            <p className="mt-8 text-center font-serif text-lg italic text-espresso">{guide.note}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
