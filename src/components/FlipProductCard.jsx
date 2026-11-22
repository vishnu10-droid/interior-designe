import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, RotateCcw, Heart, ShoppingBag,
  ShieldCheck, Layers3, Gem, Leaf,
} from "lucide-react";
import { PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { WHATSAPP_LINK } from "../data/services";
import { useShop } from "../context/ShopContext";

// Decorative icons for the data-driven feature list on the reverse face.
const FEATURE_ICONS = [ShieldCheck, Layers3, Gem, Leaf];

// Reuse the site's existing WhatsApp number — only the message is personalised.
const WHATSAPP_BASE = WHATSAPP_LINK.split("?")[0];

function FlipSafeImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-center"
    />
  );
}

/**
 * One reusable, accessible 3D flip card used by the homepage Featured
 * Materials rail and by every product on the /categories catalogue grid.
 *
 * All copy, brands, features and variants come from existing product data —
 * nothing technical (specs, certifications, warranties) is invented here.
 */
export default function FlipProductCard({
  title,
  eyebrow = "The Collection",
  description = "",
  details = "",
  image,
  brands = [],
  features = [],
  variants = [],
  slug,
  productId,
  className = "",
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const frontFlipRef = useRef(null);
  const backFlipRef = useRef(null);
  const { isWishlisted, isInCart, toggleWishlist, toggleCart } = useShop();

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const sync = () => setIsTouch(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  const wished = productId ? isWishlisted(productId) : false;
  const inCart = productId ? isInCart(productId) : false;
  const viewHref = `/products/${slug}`;
  const enquireHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `Hi Ananya Interior, I would like to enquire about ${title}.`
  )}`;

  const onMouseEnter = () => { if (!isTouch) setFlipped(true); };
  const onMouseLeave = () => { if (!isTouch) setFlipped(false); };
  const onCardClick = (event) => {
    if (!isTouch) return;
    if (event.target.closest("a, button")) return; // let real controls work
    setFlipped((value) => !value);
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") setFlipped(false);
    // Enter / Space on the card itself also flips (native buttons do this
    // on their own, so only handle it when the card container has focus).
    if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
      event.preventDefault();
      setFlipped((value) => !value);
    }
  };

  return (
    <div
      className={`flip-scene group relative rounded-2xl shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onCardClick}
      onKeyDown={onKeyDown}
      role="group"
      aria-label={`${title} — flip card. Use the flip control for details.`}
      tabIndex={0}
    >
      <motion.div
        className="flip-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ------------------------------- FRONT ------------------------------- */}
        <div
          aria-hidden={flipped}
          inert={flipped}
          className="flip-face flip-face--front flex flex-col rounded-2xl border border-[#B68B4D]/30 bg-[#F8F5EF] text-[#30251E]"
        >
          <div className="relative h-[52%] shrink-0 overflow-hidden bg-[#EDE5D9]">
            <FlipSafeImage src={image} alt={title} />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
              <span className="max-w-[70%] rounded-full bg-[#F8F5EF]/95 px-2.5 py-1 text-[8px] font-semibold uppercase leading-tight tracking-[0.18em] text-[#8A6A16] shadow-sm">
                {eyebrow}
              </span>
              {productId && (
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(productId)}
                    aria-label={wished ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
                    className={`grid h-7 w-7 place-items-center rounded-full bg-[#F8F5EF]/95 shadow-sm transition-colors ${wished ? "text-[#B5483F]" : "text-[#6B5A45] hover:text-[#B5483F]"}`}
                  >
                    <Heart size={13} fill={wished ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCart(productId)}
                    aria-label={inCart ? `Remove ${title} from shortlist` : `Add ${title} to shortlist`}
                    className={`grid h-7 w-7 place-items-center rounded-full bg-[#F8F5EF]/95 shadow-sm transition-colors ${inCart ? "text-[#8A6A16]" : "text-[#6B5A45] hover:text-[#8A6A16]"}`}
                  >
                    <ShoppingBag size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-serif text-[18px] leading-tight text-[#30251E]">{title}</h3>
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#6B5A45]">
              {description}
            </p>

            <div className="mt-auto pt-3">
              <div className="flex flex-wrap gap-1">
                {brands.slice(0, 3).map((brand) => (
                  <span
                    key={brand}
                    className="max-w-[110px] truncate rounded border border-[#B68B4D]/35 bg-[#EDE5D9] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#6B542E]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#B68B4D]/25 pt-2.5">
                <Link
                  to={viewHref}
                  className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8A6A16] transition-colors hover:text-[#30251E]"
                >
                  Explore Details <ArrowUpRight size={12} />
                </Link>
                <button
                  type="button"
                  ref={frontFlipRef}
                  onClick={() => {
                    setFlipped(true);
                    window.requestAnimationFrame(() => backFlipRef.current?.focus());
                  }}
                  aria-label={`Show details for ${title}`}
                  aria-expanded={flipped}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#B68B4D]/50 text-[#8A6A16] transition-colors hover:bg-[#B68B4D] hover:text-[#F8F5EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B68B4D]"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------- BACK -------------------------------- */}
        <div
          aria-hidden={!flipped}
          inert={!flipped}
          className="flip-face flip-face--back flex flex-col rounded-2xl border border-[#B68B4D]/40 bg-[#30251E] p-4 text-[#F8F5EF]"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#B68B4D]">The Details</p>
            <button
              type="button"
              ref={backFlipRef}
              onClick={() => {
                setFlipped(false);
                window.requestAnimationFrame(() => frontFlipRef.current?.focus());
              }}
              aria-label={`Show front of ${title}`}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#B68B4D]/50 text-[#B68B4D] transition-colors hover:bg-[#B68B4D] hover:text-[#30251E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B68B4D]"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          <h3 className="mt-2 font-serif text-[18px] leading-tight text-[#F8F5EF]">{title}</h3>
          <p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-[#EDE5D9]/75">
            {details || description}
          </p>

          <div className="mt-3 space-y-1.5">
            {features.slice(0, 4).map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <div key={feature} className="flex items-center gap-2">
                  <Icon size={13} strokeWidth={1.6} className="shrink-0 text-[#B68B4D]" />
                  <span className="text-[10px] leading-tight text-[#EDE5D9]/85">{feature}</span>
                </div>
              );
            })}
          </div>

          {variants.length > 0 && (
            <div className="mt-3">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B68B4D]">Available in</p>
              <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-[#EDE5D9]/70">
                {variants.slice(0, 3).join(" · ")}
              </p>
            </div>
          )}

          <div className="mt-auto pt-3">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B68B4D]">Brands</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {brands.slice(0, 4).map((brand) => (
                <span
                  key={brand}
                  className="max-w-[110px] truncate rounded border border-[#B68B4D]/35 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#EDE5D9]/80"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                to={viewHref}
                className="flex-1 rounded-full bg-[#B68B4D] px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-[#30251E] transition-colors hover:bg-[#D9B45B]"
              >
                View Details
              </Link>
              <a
                href={enquireHref}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full border border-[#B68B4D]/70 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-[#F8F5EF] transition-colors hover:bg-[#B68B4D]/15"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
