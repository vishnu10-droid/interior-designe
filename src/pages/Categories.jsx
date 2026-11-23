import { useParams } from "react-router-dom";
import CategoryShowcase from "../components/CategoryShowcase";

export default function Categories() {
  const { slug } = useParams();
  // Key by slug so switching categories always starts from the correct
  // filtered state instead of reusing the previous category's UI state.
  return <CategoryShowcase key={slug || "all"} initialSlug={slug} />;
}
