import { ProductCard } from "./ProductCard";

export function ProductGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((cat, index) => (
        <ProductCard key={cat.id} category={cat} index={index} />
      ))}
    </div>
  );
}
