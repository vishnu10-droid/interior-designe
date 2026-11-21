import { ProductCard } from "./ProductCard";
import { Reveal } from "./ui";

export function ProductGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((cat, index) => (
        <Reveal key={cat.id} delay={Math.min((index % 10) * 0.035, 0.25)} className="h-full">
          <ProductCard category={cat} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
