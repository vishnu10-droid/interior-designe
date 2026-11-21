import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { productCategories, productFilters } from "../data/products";
import { ProductRange } from "../components/ProductRange";
import { CallToAction } from "../components/CallToAction";
import CategoryNavStrip from "../components/CategoryNavStrip";
import ShopProductCard from "../components/ShopProductCard";
import {
  AnnouncementBar,
  ShopHeroSlider,
  ProductCarousel,
  CuratedCollections,
  PromoBanner,
  ShopByRoom,
  EditorialSection,
  ShopTestimonials,
} from "../components/ShopSections";

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const { wishlist, cart, toggleWishlist, toggleCart } = useShop();
  const view = params.get("view");
  const categorySlug = params.get("category") || "";
  const groupLabel = params.get("group") || "All";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "featured";

  // One setParams call per interaction — two back-to-back calls don't compose
  // in react-router (the later one starts from the original params).
  const applyFilters = (changes) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(changes).forEach(([key, value]) => {
          if (!value || value === "All" || value === "featured") next.delete(key);
          else next.set(key, value);
        });
        return next;
      },
      { replace: true }
    );
  };

  const updateParam = (key, value) => applyFilters({ [key]: value });

  const activeGroup = productFilters.find((item) => item.label === groupLabel);
  const selectedCategory = productCategories.find((item) => item.slug === categorySlug);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = productCategories.filter((category) => {
      const inGroup = Boolean(categorySlug) || !activeGroup?.ids || activeGroup.ids.includes(category.id);
      const inCategory = !categorySlug || category.slug === categorySlug;
      const matchesTerm =
        !term ||
        category.name.toLowerCase().includes(term) ||
        category.brands?.some((brand) => brand.toLowerCase().includes(term)) ||
        category.types?.some((type) => type.toLowerCase().includes(term));
      return inGroup && inCategory && matchesTerm;
    });

    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [activeGroup, categorySlug, query, sort]);

  const showAll = () => {
    setParams({}, { replace: true });
    window.setTimeout(() => {
      document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const collectionTitle = selectedCategory
    ? selectedCategory.name
    : activeGroup && activeGroup.label !== "All"
    ? activeGroup.label
    : "Everyday favourites";

  const headingNote = selectedCategory ? "collection" : "for your space";
  const carouselItems = visible.length ? visible : productCategories.slice(0, 10);

  return (
    <div className="pt-[72px]">
      <AnnouncementBar />
      <CategoryNavStrip
        activeSlug={categorySlug}
        buildHref={(slug) => `/products?category=${encodeURIComponent(slug)}`}
        onViewAll={showAll}
      />
      <ShopHeroSlider />

      {/* Product collection — horizontal carousel */}
      <ProductCarousel
        categories={carouselItems}
        eyebrow={selectedCategory ? "Selected category" : "The collection"}
        title={collectionTitle}
        note={headingNote}
        onViewAll={showAll}
      />

      {/* Filterable catalogue */}
      <section id="catalogue" className="scroll-mt-24 bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-golddark">The catalogue</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
              Explore <em className="italic text-golddark">materials</em>
            </h2>
            <p className="text-[11px] text-stonewarm">{visible.length} result{visible.length === 1 ? "" : "s"}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {productFilters.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => applyFilters({ group: item.label, category: "" })}
                  className={`shrink-0 rounded-full px-4 py-2 text-[11px] tracking-wide transition-all ${
                    groupLabel === item.label && !categorySlug
                      ? "bg-charcoal text-cream"
                      : "border border-charcoal/10 text-coffee hover:border-gold"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full max-w-sm">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stonewarm" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateParam("q", event.target.value)}
                  placeholder="Search a material or brand"
                  className="w-full rounded-full border border-charcoal/10 bg-cream py-2.5 pl-10 pr-4 text-[13px] text-charcoal"
                />
              </label>
              <label className="flex items-center gap-2 text-[11px] text-coffee">
                <SlidersHorizontal size={14} className="text-golddark" />
                <span className="sr-only">Sort products</span>
                <select
                  value={sort}
                  onChange={(event) => updateParam("sort", event.target.value)}
                  className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-[12px] text-charcoal"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name: A – Z</option>
                  <option value="name-desc">Name: Z – A</option>
                </select>
              </label>
            </div>

            {(categorySlug || query) && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-coffee">
                <span>Filtered by:</span>
                {selectedCategory && <span className="rounded-full bg-gold/15 px-3 py-1 text-golddark">{selectedCategory.name}</span>}
                {query && <span className="rounded-full bg-gold/15 px-3 py-1 text-golddark">“{query}”</span>}
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="text-golddark underline underline-offset-2 hover:text-charcoal"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            {visible.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visible.map((category, index) => (
                  <ShopProductCard key={category.id} category={category} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-charcoal/10 bg-cream py-16 text-center">
                <p className="text-[13px] font-medium text-charcoal">No materials match your filters.</p>
                <p className="mt-1 text-[12px] text-coffee">Try another category, brand or search term.</p>
                <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-5 rounded-full bg-charcoal px-6 py-2.5 text-[11px] uppercase tracking-[0.12em] text-cream">
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <CuratedCollections onSelect={(slug) => updateParam("category", slug)} />
      <PromoBanner />
      <ShopByRoom onSelect={(slug) => updateParam("category", slug)} />
      <ProductRange />
      <EditorialSection />
      <ShopTestimonials />
      {view === "wishlist" || view === "cart" ? (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-charcoal/70 p-4 backdrop-blur-sm" onClick={() => updateParam("view", "")}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lift" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-charcoal">{view === "cart" ? "Your shortlist" : "Saved materials"}</h3>
              <button type="button" onClick={() => updateParam("view", "")} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/10 text-charcoal"><X size={16} /></button>
            </div>
            <div className="mt-5 space-y-2">
              {(view === "cart" ? cart : wishlist).map((slug) => {
                const item = productCategories.find((category) => category.slug === slug);
                if (!item) return null;
                return (
                  <div key={slug} className="flex items-center gap-3 rounded-xl border border-charcoal/8 p-2">
                    <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <Link to={`/products/${slug}`} onClick={() => updateParam("view", "")} className="flex-1 text-[13px] font-medium text-charcoal hover:text-golddark">{item.name}</Link>
                    <button type="button" onClick={() => (view === "cart" ? toggleCart(slug) : toggleWishlist(slug))} aria-label={`Remove ${item.name}`} className="text-stonewarm hover:text-[#C2564B]"><X size={15} /></button>
                  </div>
                );
              })}
              {(view === "cart" ? cart : wishlist).length === 0 && (
                <p className="rounded-xl bg-cream py-10 text-center text-[12px] text-coffee">Nothing saved yet. Tap the heart or bag on a product.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <CallToAction
        title="Looking for a Specific Material?"
        desc="Our team can help you select the right products for your project. Visit our Agra display centre or send an enquiry."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </div>
  );
}
