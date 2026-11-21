import { BlogSection } from "../components/Blog";
import { PageHero } from "./Services";
import { IMAGES } from "../data/services";

export default function BlogPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        eyebrow="Journal"
        title="Ideas & Inspiration"
        desc="Practical thinking on materials, layouts and the details that make a space feel like yours."
        image={IMAGES.luxury}
      />
      <BlogSection />
    </div>
  );
}
