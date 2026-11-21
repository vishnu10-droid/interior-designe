import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { productRange, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { Reveal } from "./ui";

// Maps each highlighted range item to an existing product-category slug,
// and layers on the editorial copy used by the showcase.
const FEATURED = [
  { name: "Plywood & Block Boards", slug: "plywood", tag: "The Foundation", note: "Strength beneath every finish" },
  { name: "Doors", slug: "doors", tag: "First Impressions", note: "Crafted to welcome" },
  { name: "Decorative Laminates", slug: "decorative-laminate", tag: "Surface Stories", note: "Colour, texture, character" },
  { name: "Decorative Veneers", slug: "veneers", tag: "Natural Elegance", note: "The warmth of real timber" },
  { name: "Interior Wall Cladding", slug: "decmore-wall-panels", tag: "The Final Layer", note: "Walls that speak" },
];

function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* -------------------------- FEATURED (HERO CARD) -------------------------- */

function FeatureCard({ item }) {
  return (
    <Link
      to={`/products/${item.slug}`}
      className="group relative block h-full min-h-[420px] overflow-hidden rounded-2xl border border-[#D9B45B]/20 bg-[#2A1E15] shadow-card transition-all duration-500 hover:border-[#D9B45B]/55 hover:shadow-lift lg:min-h-[520px]"
    >
      <SafeImage
        src={item.image}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#140C07] via-[#140C07]/55 to-[#140C07]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#140C07]/30 via-transparent to-transparent" />

      {/* top row: badge + counter */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 md:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9B45B]/50 bg-[#140C07]/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#F4E4C6] backdrop-blur-sm">
          <Sparkles size={11} strokeWidth={1.6} className="text-[#D9B45B]" /> Most Requested
        </span>
        <span className="font-serif text-[12px] tracking-[0.15em] text-[#F4E4C6]/70">01 / 05</span>
      </div>

      {/* bottom copy */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D9B45B]">{item.tag}</p>
        <h3 className="mt-2 font-serif text-3xl leading-[1.05] text-[#FBF3E7] md:text-[38px]">
          {item.name}
        </h3>
        <p className="mt-2 text-[12px] italic text-[#D9CBB4]/85">{item.note}</p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#F4E4C6]/15 pt-4">
          <p className="max-w-[75%] truncate text-[10px] tracking-wide text-[#D9CBB4]/65">
            {item.brands.slice(0, 3).join(" · ")}
          </p>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D9B45B] text-[#24160D] shadow-[0_8px_24px_-8px_rgba(217,180,91,0.8)] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={17} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ----------------------------- SUPPORTING CARD ---------------------------- */

function SmallCard({ item, index }) {
  return (
    <Link
      to={`/products/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9B45B]/15 bg-[#2A1E15] shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D9B45B]/45 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#3A2A1B]">
        <SafeImage
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140C07]/45 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
        <span className="absolute left-3 top-3 font-serif text-[12px] tracking-[0.15em] text-white/85">
          0{index + 2}
        </span>
      </div>
      <div className="flex flex-grow flex-col p-4 md:p-5">
        <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-[#D9B45B]">{item.tag}</p>
        <h3 className="mt-1.5 font-serif text-[19px] leading-snug text-[#FBF3E7] transition-colors group-hover:text-[#D9B45B]">
          {item.name}
        </h3>
        <p className="mt-1 text-[10px] text-[#D9CBB4]/60">{item.brands.slice(0, 3).join(" · ")}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-medium text-[#D9B45B]">
          Explore material
          <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/* -------------------------------- SECTION -------------------------------- */

export default function FeaturedMaterials() {
  const items = FEATURED.map((entry) => productRange.find((item) => item.name === entry.name))
    .filter(Boolean)
    .map((item) => ({ ...item, ...FEATURED.find((entry) => entry.name === item.name) }));

  if (items.length === 0) return null;

  const [hero, ...rest] = items;

  return (
    <section className="relative overflow-hidden bg-[#1C1109] py-20 text-[#F7EEDF] md:py-24">
      {/* ambient gold glow + hairline framing */}
      <div className="pointer-events-none absolute -right-40 -top-24 h-[420px] w-[420px] rounded-full bg-[#D9B45B]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[#D9B45B]/[0.05] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9B45B]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* header */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9B45B]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#D9B45B]">
                The Edit · Most Requested
              </p>
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-[#FBF3E7] md:text-5xl">
              Materials that <em className="italic text-[#D9B45B]">lead the way</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-md text-[14px] leading-relaxed text-[#D9CBB4]">
              The finishes our clients ask for again and again — chosen for the way they look,
              feel and hold up in everyday life.
            </p>
            <Link
              to="/products"
              className="group mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-[#D9B45B] transition-colors hover:text-[#F0D48A]"
            >
              View the full collection
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* editorial grid: one hero + four supporting materials */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-5">
            <FeatureCard item={hero} />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {rest.map((item, index) => (
              <Reveal key={item.name} delay={0.08 * (index + 1)} className="h-full">
                <SmallCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
