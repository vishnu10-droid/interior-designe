import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { galleryItems } from "../data/content";
import { Reveal, SectionHeading } from "./ui";

export const galleryCats = [
  "All",
  "Living Rooms",
  "Bedrooms",
  "Kitchens",
  "Offices",
  "Commercial Spaces",
];

export function Lightbox({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-charcoal/90 backdrop-blur"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="relative max-w-4xl w-full bg-cream rounded-2xl overflow-hidden shadow-lift"
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full max-h-[75vh] object-cover"
        />
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-serif text-xl">{item.title}</p>
            <p className="text-xs tracking-[0.2em] uppercase text-coffee mt-1">
              {item.category}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-10 h-10 rounded-full bg-charcoal text-cream grid place-items-center"
          >
            <X size={17} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GalleryGrid({ limit, showFilter = true }) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);
  const list = galleryItems
    .filter((g) => cat === "All" || g.category === cat)
    .slice(0, limit || undefined);

  return (
    <>
      {showFilter && (
        <Reveal className="flex flex-wrap justify-center gap-2 mt-10">
          {galleryCats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2.5 rounded-full text-[13px] tracking-wide transition-all ${cat === c ? "bg-charcoal text-cream" : "bg-white border border-charcoal/10 text-coffee hover:border-gold"}`}
            >
              {c}
            </button>
          ))}
        </Reveal>
      )}
      <motion.div
        layout
        className="columns-2 md:columns-3 gap-4 mt-10 [&>div]:mb-4"
      >
        <AnimatePresence mode="popLayout">
          {list.map((g) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(g)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer break-inside-avoid img-zoom shadow-card"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-center justify-between opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div>
                  <p className="font-serif text-lg leading-tight">
                    {g.title}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">{g.category}</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-cream text-charcoal grid place-items-center">
                  <Maximize2 size={15} />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}

export function GallerySection({ limit = 6 }) {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        eyebrow="Inspiration"
        title="Spaces We Love"
        desc="Tap any image for a closer look."
      />
      <GalleryGrid limit={limit} showFilter={false} />
    </section>
  );
}
