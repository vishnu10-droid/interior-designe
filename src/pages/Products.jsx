import { useState } from "react";
import { Search } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { ProductGrid } from "../components/ProductGrid";
import { productCategories, productFilters } from "../data/products";
import { CallToAction } from "../components/CallToAction";
import { IMAGES } from "../data/services";
import { PageHero } from "./Services";
import { ProductRange } from "../components/ProductRange";
import { MaterialGuides } from "../components/MaterialGuides";

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const activeFilter = productFilters.find((f) => f.label === filter);
  const visible = productCategories.filter((category) => {
    const inGroup = !activeFilter?.ids || activeFilter.ids.includes(category.id);
    const matchesSearch = category.name.toLowerCase().includes(query.trim().toLowerCase());
    return inGroup && matchesSearch;
  });

  return (
    <div className="pt-[72px]">
      <PageHero
        eyebrow="Product Catalogue"
        title="Premium Materials for Every Space"
        desc="Explore our complete range of interior and exterior products — plywood, laminates, veneers, WPC, flooring, doors, and more — sourced from India's leading brands."
        image={IMAGES.aboutSmall}
      />

      <ProductRange />

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Our Products"
          title="Explore by Category"
          desc="Use the filters to narrow down materials by family — click any category to view details, brands, features, and applications."
        />

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex flex-wrap justify-center gap-2">
            {productFilters.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setFilter(item.label)}
                className={`rounded-full px-4 py-2 text-[13px] tracking-wide transition-all sm:px-5 ${
                  filter === item.label
                    ? "bg-charcoal text-cream shadow-card"
                    : "border border-charcoal/10 bg-white text-coffee hover:border-gold hover:text-charcoal"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="relative block w-full max-w-sm">
            <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stonewarm" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a material, e.g. plywood"
              className="w-full rounded-full border border-charcoal/10 bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-stonewarm"
            />
          </label>
        </div>

        <div className="mt-10">
          {visible.length > 0 ? (
            <ProductGrid categories={visible} />
          ) : (
            <p className="rounded-2xl border border-charcoal/10 bg-white py-14 text-center text-sm text-coffee">
              No products match this filter. Try another material family or search term.
            </p>
          )}
        </div>
      </section>

      <MaterialGuides />

      <CallToAction
        title="Looking for a Specific Material?"
        desc="Our team can help you select the right products for your project. Visit our Agra display centre or send an enquiry."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </div>
  );
}
