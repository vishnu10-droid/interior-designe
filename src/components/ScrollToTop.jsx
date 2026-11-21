import { useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("scroll-to-top");
      if (!btn) return;
      if (window.scrollY > 300) {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100", "pointer-events-auto");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      id="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-charcoal text-cream grid place-items-center opacity-0 pointer-events-none transition-all duration-300 shadow-lg hover:bg-espresso"
    >
      <ArrowUp size={18} />
    </button>
  );
}
