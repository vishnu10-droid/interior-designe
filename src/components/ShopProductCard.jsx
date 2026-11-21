import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { useShop } from "../context/ShopContext";

/**
 * Premium compact PLP card. Pricing/ratings are intentionally not invented —
 * this catalogue has no price fields, so the card shows "Price on request".
 */
export default function ShopProductCard({ category, index = 0, compact = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const { isWishlisted, isInCart, toggleWishlist, toggleCart } = useShop();
  const wished = isWishlisted(category.slug);
  const inCart = isInCart(category.slug);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min((index % 6) * 0.04, 0.2), ease: [0.16, 1, 0.3, 1] }}
      className="group w-full"
    >
      <div className="overflow-hidden rounded-xl border border-charcoal/8 bg-white shadow-[0_2px_12px_rgba(28,25,23,0.05)] transition-all duration-300 hover:border-gold/40 hover:shadow-card">
        <Link to={`/products/${category.slug}`} className="block" aria-label={`View ${category.name}`}>
          <div className={`relative overflow-hidden bg-beige ${compact ? "aspect-square" : "aspect-square"}`}>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-beige" />}
            <img
              src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : category.image}
              alt={category.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => {
                if (!failed) setFailed(true);
                else setLoaded(true);
              }}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
            <span className="absolute left-2.5 top-2.5 rounded bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-golddark shadow-sm">
              {category.brands?.[0] || "Premium"}
            </span>
          </div>
        </Link>

        <div className="relative p-3.5">
          <div className="absolute -top-10 right-2.5 flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleWishlist(category.slug)}
              aria-label={wished ? `Remove ${category.name} from wishlist` : `Add ${category.name} to wishlist`}
              className={`grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition-colors hover:text-[#C2564B] ${
                wished ? "text-[#C2564B]" : "text-charcoal/60"
              }`}
            >
              <Heart size={15} fill={wished ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              onClick={() => toggleCart(category.slug)}
              aria-label={inCart ? `Remove ${category.name} from cart` : `Add ${category.name} to cart`}
              className={`grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition-colors ${
                inCart ? "text-golddark" : "text-charcoal/60 hover:text-golddark"
              }`}
            >
              <ShoppingBag size={15} />
            </button>
          </div>

          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stonewarm">
            {category.types?.[0] || "Interior Material"}
          </p>
          <Link to={`/products/${category.slug}`} className="mt-1 block">
            <h3 className="line-clamp-1 text-[13px] font-semibold text-charcoal transition-colors group-hover:text-golddark">
              {category.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 text-[11px] text-coffee/70">
            by {category.brands?.[0] || "Ananya Interior"}
          </p>
          <div className="mt-2 flex items-center gap-2 border-t border-charcoal/5 pt-2">
            <span className="text-[12px] font-semibold text-charcoal">Price on request</span>
            <span className="text-[10px] text-stonewarm">· MOQ 1</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
