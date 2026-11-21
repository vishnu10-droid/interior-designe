import Hero from "../components/Hero";
import { AboutSection, InteriorCategories } from "../components/Sections";
import { HighlightsSection } from "../components/Process";
import { FeatureBanner, ConsultationBanner } from "../components/Banners";
import { GallerySection } from "../components/Gallery";
import { TestimonialsSection } from "../components/Testimonials";
import { ProjectsSection } from "../components/Projects";
import { BlogSection } from "../components/Blog";
import { BrandMarquee } from "../components/BrandMarquee";

export default function Home() {
  return (
    <>
      {/* 02 — Hero */}
      <Hero />

      {/* 03 — Brand / Partner Slider */}
      <BrandMarquee />

      {/* 04 — Services / Interior Categories */}
      <InteriorCategories />

      {/* 05 — Interior Gallery / Design Showcase */}
      <GallerySection />

      {/* 06 — Why Choose Us / Highlights */}
      <HighlightsSection />

      {/* 07 — Featured Interior Banner */}
      <FeatureBanner />

      {/* 08 — Testimonials / Client Stories */}
      <TestimonialsSection />

      {/* 09 — Featured Projects / Portfolio */}
      <ProjectsSection />

      {/* 10 — Blog / Latest News */}
      <BlogSection />

      {/* 11 — About / Information */}
      <AboutSection />

      {/* 12 — CTA / Consultation Banner */}
      <ConsultationBanner />
    </>
  );
}
