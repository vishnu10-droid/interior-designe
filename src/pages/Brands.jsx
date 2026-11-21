import { SectionHeading } from "../components/ui";
import { allBrands, featuredBrands } from "../data/products";
import { BrandCard } from "../components/BrandSection";
import { BrandMarquee } from "../components/BrandMarquee";
import { Reveal } from "../components/ui";
import { IMAGES } from "../data/services";
import { PageHero } from "./Services";

export default function BrandsPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        eyebrow="Brand Partners"
        title="Trusted Brand Partnerships"
        desc="We partner with India's leading interior and exterior material brands to bring you quality, durability, and design excellence under one roof."
        image={IMAGES.luxury}
      />

      {/* Brand logo slider — now also available on its own dedicated page */}
      <BrandMarquee />

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Our Brand Partners"
          title="Brands We Work With"
          desc="Genuine brand partnerships from the company profile."
        />
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 items-stretch">
            {featuredBrands.map((b, index) => (
              <BrandCard key={b.name} brand={{ ...b, featured: true }} index={index} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-beige/40 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Complete Brand List" title="All Associated Brands" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
            {allBrands.map((b, index) => (
              <BrandCard key={b} brand={{ name: b }} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
