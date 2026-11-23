import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { allProducts, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { SectionHeading } from "./ui";

function ProductCard({ item, index, duplicate = false }) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const src = failed ? PRODUCT_RANGE_FALLBACK_IMAGE : item.image;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: Math.min((index % 8) * 0.05, 0.35) }}
      className="h-full w-[210px] shrink-0 sm:w-[260px] lg:w-[300px]"
      aria-hidden={duplicate ? "true" : undefined}
    >
      <Link
        to={`/products/${item.categorySlug}?item=${item.id}`}
        aria-label={`View ${item.name}`}
        tabIndex={duplicate ? -1 : 0}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-beige">
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 max-w-[80%] truncate rounded-full border border-white/20 bg-charcoal/85 px-3 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur">
            {item.categoryName}
          </span>
          <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-charcoal/70 shadow-sm transition-colors group-hover:bg-gold group-hover:text-charcoal">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 min-h-[40px] text-[14px] font-medium leading-snug text-charcoal transition-colors group-hover:text-golddark">
            {item.name}
          </h3>
          <div className="mt-2 flex flex-wrap content-start gap-1.5 overflow-hidden">
            {item.brands.slice(0, 3).map((brand, brandIndex) => (
              <span
                key={`${brand}-${brandIndex}`}
                className="rounded-full bg-beige/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-coffee"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductRange() {
  const reduceMotion = useReducedMotion();
  // Two sliding rows, each duplicated once so the -50% translate loops seamlessly.
  const midpoint = Math.ceil(allProducts.length / 2);
  const rows = [allProducts.slice(0, midpoint), allProducts.slice(midpoint)];

  return (
    <section className="overflow-hidden bg-beige/50 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Product Range"
          title="Everything Under One Roof"
          desc="A curated range of interior and exterior materials — from boards and laminates to cladding, flooring and more — with the trusted brands behind each one."
        />
        <p className="mt-5 text-center text-[11px] uppercase tracking-[0.18em] text-stonewarm">
          {allProducts.length} products · tap any product for details
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {rows.map((row, rowIndex) => {
          const items = reduceMotion ? row : [...row, ...row];
          const duration = Math.max(45, row.length * 1.6);

          return (
            <div key={rowIndex} className="marquee-fade relative overflow-hidden py-1">
              <div
                className={`${rowIndex % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"} gap-4 px-2 sm:gap-5`}
                style={{ animationDuration: `${duration}s` }}
              >
                {items.map((item, index) => (
                  <ProductCard
                    key={`${rowIndex}-${item.id}-${index}`}
                    item={item}
                    index={index % row.length}
                    duplicate={index >= row.length}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
