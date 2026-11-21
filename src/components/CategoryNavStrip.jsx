import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productCategories, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";

const STEP = 152; // card width + gap, used by the arrow buttons

/** Local asset first, generic fallback only if that asset fails to load. */
function CategoryThumb({ category }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-[96px] w-full overflow-hidden rounded-lg bg-[#EFE9E1] p-2 sm:h-[104px]">
      <img
        src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : category.image}
        alt={category.name}
        loading="lazy"
        draggable="false"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.07]"
      />
    </div>
  );
}

/**
 * Static (non-auto-scrolling) category strip. Every category is rendered once;
 * horizontal scrolling is manual via arrows, mouse drag and touch swipe.
 */
export default function CategoryNavStrip({
  activeSlug: activeSlugProp,
  buildHref,
  viewAllHref = "/categories",
  onViewAll,
}) {
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const suppressClickRef = useRef(false);
  const { pathname } = useLocation();

  const routeSlug = pathname.startsWith("/categories/")
    ? decodeURIComponent(pathname.split("/")[2] || "")
    : "";
  const activeSlug = activeSlugProp !== undefined ? activeSlugProp : routeSlug;
  const hrefFor = buildHref || ((slug) => `/categories/${slug}`);

  const nudge = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * STEP, behavior: "smooth" });
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse") return; // touch uses native horizontal scroll
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: false };
    try {
      track.setPointerCapture?.(event.pointerId);
    } catch {
      /* capture is optional */
    }
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || !trackRef.current) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    trackRef.current.scrollLeft = drag.startLeft - delta;
  };

  const onPointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    suppressClickRef.current = drag.moved;
    drag.active = false;
    try {
      trackRef.current?.releasePointerCapture?.(event.pointerId);
    } catch {
      /* capture may not have been acquired */
    }
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const onClickCapture = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section className="w-full border-b border-charcoal/5 bg-white" aria-label="Shop by category">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-golddark">
            Shop by Category
          </p>
          <div className="flex items-center gap-2">
            {onViewAll ? (
              <button
                type="button"
                onClick={onViewAll}
                className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-golddark transition-colors hover:bg-gold hover:text-charcoal"
              >
                View all <ChevronRight size={13} />
              </button>
            ) : (
              <Link
                to={viewAllHref}
                className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-golddark transition-colors hover:bg-gold hover:text-charcoal"
              >
                View all <ChevronRight size={13} />
              </Link>
            )}
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll categories left"
              className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-colors hover:border-gold hover:text-golddark"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll categories right"
              className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-colors hover:border-gold hover:text-golddark"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {productCategories.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-coffee">No categories available yet.</p>
        ) : (
          <div
            ref={trackRef}
            className="no-scrollbar flex cursor-grab gap-3 overflow-x-auto pb-3 active:cursor-grabbing"
            style={{ touchAction: "pan-x" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={onClickCapture}
          >
            {productCategories.map((category) => {
              const isActive = category.slug === activeSlug;
              return (
                <Link
                  key={category.id}
                  to={hrefFor(category.slug)}
                  onClick={(event) => {
                    if (suppressClickRef.current) event.preventDefault();
                  }}
                  className={`group relative flex w-[130px] shrink-0 snap-start flex-col gap-2 rounded-xl border bg-white p-2 pb-3 text-center transition-all duration-300 sm:w-[140px] ${
                    isActive
                      ? "border-gold shadow-card ring-1 ring-gold/40"
                      : "border-charcoal/5 shadow-sm hover:border-gold/60 hover:shadow-card"
                  }`}
                >
                  <CategoryThumb category={category} />
                  <span
                    className={`line-clamp-2 min-h-[34px] font-serif text-[13px] leading-tight transition-colors sm:text-[14px] ${
                      isActive ? "text-golddark" : "text-charcoal group-hover:text-golddark"
                    }`}
                  >
                    {category.name}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
