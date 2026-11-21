import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { getProductImages, productCategories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { PHONE_LINK, ADDRESS, DISPLAY_CENTRE } from "../data/services";

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
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-charcoal">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-cream/70 text-sm hover:text-cream w-fit"
          >
            <ArrowLeft size={15} /> All Products
          </Link>
          <span className="w-fit text-[11px] tracking-[0.25em] uppercase bg-gold text-charcoal px-4 py-1.5 rounded-full mt-5">
            {category.name}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 leading-tight">
            {category.name}
          </h1>
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
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
          <SectionHeading
            eyebrow="Category Products"
            title={`All ${category.name} Products`}
            desc="Every product available in this category — each one shown only once."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {productImages.map((src, index) => (
              <div key={src} className="rounded-2xl overflow-hidden bg-white border border-charcoal/5 shadow-card">
                <img
                  src={src}
                  alt={`${category.name} product ${index + 1}`}
                  loading="lazy"
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
