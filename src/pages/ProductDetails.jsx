import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowDown, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { RevealLeft, RevealRight, SectionHeading } from "../components/ui";
import { getProductImages, productCategories, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { PHONE_LINK, ADDRESS, DISPLAY_CENTRE } from "../data/services";

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

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = productCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="pt-[72px] max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal mb-4">Product not found</h1>
        <p className="text-coffee mb-6">The product category you're looking for doesn't exist.</p>
        <Link to="/products" className="inline-flex items-center gap-2 text-golddark font-medium hover:text-golddark/80 transition-colors">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  const productImages = getProductImages(category);

  return (
    <div className="pt-[72px]">
      <section className="relative overflow-hidden bg-[#1C1109] text-[#F7EEDF]">
        {/* ambient gold glow + hairline framing */}
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-[#D9B45B]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#D9B45B]/[0.05] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9B45B]/35 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-14">
          {/* ---------------------------- copy ---------------------------- */}
          <RevealRight>
            {/* breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#D9CBB4]/70">
              <Link to="/" className="hover:text-[#D9B45B]">Home</Link>
              <ChevronRight size={12} className="text-[#8A6A46]" />
              <Link to="/products" className="hover:text-[#D9B45B]">Products</Link>
              <ChevronRight size={12} className="text-[#8A6A46]" />
              <span className="text-[#F4E4C6]">{category.name}</span>
            </nav>

            <div className="mt-9 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9B45B]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D9B45B]">
                The Collection · Premium Materials
              </p>
            </div>

            <h1 className="mt-4 font-serif text-[40px] leading-[1.05] text-[#FBF3E7] sm:text-5xl lg:text-[56px]">
              {category.name}
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-[#D9CBB4]">
              {category.description}
            </p>

            {/* featured brands */}
            {category.brands?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10px] uppercase tracking-[0.2em] text-[#D9CBB4]/55">
                  Featured brands
                </span>
                {category.brands.slice(0, 4).map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-[#D9B45B]/25 bg-[#D9B45B]/5 px-3 py-1 text-[10px] tracking-wide text-[#F4E4C6]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            )}

            {/* actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#category-products"
                className="group inline-flex items-center gap-2 rounded-full bg-[#D9B45B] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#24160D] transition-colors hover:bg-[#F0D48A]"
              >
                Explore the collection
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-[#D9B45B]/45 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[#F4E4C6] transition-colors hover:bg-[#D9B45B]/10"
              >
                <ArrowLeft size={14} /> All products
              </Link>
            </div>
          </RevealRight>

          {/* ---------------------------- image --------------------------- */}
          <RevealLeft className="relative h-[280px] sm:h-[340px] lg:h-[440px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#D9B45B]/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <SafeImage
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1109]/45 via-transparent to-transparent" />
            </div>

            {/* decorative gold arc + circular material close-up */}
            <svg className="pointer-events-none absolute -left-6 -top-6 h-[120%] w-[120%]" viewBox="0 0 500 500" fill="none" aria-hidden="true">
              <path d="M -20 380 C 90 120, 360 -20, 520 120" stroke="#D9B45B" strokeWidth="1" opacity="0.55" />
              <path d="M 40 430 C 140 230, 340 150, 500 220" stroke="#D9B45B" strokeWidth="0.8" opacity="0.35" />
            </svg>
            <div className="absolute -bottom-5 -left-5 hidden h-24 w-24 overflow-hidden rounded-full border-[3px] border-[#D9B45B] shadow-[0_0_30px_rgba(217,180,91,0.35)] sm:block">
              <SafeImage
                src={category.image}
                alt={`${category.name} detail`}
                className="h-full w-full scale-150 object-cover object-center"
              />
            </div>
            <span className="absolute -right-3 top-6 hidden rounded-full border border-[#D9B45B]/30 bg-[#140C07]/85 px-4 py-2 font-serif text-[11px] tracking-[0.18em] text-[#F4E4C6] backdrop-blur sm:block">
              THE EDIT · 01
            </span>
          </RevealLeft>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <RevealSectionHeading title={`About ${category.name}`} />
          <p className="text-coffee text-base leading-relaxed">{category.description}</p>

          {category.types && category.types.length > 0 && (
            <div className="bg-beige/50 rounded-2xl p-6 border border-charcoal/5">
              <h3 className="font-serif text-lg text-charcoal mb-4">Types & Variants</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {category.types.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-charcoal/85">
                    <span className="w-2 h-2 rounded-full bg-golddark"></span>{t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {category.features && category.features.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5">
              <h3 className="font-serif text-lg text-charcoal mb-4">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {category.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-charcoal/85">
                    <span className="w-2 h-2 rounded-full bg-golddark"></span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {category.applications && category.applications.length > 0 && (
            <div className="bg-beige/50 rounded-2xl p-6 border border-charcoal/5">
              <h3 className="font-serif text-lg text-charcoal mb-4">Applications</h3>
              <div className="flex flex-wrap gap-2.5">
                {category.applications.map((a) => (
                  <span key={a} className="px-3 py-1.5 rounded-full bg-white text-charcoal text-sm border border-charcoal/10">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-charcoal rounded-3xl p-8 text-cream">
            <h3 className="font-serif text-xl text-cream mb-6">Associated Brands</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {category.brands.length > 0 ? (
                category.brands.map((b) => (
                  <div key={b} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-sm font-medium text-cream/90">{b}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-cream/60">Brand information available upon enquiry.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-card border border-charcoal/5">
            <h3 className="font-serif text-xl text-charcoal mb-6">Get More Information</h3>
            <p className="text-coffee mb-6">Have questions about specifications, availability, or pricing? Contact our team.</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-golddark shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-charcoal/85">Phone</p>
                  <a href={PHONE_LINK} className="font-medium text-golddark hover:underline">{PHONE_LINK.replace("tel:", "")}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-golddark shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-charcoal/85">Display Centre</p>
                  <p className="text-sm text-charcoal/85 leading-relaxed">{DISPLAY_CENTRE}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-golddark shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-charcoal/85">Head Office</p>
                  <p className="text-sm text-charcoal/85 leading-relaxed">{ADDRESS}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="mt-6 inline-flex items-center gap-2 w-full bg-charcoal text-cream px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-espresso transition-colors"
            >
              Send Enquiry <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {productImages.length > 0 && (
        <section id="category-products" className="max-w-7xl mx-auto scroll-mt-24 px-5 md:px-8 pb-16">
          <SectionHeading
            eyebrow="Category Products"
            title={`All ${category.name} Products`}
            desc="Every product available in this category — each one shown only once."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {productImages.map((src, index) => (
              <div key={src} className="rounded-2xl overflow-hidden bg-white border border-charcoal/5 shadow-card">
                <SafeImage
                  src={src}
                  alt={`${category.name} product ${index + 1}`}
                  className="w-full h-72 object-contain p-3"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-beige/40 py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Related Categories" title="You May Also Like" />
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {productCategories
              .filter((c) => c.id !== category.id)
              .slice(0, 6)
              .map((c) => (
                <ProductCard key={c.id} category={c} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function RevealSectionHeading({ title }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium mb-3">{title}</p>
    </div>
  );
}
