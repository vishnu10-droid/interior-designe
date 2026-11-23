import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allProducts, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";

const STEP = 152; // card width + gap, used by the arrow buttons

/** Local asset first, generic fallback only if that asset fails to load. */
function ProductThumb({ product }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-[96px] w-full overflow-hidden rounded-lg bg-[#EFE9E1] p-2 sm:h-[104px]">
      <img
        src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : product.image}
        alt={product.name}
        loading="lazy"
        draggable="false"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.07]"
      />
    </div>
  );
}

/**
 * Static (non-auto-scrolling) product strip shown under "Product range".
 * Every product is rendered once with its name and a link to its detail page;
 * horizontal scrolling is manual via arrows, mouse drag and touch swipe.
 */
export default function CategoryNavStrip({ activeSlug: activeSlugProp, onViewAll }) {
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, moved: false, pointerId: null, captured: false });
  const suppressClickRef = useRef(false);
  const [params] = useSearchParams();
  const selectedItem = params.get("item");
  const activeSlug = activeSlugProp || "";

  const nudge = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * STEP, behavior: "smooth" });
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse") return; // touch uses native horizontal scroll
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startLeft: track.scrollLeft,
      moved: false,
      pointerId: event.pointerId,
      captured: false,
    };
    // IMPORTANT: do not capture the pointer here. Capturing on pointer-down
    // retargets the following click to the track, so the product links below
    // would never receive it. Capture only once a real drag starts.
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || !trackRef.current) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(delta) <= 4) return;
      drag.moved = true;
      try {
        trackRef.current.setPointerCapture?.(drag.pointerId);
        drag.captured = true;
      } catch {
        /* capture is optional */
      }
    }
    trackRef.current.scrollLeft = drag.startLeft - delta;
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    if (!drag.active) return;
    suppressClickRef.current = drag.moved;
    if (drag.captured) {
      try {
        trackRef.current?.releasePointerCapture?.(drag.pointerId);
      } catch {
        /* capture may not have been acquired */
      }
    }
    drag.active = false;
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
    <section className="w-full border-b border-charcoal/5 bg-white" aria-label="Shop by product">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-golddark">
            Product range
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-golddark transition-colors hover:bg-gold hover:text-charcoal"
            >
              View all <ChevronRight size={13} />
            </button>
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll products left"
              className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-colors hover:border-gold hover:text-golddark"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll products right"
              className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal transition-colors hover:border-gold hover:text-golddark"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {allProducts.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-coffee">No products available yet.</p>
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
            {allProducts.map((product) => {
              const isActive = selectedItem === product.id;
              return (
                <Link
                  key={product.id}
                  to={`/products/${product.categorySlug}?item=${product.id}`}
                  onClick={(event) => {
                    if (suppressClickRef.current) event.preventDefault();
                  }}
                  className={`group relative flex w-[130px] shrink-0 snap-start flex-col gap-2 rounded-xl border bg-white p-2 pb-3 text-center transition-all duration-300 sm:w-[140px] ${
                    isActive
                      ? "border-gold shadow-card ring-1 ring-gold/40"
                      : "border-charcoal/5 shadow-sm hover:border-gold/60 hover:shadow-card"
                  }`}
                >
                  <ProductThumb product={product} />
                  <span
                    className={`line-clamp-2 min-h-[34px] font-serif text-[13px] leading-tight transition-colors sm:text-[14px] ${
                      isActive ? "text-golddark" : "text-charcoal group-hover:text-golddark"
                    }`}
                  >
                    {product.name}
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
