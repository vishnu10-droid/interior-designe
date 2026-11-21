import { useParams } from "react-router-dom";
import CategoryShowcase from "../components/CategoryShowcase";

export default function Categories() {
  const { slug } = useParams();
  return <CategoryShowcase initialSlug={slug} />;
}
