import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productRange, productCategories } from "../data/products";
import { RevealLeft, RevealRight, StaggerContainer, StaggerItem } from "./ui";
import FlipProductCard from "./FlipProductCard";

// Maps each highlighted range item to an existing product-category slug,
// and layers on the editorial copy used by the showcase.
const FEATURED = [
  { name: "Plywood & Block Boards", slug: "plywood", tag: "The Foundation", note: "Strength beneath every finish" },
  { name: "Doors", slug: "doors", tag: "First Impressions", note: "Crafted to welcome" },
  { name: "Decorative Laminates", slug: "decorative-laminate", tag: "Surface Stories", note: "Colour, texture, character" },
  { name: "Decorative Veneers", slug: "veneers", tag: "Natural Elegance", note: "The warmth of real timber" },
  { name: "Interior Wall Cladding", slug: "decmore-wall-panels", tag: "The Final Layer", note: "Walls that speak" },
];

/* -------------------------------- SECTION -------------------------------- */

export default function FeaturedMaterials() {
  // Reuse real range imagery + real category features/types/brands — no new
  // product data is introduced for the flip cards.
  const items = FEATURED.map((entry) => {
    const range = productRange.find((item) => item.name === entry.name);
    const category = productCategories.find((item) => item.slug === entry.slug);
    return range ? { ...range, ...entry, category } : null;
  }).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#1C1109] py-20 text-[#F7EEDF] md:py-24">
      {/* ambient gold glow + hairline framing */}
      <div className="pointer-events-none absolute -right-40 -top-24 h-[420px] w-[420px] rounded-full bg-[#D9B45B]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[#D9B45B]/[0.05] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9B45B]/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* header — unchanged editorial direction */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <RevealLeft>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9B45B]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#D9B45B]">
                The Edit · Most Requested
              </p>
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-[#FBF3E7] md:text-5xl">
              Materials that <em className="italic text-[#D9B45B]">lead the way</em>
            </h2>
          </RevealLeft>

          <RevealRight delay={0.1}>
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
          </RevealRight>
        </div>

        {/* five premium flip cards — same dimensions, 1 / 2 / 4 / 5 per row */}
        <StaggerContainer
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
          stagger={0.08}
        >
          {items.map((item, index) => (
            <StaggerItem
              key={item.name}
              direction={["left", "up", "right", "up", "left"][index % 5]}
              scale={0.94}
              className="h-full"
            >
              <FlipProductCard
                title={item.name}
                eyebrow={item.tag}
                description={item.note}
                details={item.category?.description || item.note}
                image={item.image}
                brands={item.brands}
                features={item.category?.features || []}
                variants={item.category?.types || []}
                slug={item.slug}
                className="h-[480px]"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
