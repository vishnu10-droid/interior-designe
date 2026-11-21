import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { galleryItems } from "../data/content";
import { DetailModal, Reveal, SectionHeading } from "./ui";

// Curated from the studio's existing gallery, with a bathroom view added to
// complete the set of spaces requested for the showcase.
const showcase = [
  { ...galleryItems[0], featured: true },
  galleryItems[2],
  galleryItems[4],
  {
    id: "bathrooms-1",
    title: "Spa Bathroom",
    category: "Bathrooms",
    src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop",
  },
  galleryItems[8],
  galleryItems[6],
  galleryItems[11],
  galleryItems[10],
  galleryItems[1],
];

export function GallerySection() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading
        eyebrow="Design Showcase"
        title="A Glimpse Inside Our Work"
        desc="Living rooms, bedrooms, kitchens, bathrooms and workspaces — each one considered down to the last detail."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[210px] gap-3 md:gap-4 mt-12">
        {showcase.map((item, i) => (
          <Reveal
            key={item.id ?? item.title}
            delay={(i % 4) * 0.06}
            className={item.featured ? "col-span-2 row-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setActive(item)}
              aria-label={`View ${item.title}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-charcoal text-left shadow-card"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 md:p-5">
                <div>
                  <p className="font-serif text-base text-cream leading-tight md:text-lg">{item.title}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/60 mt-1">{item.category}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/90 text-charcoal opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Maximize2 size={14} />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <DetailModal open={Boolean(active)} onClose={() => setActive(null)} label={active?.title || "Gallery image"}>
        {active && (
          <div>
            <img src={active.src} alt={active.title} className="max-h-[65vh] w-full object-cover" />
            <div className="px-6 py-5 md:px-8">
              <p className="font-serif text-2xl text-charcoal">{active.title}</p>
              <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-golddark">{active.category}</p>
            </div>
          </div>
        )}
      </DetailModal>
    </section>
  );
}
