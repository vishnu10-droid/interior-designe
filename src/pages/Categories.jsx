import { CategoryGrid } from "../components/Sections";

export default function Categories() {
  return (
    <div className="pt-[72px]">
      {/* Dedicated page: static 4-column grid, no pinned horizontal slider */}
      <CategoryGrid />
    </div>
  );
}
