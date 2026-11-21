import Hero from "../components/Hero";
import { AboutSection, InteriorCategories } from "../components/Sections";
import { HighlightsSection } from "../components/Process";
import { FeatureBanner, ConsultationBanner } from "../components/Banners";
import { GallerySection } from "../components/Gallery";
import { TestimonialsSection } from "../components/Testimonials";
import { ProjectsSection } from "../components/Projects";
import { BlogSection } from "../components/Blog";
import { BrandMarquee } from "../components/BrandMarquee";
import TrendingVideos from "../components/TrendingVideos";
import FeaturedMaterials from "../components/FeaturedMaterials";

export default function Home() {
  return (
    <>
      {/* 02 — Hero */}
      <Hero />

      {/* 03 — Brand / Partner Slider */}
      <BrandMarquee />

      {/* 04 — Services / Interior Categories */}
      <InteriorCategories />

      {/* 05 — Highlighted materials */}
      <FeaturedMaterials />

      {/* 07 — Interior Gallery / Trade Showcase */}
      <GallerySection />

      {/* 08 — Why Choose Us / Highlights */}
      <HighlightsSection />

      {/* 09 — Featured Interior Banner */}
      <FeatureBanner />

      {/* 10 — Testimonials / Client Stories */}
      <TestimonialsSection />

      {/* 11 — Featured Projects / Portfolio */}
      <ProjectsSection />

      {/* 12 — Blog / Latest News */}
      <BlogSection />

      {/* 13 — About / Information */}
      <AboutSection />

      {/* 14 — Trending trade & decor tips / Video carousel */}
      <TrendingVideos />

      {/* 15 — CTA / Consultation Banner */}
      <ConsultationBanner />
    </>
  );
}
