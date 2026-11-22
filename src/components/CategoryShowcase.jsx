import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Heart, X,
  ChevronDown, ChevronRight, Layers, DoorOpen, Layers3,
  ScrollText, PanelTop, ShieldCheck, Gem, Headphones, Truck, Download,
  ArrowRight, LayoutGrid, List, MessageCircle, SlidersHorizontal, Leaf,
} from "lucide-react";
import {
  productCategories, productRange, getProductImages, featuredBrands, allBrands,
  PRODUCT_RANGE_FALLBACK_IMAGE,
} from "../data/products";
import { WHATSAPP_LINK, IMAGES } from "../data/services";
import { useShop } from "../context/ShopContext";
import { StaggerContainer, StaggerItem } from "./ui";

const CATALOGUE = "/documents/Ananya%20Company%20Profile%20(May'25)%202_compressed.pdf";

// Complete brand list for the "Our Trusted Brands" strip — brands with an
// official logo keep it, the rest fall back to a neat initials tile.
const TRUSTED_BRANDS = (() => {
  const seen = new Set();
  return [...featuredBrands, ...allBrands.map((name) => ({ name }))].filter((brand) => {
    const key = brand.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

const brandInitials = (name) =>
  name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

const CATEGORIES = [
  { name: "Plywood & Block Boards", slug: "plywood", icon: Layers },
  { name: "Doors", slug: "doors", icon: DoorOpen },
  { name: "Decorative Laminates", slug: "decorative-laminate", icon: Layers3 },
  { name: "Decorative Veneers", slug: "veneers", icon: ScrollText },
  { name: "Interior Wall Cladding", slug: "decmore-wall-panels", icon: PanelTop },
];

const BOTTOM_FEATURES = [
  { icon: ShieldCheck, label: "IS-Certified Quality" },
  { icon: Layers, label: "Multiple Thickness" },
  { icon: Gem, label: "High Durability" },
  { icon: Leaf, label: "Eco Friendly" },
  { icon: Truck, label: "Bulk & Project Supply" },
];

const WHY = [
  { icon: ShieldCheck, title: "Trusted Quality", text: "IS-certified and tested for long-term performance." },
  { icon: Layers, title: "Wide Variety", text: "Multiple grades, thicknesses and finishes for every need." },
  { icon: Headphones, title: "Expert Guidance", text: "Get the right material for your space and budget." },
  { icon: Truck, title: "Bulk & Project Supply", text: "Reliable supply for homes, offices and large projects." },
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

// Same sliding card style as the homepage brand marquee, extended with an
// initials tile for partner brands that don't have an official logo file.
function TrustedBrandSlide({ brand }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(brand.image) && !logoFailed;
  return (
    <div className="group mr-3 grid h-24 w-40 shrink-0 place-items-center rounded-xl border border-[#E6DCCB] bg-white px-4 py-3 shadow-card transition-shadow duration-300 hover:shadow-lift sm:mr-4 sm:w-44">
      {showLogo ? (
        <div className="flex flex-col items-center gap-1.5">
          <img
            src={brand.image}
            alt={brand.name}
            loading="lazy"
            onError={() => setLogoFailed(true)}
            className="max-h-9 w-full object-contain"
          />
          <span className="text-center text-[10px] font-medium leading-tight text-[#5A4A38] transition-colors group-hover:text-[#8A6A16]">
            {brand.name}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#24160D] to-[#3A2A1B] font-serif text-[13px] font-semibold tracking-wide text-[#D9B45B]">
            {brandInitials(brand.name)}
          </span>
          <span className="text-center text-[10px] font-medium leading-tight text-[#5A4A38] transition-colors group-hover:text-[#8A6A16]">
            {brand.name}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- HERO ------------------------------- */

function CategoryHero({ category, rangeItem, onExplore }) {
  const reduce = useReducedMotion();
  const heroImage = rangeItem?.image || category.image;
  const [firstPart, secondPart] = (rangeItem?.name || category.name).split(" & ");
  return (
    <section className="relative overflow-hidden bg-[#1C1109] text-[#F7EEDF]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1109] via-[#1C1109]/85 to-[#1C1109]/10" />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-[1600px] px-4 pb-4 pt-4 sm:px-8"
      >
        <p className="text-[10px] text-[#CDBB9E]">
          <Link to="/" className="hover:text-[#D9B45B]">Home</Link>
          <span className="mx-1.5 text-[#8A6A46]">›</span>
          <Link to="/products" className="hover:text-[#D9B45B]">Products</Link>
          <span className="mx-1.5 text-[#8A6A46]">›</span>
          {rangeItem?.name || category.name}
        </p>

        <div className="mt-3 grid items-center gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D9B45B]">Premium Wood Materials</p>
              <span className="h-px w-16 bg-[#D9B45B]/50 sm:w-24" />
            </div>
            <h1 className="mt-3 font-serif text-[38px] leading-[1.02] sm:text-[46px] lg:text-[50px]">
              {firstPart}{" "}
              {secondPart && <><span className="text-[#D9B45B]">&amp;</span><br />{secondPart}</>}
            </h1>
            <p className="mt-3 max-w-md text-[12px] leading-relaxed text-[#D9CBB4]">
              Strong, durable and versatile engineered wood for furniture, interiors and long-lasting spaces.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button type="button" onClick={onExplore} className="inline-flex items-center gap-2 rounded-full bg-[#D9B45B] px-5 py-2.5 text-[11px] font-semibold text-[#24160D] transition-colors hover:bg-[#F0D48A]">
                Explore Collection <ArrowRight size={14} />
              </button>
              <a href={CATALOGUE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#D9B45B]/60 px-5 py-2.5 text-[11px] font-medium text-[#F7EEDF] transition-colors hover:bg-[#D9B45B]/10">
                <Download size={14} /> Download Catalogue
              </a>
            </div>
          </div>

          <div className="relative h-[230px] overflow-hidden sm:h-[280px] lg:h-[310px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1109] via-transparent to-transparent" />
            <SafeImage src={heroImage} alt={rangeItem?.name || category.name} className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1109]/70 via-transparent to-transparent" />

            {/* Gold arc + circular material close-up with connector */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 320" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 20 300 C 180 40, 520 -30, 790 110" fill="none" stroke="#D9B45B" strokeWidth="1.2" opacity="0.75" />
              <path d="M 165 168 C 230 150, 300 205, 370 200" fill="none" stroke="#D9B45B" strokeWidth="1" opacity="0.7" />
              <circle cx="370" cy="200" r="3.5" fill="#D9B45B" />
            </svg>
            <div className="absolute left-[12%] top-[38%] hidden h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-[#D9B45B] shadow-[0_0_30px_rgba(217,180,91,0.35)] sm:block">
              <SafeImage src={heroImage} alt="Plywood layers close-up" className="h-full w-full scale-150 object-cover object-left-top" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#D9B45B]/20 pt-3 text-[10px] text-[#D9CBB4] sm:gap-x-10">
          {BOTTOM_FEATURES.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon size={14} strokeWidth={1.5} className="text-[#D9B45B]" />
              <span className="leading-tight">{label}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------- CATEGORY CARDS -------------------------- */

function CategoryCards({ activeSlug, onSelect }) {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="bg-[#F8F4ED] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B58A22]">Product range</p>
            <h2 className="mt-1 font-serif text-xl text-[#3A2A1B] sm:text-2xl">Explore by category</h2>
          </div>
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D9B45B]/60 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A6A16] transition-colors hover:bg-[#D9B45B] hover:text-[#24160D]"
          >
            {showAll ? "Show Less" : "View All"}
            <ChevronRight size={14} className={`transition-transform ${showAll ? "-rotate-90" : ""}`} />
          </button>
        </div>
        <StaggerContainer className={`grid grid-cols-2 gap-3 overflow-hidden transition-[max-height] duration-500 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${showAll ? "max-h-[4000px]" : "max-h-[250px]"}`} stagger={0.09}>
          {productCategories.map((item, index) => {
            const active = item.slug === activeSlug;
            return (
              <StaggerItem key={item.id} direction={["left", "up", "right"][index % 3]} scale={0.95}>
              <button
                type="button"
                onClick={() => onSelect(item.slug)}
                className={`group flex h-[250px] w-full flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${active ? "border-[#D9B45B] ring-1 ring-[#D9B45B]/50" : "border-[#E3D8C7]"}`}
              >
                <div className="flex h-[188px] shrink-0 items-center justify-center overflow-hidden bg-[#EFE6D9]">
                  <div className="h-[160px] w-[112px] overflow-hidden rounded-md">
                    <SafeImage src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-2 px-3">
                  <p className={`line-clamp-2 text-[11px] font-semibold leading-tight transition-colors ${active ? "text-[#8A6A16]" : "text-[#3A2A1B] group-hover:text-[#8A6A16]"}`}>
                    {item.name}
                  </p>
                  {active && <span className="h-2 w-2 shrink-0 rounded-full bg-[#B58A22]" />}
                </div>
              </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* --------------------------- FILTER SIDEBAR -------------------------- */

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E6DCCB] py-3">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-[12px] font-semibold text-[#3A2A1B]">
        {title} <ChevronDown size={14} className={`text-[#B58A22] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <div className="pt-3">{children}</div>
      </motion.div>
    </div>
  );
}

function FilterPanel({ category, brands, brandFilter, viewAllBrands, onBrandToggle, onAllBrands, onClear }) {
  const brandOptions = brands.length ? brands : [];
  return (
    <div className="rounded-xl border border-[#E6DCCB] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-[17px] text-[#3A2A1B]"><SlidersHorizontal size={15} className="text-[#B58A22]" /> Filter By</h3>
        <button type="button" onClick={onClear} className="text-[10px] font-medium text-[#B58A22] hover:underline">Clear All</button>
      </div>

      <Accordion title="Brand" defaultOpen>
        <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-[#3A2A1B]">
            <input type="radio" name="brand-filter" checked={viewAllBrands} onChange={onAllBrands} className="h-3.5 w-3.5 accent-[#B58A22]" />
            All Brands
          </label>
          {brandOptions.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2 text-[11px] text-[#5A4A38]">
              <input type="radio" name="brand-filter" checked={!viewAllBrands && brandFilter.includes(brand)} onChange={() => onBrandToggle(brand)} className="h-3.5 w-3.5 accent-[#B58A22]" />
              {brand}
            </label>
          ))}
        </div>
      </Accordion>

      {(category.types || []).slice(0, 4).map((type) => (
        <Accordion key={type} title={type}>
          <p className="text-[11px] text-[#7A6A56]">Available in {category.name}.</p>
        </Accordion>
      ))}
      <Accordion title="Availability"><p className="text-[11px] text-[#7A6A56]">In stock — ready to enquire.</p></Accordion>

      <div className="mt-4 overflow-hidden rounded-xl bg-[#24160D] p-4 text-[#F7EEDF]">
        <SafeImage src={IMAGES.detail} alt="Plywood boards" className="mb-3 h-16 w-full rounded-lg object-cover" />
        <p className="font-serif text-[15px] leading-snug">Need Project Quantity?</p>
        <p className="mt-1 text-[10px] text-[#D9CBB4]">Get exclusive pricing and expert assistance.</p>
        <Link to="/contact" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D9B45B] px-3 py-2 text-[10px] font-semibold text-[#24160D]">Talk to an Expert <ArrowRight size={12} /></Link>
      </div>
    </div>
  );
}

/* ---------------------------- PRODUCT CARD --------------------------- */

function ProductCard({ product, view }) {
  const { isWishlisted, isInCart, toggleWishlist, toggleCart } = useShop();
  const wished = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  return (
    <motion.article whileHover={{ y: -4 }} className="overflow-hidden rounded-xl border border-[#E8DECE] bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#F1E9DD]">
          <SafeImage src={product.image} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110" />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow ${wished ? "text-[#B5483F]" : "text-[#6B5A45]"}`}
          ><Heart size={14} fill={wished ? "currentColor" : "none"} /></button>
        </div>
      </Link>
      <div className="p-3">
        <p className="text-[9px] uppercase tracking-[0.14em] text-[#B58A22]">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 text-[12px] font-semibold leading-snug text-[#3A2A1B]">{product.name}</h3>
        <p className="mt-1 text-[10px] text-[#8A7A66]">{product.thickness}</p>
        <div className="mt-3 flex items-center justify-between border-t border-[#EFE7DA] pt-2">
          <span className="text-[10px] font-medium text-[#6B5A45]">Price on request</span>
          <button type="button" onClick={() => toggleCart(product.id)} aria-label={inCart ? "Remove from cart" : "Add to cart"} className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold transition-colors ${inCart ? "border-[#B58A22] bg-[#D9B45B]/15 text-[#8A6A16]" : "border-[#D9B45B]/60 text-[#8A6A16] hover:bg-[#D9B45B]/10"}`}>
            {inCart ? "Added" : "Enquire"}
          </button>
        </div>
      </div>
      {view === "list" && <p className="border-t border-[#EFE7DA] px-3 py-2 text-[11px] leading-relaxed text-[#7A6A56]">{product.detail}</p>}
    </motion.article>
  );
}

/* ------------------------------- PAGE -------------------------------- */

export default function CategoryShowcase({ initialSlug }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(initialSlug || "plywood");
  const [brandFilter, setBrandFilter] = useState([]);
  const [viewAllBrands, setViewAllBrands] = useState(true);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [mobileFilters, setMobileFilters] = useState(false);

  const category = productCategories.find((c) => c.slug === activeSlug) || productCategories[0];
  const rangeItem = productRange.find((r) => CATEGORIES.find((c) => c.slug === activeSlug)?.name === r.name);

  // Build product entries from the real category data. With no brand selected
  // we show the current category; selecting brands searches the whole catalogue
  // so every brand in the filter can return matching products.
  const buildProducts = (source) => {
    const images = getProductImages(source);
    return images.map((image, i) => {
      const brand = source.brands?.[i % (source.brands.length || 1)] || "Premium";
      const type = source.types?.[i % (source.types.length || 1)] || source.name;
      return {
        id: `${source.slug}-${i}`,
        slug: source.slug,
        image,
        name: `${brand} ${type}`.trim(),
        brand,
        thickness: type,
        detail: source.description,
      };
    });
  };

  const categoryProducts = useMemo(() => buildProducts(category), [category]);
  const allProducts = useMemo(
    () => productCategories.flatMap((item) => buildProducts(item)),
    []
  );

  // Only brands that actually have products should appear in the filter.
  const availableBrands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand))].sort((a, b) => a.localeCompare(b)),
    [allProducts]
  );

  const visible = useMemo(() => {
    let list = viewAllBrands
      ? allProducts
      : brandFilter.length
        ? allProducts.filter((p) => brandFilter.includes(p.brand))
        : categoryProducts;
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [allProducts, categoryProducts, brandFilter, viewAllBrands, sort]);

  const selectAllBrands = () => {
    setViewAllBrands(true);
    setBrandFilter([]);
  };

  const toggleBrand = (brand) => {
    setViewAllBrands(false);
    setBrandFilter([brand]);
  };

  const clearFilters = () => {
    setBrandFilter([]);
    setViewAllBrands(false);
  };

  const selectCategory = (slug) => {
    setActiveSlug(slug);
    setBrandFilter([]);
    setViewAllBrands(false);
    navigate(`/categories/${slug}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8F4ED] pt-[72px] text-[#3A2A1B]">
      <CategoryHero
        category={category}
        rangeItem={rangeItem}
        onExplore={() => document.getElementById("catalogue-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
      <CategoryCards activeSlug={activeSlug} onSelect={selectCategory} />

      <section id="catalogue-grid" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 py-6 sm:px-8">
        <div className="flex gap-5">
          <aside className="hidden w-[250px] shrink-0 lg:block">
            <FilterPanel category={category} brands={availableBrands} brandFilter={brandFilter} viewAllBrands={viewAllBrands} onBrandToggle={toggleBrand} onAllBrands={selectAllBrands} onClear={clearFilters} />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-[#6B5A45]">Showing <strong className="text-[#3A2A1B]">{visible.length}</strong> Products</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setMobileFilters(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3D8C7] bg-white px-3 py-2 text-[11px] lg:hidden"><SlidersHorizontal size={13} /> Filters</button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="rounded-lg border border-[#E3D8C7] bg-white px-3 py-2 text-[11px] text-[#5A4A38]">
                  <option value="featured">Sort By: Featured</option>
                  <option value="name-asc">Name: A – Z</option>
                  <option value="name-desc">Name: Z – A</option>
                </select>
                <div className="flex overflow-hidden rounded-lg border border-[#E3D8C7] bg-white">
                  <button type="button" onClick={() => setView("grid")} aria-label="Grid view" className={`grid h-8 w-8 place-items-center ${view === "grid" ? "bg-[#D9B45B] text-[#24160D]" : "text-[#8A7A66]"}`}><LayoutGrid size={14} /></button>
                  <button type="button" onClick={() => setView("list")} aria-label="List view" className={`grid h-8 w-8 place-items-center ${view === "list" ? "bg-[#D9B45B] text-[#24160D]" : "text-[#8A7A66]"}`}><List size={14} /></button>
                </div>
              </div>
            </div>

            {viewAllBrands && (
              <p className="mb-3 text-[11px] text-[#8A6A16]">
                Showing products from <strong>all brands</strong>
              </p>
            )}
            {!viewAllBrands && brandFilter.length > 0 && (
              <p className="mb-3 text-[11px] text-[#8A6A16]">
                Showing matching products across all categories for: <strong>{brandFilter.join(", ")}</strong>
              </p>
            )}

            {visible.length ? (
              <StaggerContainer className={view === "grid" ? "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4" : "grid grid-cols-1 gap-3 sm:grid-cols-2"} stagger={0.05} inView={false}>
                {visible.map((product, index) => (
                  <StaggerItem key={product.id} direction={["left", "up", "right"][index % 3]} scale={0.95}>
                    <ProductCard product={product} view={view} index={index} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="rounded-xl border border-[#E6DCCB] bg-white py-16 text-center">
                <p className="font-serif text-xl text-[#3A2A1B]">No products match your filters</p>
                <button type="button" onClick={clearFilters} className="mt-4 rounded-full bg-[#D9B45B] px-5 py-2 text-[11px] font-semibold text-[#24160D]">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFilters && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-black/50 lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="h-full w-[85%] max-w-sm overflow-y-auto bg-[#F8F4ED] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between"><p className="font-serif text-lg">Filters</p><button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters"><X size={18} /></button></div>
            <FilterPanel category={category} brands={availableBrands} brandFilter={brandFilter} viewAllBrands={viewAllBrands} onBrandToggle={toggleBrand} onAllBrands={selectAllBrands} onClear={clearFilters} />
          </div>
        </div>
      )}

      <section className="bg-[#F8F4ED] px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl text-[#3A2A1B]">Our Trusted Brands</h2>
              <p className="mt-1 text-[11px] text-[#8A7E71]">
                {TRUSTED_BRANDS.length} brands we work with — under one roof.
              </p>
            </div>
            <Link to="/brands" className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8A6A16] hover:underline">View All Brands <ArrowRight size={13} /></Link>
          </div>
          {/* Homepage-style infinite marquee — duplicated once for a seamless loop */}
          <div className="marquee-fade relative mt-5 overflow-hidden py-1">
            <div className="animate-marquee" style={{ animationDuration: "110s" }}>
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  aria-hidden={index >= TRUSTED_BRANDS.length ? "true" : undefined}
                >
                  <TrustedBrandSlide brand={brand} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#24160D] py-12 text-[#F7EEDF]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url("${IMAGES.hero}")` }} />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
          <h2 className="text-center font-serif text-2xl text-[#F3E3C8] sm:text-3xl">Why Choose Us for {rangeItem?.name || category.name}?</h2>
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <motion.div key={title} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <Icon size={34} strokeWidth={1.3} className="mx-auto text-[#D9B45B]" />
                <h3 className="mt-3 font-serif text-[16px] text-[#F3E3C8]">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#CDBB9E]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   

    </div>
  );
}
