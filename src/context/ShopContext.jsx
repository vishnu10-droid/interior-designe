import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);
const WISHLIST_KEY = "ananya-wishlist";
const CART_KEY = "ananya-cart";

function readStored(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStored(WISHLIST_KEY));
  const [cart, setCart] = useState(() => readStored(CART_KEY));

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  const toggleWishlist = useCallback((slug) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]));
  }, []);

  const toggleCart = useCallback((slug) => {
    setCart((prev) => (prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      toggleWishlist,
      toggleCart,
      isWishlisted: (slug) => wishlist.includes(slug),
      isInCart: (slug) => cart.includes(slug),
    }),
    [wishlist, cart, toggleWishlist, toggleCart]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
