import { motion, useReducedMotion } from "framer-motion";
import { productRange, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { SectionHeading } from "./ui";

function ProductCard({ item }) {
  const handleImageError = (event) => {
    const image = event.currentTarget;
    if (!image.src.endsWith(PRODUCT_RANGE_FALLBACK_IMAGE)) {
      image.src = PRODUCT_RANGE_FALLBACK_IMAGE;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-[320px] w-[270px] shrink-0 flex-col overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:border-gold/50 hover:shadow-lift sm:w-[300px]"
    >
      {/* 1. Relevant product / material image */}
      <div className="relative h-[165px] w-full shrink-0 overflow-hidden bg-beige">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* 2. Category name */}
        <p className="line-clamp-2 min-h-[40px] text-[14px] font-medium leading-snug text-charcoal transition-colors group-hover:text-golddark">
          {item.name}
        </p>

        {/* 3. Brand tags */}
        <div className="mt-2 flex flex-wrap content-start gap-1.5 overflow-hidden">
          {item.brands.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="rounded-full bg-beige/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-coffee"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProductSlider({ items, direction = "left", reduceMotion }) {
  if (!items.length) return null;

  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4 py-3"
        animate={
          reduceMotion
            ? { x: 0 }
            : {
                x:
                  direction === "right"
                    ? ["-50%", "0%"]
                    : ["0%", "-50%"],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 45,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {duplicatedItems.map((item, index) => (
          <ProductCard key={`${item.name}-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function ProductRange() {
  const reduceMotion = useReducedMotion();

  const firstRow = productRange.slice(0, 10);
  const secondRow = productRange.slice(10, 20);

  return (
    <section className="overflow-hidden bg-beige/50 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Product Range"
          title="Everything Under One Roof"
          desc="A curated range of interior and exterior materials — from boards and laminates to cladding, flooring and more — with the trusted brands behind each one."
        />
      </div>

      <div className="mt-12 space-y-5">
        {/* First Row: Left to Right */}
        <ProductSlider
          items={firstRow}
          direction="right"
          reduceMotion={reduceMotion}
        />

        {/* Second Row: Right to Left */}
        <ProductSlider
          items={secondRow}
          direction="left"
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
}
