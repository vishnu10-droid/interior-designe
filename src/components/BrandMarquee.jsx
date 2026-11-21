import { Link } from "react-router-dom";
import { Reveal } from "./ui";
import { featuredBrands } from "../data/products";

export function BrandMarquee() {
  // Duplicate the list once so the -50% translate loops seamlessly.
  const brands = [...featuredBrands, ...featuredBrands];

  return (
    <section id="brands" className="bg-beige/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">In the showroom</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight text-charcoal">
            Our brands, in the <em className="font-serif italic text-golddark">headlines</em>
          </h2>
          <div className="gold-line mt-4" />
        </Reveal>

        <div className="marquee-fade relative mt-10 overflow-hidden">
          <div className="animate-marquee">
            {brands.map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                to="/brands"
                aria-hidden={index >= featuredBrands.length ? "true" : undefined}
                tabIndex={index >= featuredBrands.length ? -1 : 0}
                className="group mr-3 grid h-24 w-48 shrink-0 place-items-center rounded-xl border border-charcoal/5 bg-white px-5 py-4 shadow-card transition-shadow duration-300 hover:shadow-lift sm:mr-4 sm:w-56"
              >
                <img
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.style.display = "none";
                    const fallback = image.nextElementSibling;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                  className="max-h-12 w-full object-contain transition-all duration-500 sm:max-h-14"
                />
                <span className="hidden text-center font-serif text-lg text-charcoal">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
