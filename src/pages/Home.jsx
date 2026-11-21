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

/**
 * Home page narrative — four deliberate acts with an alternating
 * light / dark rhythm so the scroll never feels monotonous:
 *
 *   D  L  L  L  |  D  L  L  L  |  D  L  L  L  |  D
 *
 *   I.   The Promise   — hero, trusted brands, categories, why us
 *   II.  The Craft     — materials, work, projects, client stories
 *   III. The Story     — featured space, our story, journal, reels
 *   IV.  The Invitation— consultation CTA
 */
export default function Home() {
  return (
    <>
      {/* ============ ACT I — THE PROMISE ============ */}
      <Hero />
      <BrandMarquee />
      <InteriorCategories />
      <HighlightsSection />

      {/* ============ ACT II — THE CRAFT ============ */}
      <FeaturedMaterials />
      <GallerySection />
      <ProjectsSection />
      <TestimonialsSection />

      {/* ============ ACT III — THE STORY ============ */}
      <FeatureBanner />
      <AboutSection />
      <BlogSection />
      <TrendingVideos />

      {/* ============ ACT IV — THE INVITATION ============ */}
      <ConsultationBanner />
    </>
  );
}
