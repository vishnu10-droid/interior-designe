import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { productRange, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { Reveal } from "./ui";

// Maps each highlighted range item to an existing product-category slug.
const FEATURED = [
  { name: "Plywood & Block Boards", slug: "plywood" },
  { name: "Doors", slug: "doors" },
  { name: "Decorative Laminates", slug: "decorative-laminate" },
  { name: "Decorative Veneers", slug: "veneers" },
  { name: "Interior Wall Cladding", slug: "decmore-wall-panels" },
];

function MaterialCard({ item, index }) {
  const [failed, setFailed] = useState(false);

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Link
        to={`/products/${item.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-beige">
          <img
            src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute bottom-2.5 left-2.5 max-w-[85%] truncate rounded-full border border-white/20 bg-charcoal/85 px-2.5 py-1 text-[9px] font-medium tracking-wide text-white backdrop-blur">
            {item.brands[0]}
          </span>
        </div>
        <div className="flex flex-grow flex-col p-4">
          <h3 className="font-serif text-[17px] leading-snug text-charcoal transition-colors group-hover:text-golddark">
            {item.name}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-[11px] text-stonewarm">
            {item.brands.slice(0, 3).join(" · ")}
          </p>
          <span className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] font-medium text-golddark">
            Explore material <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function FeaturedMaterials() {
  const items = FEATURED.map((entry) => productRange.find((item) => item.name === entry.name))
    .filter(Boolean)
    .map((item) => ({ ...item, slug: FEATURED.find((entry) => entry.name === item.name).slug }));

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium">Most Requested</p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">
            Materials that <em className="italic text-golddark">lead the way</em>
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-coffee">
            The finishes our clients ask for again and again — chosen for the way they look,
            feel and hold up in everyday life.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item, index) => (
            <MaterialCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
