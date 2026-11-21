import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

export function BrandCard({ brand, index = 0 }) {
  const reduceMotion = useReducedMotion();
  const initials = brand.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22, z: -35, rotateX: 16, rotateY: index % 2 ? -10 : 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, z: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.25) }}
      whileHover={reduceMotion ? undefined : { y: -9, z: 24, rotateX: 7, rotateY: index % 2 ? -9 : 9, scale: 1.035 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`group relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-2xl border p-5 text-center transition-shadow duration-300 hover:shadow-lift ${
        brand.featured
          ? "border-gold/25 bg-gradient-to-br from-white via-cream to-gold/10 shadow-card"
          : "border-charcoal/5 bg-white shadow-sm"
      }`}
    >
      <div className="pointer-events-none absolute -right-7 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div className="relative mb-3 grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gradient-to-br from-charcoal to-espresso font-serif text-lg font-semibold tracking-wide text-gold shadow-inner transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
        {initials}
      </div>
      <p className="relative text-sm font-medium text-charcoal">{brand.name}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-golddark">
        {brand.featured ? <BadgeCheck size={12} /> : null}
        {brand.featured ? "Featured partner" : "Brand partner"}
      </span>
      <ArrowUpRight className="absolute right-3 top-3 text-golddark opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" size={15} />
    </motion.div>
  );
}

export function BrandSection({ brands, title = "Trusted Brands", desc = "Partnering with India's leading material brands." }) {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 bg-beige/40">
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium mb-3">{title}</p>
        <p className="text-coffee max-w-xl mx-auto">{desc}</p>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
        {brands.map((b) => (
          <BrandCard key={b.name} brand={b} />
        ))}
      </div>
    </section>
  );
}
