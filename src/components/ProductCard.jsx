import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui";

// Left → bottom → right, repeating — keeps a natural rhythm across the row.
const DIRECTIONS = ["left", "up", "right"];

export function ProductCard({ category, index = 0 }) {
  const direction = DIRECTIONS[index % DIRECTIONS.length];

  return (
    <Reveal
      direction={direction}
      delay={(index % 3) * 0.1}
      scale={0.94}
      distance={40}
      className="h-full"
    >
      <Link
        to={`/products/${category.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
      >
        {/* Product image — fills the card area cleanly, portrait or square */}
        <div className="relative h-44 overflow-hidden bg-beige sm:h-48">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute bottom-2.5 left-2.5 max-w-[85%] truncate rounded-full border border-white/20 bg-charcoal/85 px-3 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur">
            {category.brands.length > 0 ? category.brands[0] : "Premium"}
          </span>
        </div>

        {/* Crisp, readable content — no 3D transforms on text */}
        <div className="flex flex-grow flex-col p-4">
          <h3 className="font-serif text-lg leading-snug text-charcoal transition-colors group-hover:text-golddark">
            {category.name}
          </h3>
          <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-coffee">
            {category.description}
          </p>

          <div className="mt-auto flex min-h-7 items-center justify-between gap-2 border-t border-charcoal/5 pt-3">
            <div className="flex min-w-0 flex-wrap gap-1">
              {category.brands.slice(0, 2).map((brand) => (
                <span key={brand} className="max-w-24 truncate rounded bg-gold/10 px-2 py-1 text-[9px] font-medium text-golddark">
                  {brand}
                </span>
              ))}
            </div>
            <ArrowRight size={15} className="shrink-0 text-golddark transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
