
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  LayoutGrid,
  ArrowRight,
  ChevronDown,
  Search,
  Heart,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { PHONE, PHONE_LINK } from "../data/services";
import { useShop } from "../context/ShopContext";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Product" },
  { to: "/categories", label: "Category" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

// Existing Services / Projects / Brands routes stay reachable from both menus.
const extraLinks = [
  { to: "/services", label: "Services" },
  { to: "/#projects", label: "Projects" },
  { to: "/brands", label: "Brands" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { wishlist, cart } = useShop();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === "/";

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <>
      {/* DESKTOP NAVBAR */}

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-[#F8F4EE]/95 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(43,32,26,0.28)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between gap-2 lg:gap-4">

          {/* ANANYA LOGO */}

          <Link
            to="/"
            className="flex items-center shrink-0 rounded "
            aria-label="Ananya Home"
          >
            <img
              src={logo}
              alt="Ananya Logo"
              className="h-14 sm:h-14 object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-[13px] tracking-[0.14em] uppercase transition-colors ${
                    isActive
                      ? "text-champagne after:absolute after:-bottom-1.5 after:left-1/2 after:h-[2px] after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-champagne"
                      : solid
                      ? "text-charcoal/80 hover:text-charcoal"
                      : "text-white/85 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <details key={pathname} className="group relative">
              <summary
                className={`flex cursor-pointer list-none items-center gap-1 text-[13px] tracking-[0.14em] uppercase transition-colors [&::-webkit-details-marker]:hidden ${
                  solid ? "text-charcoal/80 hover:text-charcoal" : "text-white/85 hover:text-white"
                }`}
              >
                More
                <ChevronDown size={13} className="transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-full mt-4 w-40 rounded-2xl border border-charcoal/5 bg-white p-2 shadow-lift">
                {extraLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-xl px-4 py-2.5 text-sm text-charcoal/80 transition-colors hover:bg-beige hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>

          {/* RIGHT SIDE BUTTONS */}

          <div className="flex items-center gap-1.5 sm:gap-2">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                navigate(search.trim() ? `/products?q=${encodeURIComponent(search.trim())}` : "/products");
              }}
              className="relative hidden lg:block"
            >
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stonewarm" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search materials"
                aria-label="Search materials"
                className="w-36 rounded-full border border-charcoal/10 bg-white/90 py-2 pl-9 pr-3 text-[12px] text-charcoal placeholder:text-stonewarm xl:w-44"
              />
            </form>

            {/* <button
              type="button"
              onClick={() => navigate("/products?view=wishlist")}
              aria-label={`Wishlist, ${wishlist.length} items`}
              title="Wishlist"
              className={`relative grid h-10 w-10 place-items-center rounded-full border transition-colors ${solid ? "border-charcoal/15 bg-white text-charcoal hover:bg-beige" : "border-white/25 bg-white/10 text-white"}`}
            >
              <Heart size={17} />
              {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#C2564B] px-1 text-[9px] font-semibold text-white">{wishlist.length}</span>}
            </button> */}
{/* 
            <button
              type="button"
              onClick={() => navigate("/products?view=cart")}
              aria-label={`Cart, ${cart.length} items`}
              title="Cart"
              className={`relative grid h-10 w-10 place-items-center rounded-full border transition-colors ${solid ? "border-charcoal/15 bg-white text-charcoal hover:bg-beige" : "border-white/25 bg-white/10 text-white"}`}
            >
              <ShoppingBag size={17} />
              {cart.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-semibold text-charcoal">{cart.length}</span>}
            </button> */}

            {/* <button
              type="button"
              onClick={() => navigate("/contact")}
              aria-label="Account"
              title="Account"
              className={`hidden h-10 w-10 place-items-center rounded-full border transition-colors sm:grid ${solid ? "border-charcoal/15 bg-white text-charcoal hover:bg-beige" : "border-white/25 bg-white/10 text-white"}`}
            >
              <UserRound size={17} />
            </button> */}

            <button
              onClick={() => navigate("/contact")}
              className="hidden items-center gap-2 whitespace-nowrap bg-charcoal text-cream text-[12px] tracking-wide px-4 py-2.5 rounded-full hover:bg-espresso transition-colors lg:inline-flex xl:px-5"
            >
              Get a Quote
              <ArrowRight size={14} />
            </button>

            {/* DASHBOARD BUTTON */}

            <button
              onClick={() => navigate("/dashboard")}
              title="Dashboard"
              aria-label="Open dashboard"
              className={`w-10 h-10 rounded-full grid place-items-center border transition-colors ${
                solid
                  ? "border-charcoal/15 bg-white text-charcoal hover:bg-beige"
                  : "border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              }`}
            >
              <LayoutGrid size={17} />
            </button>

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`lg:hidden w-10 h-10 rounded-full grid place-items-center border ${
                solid
                  ? "border-charcoal/15 bg-white text-charcoal"
                  : "border-white/25 bg-white/10 text-white backdrop-blur"
              }`}
            >
              <Menu size={18} />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* MOBILE SIDEBAR */}

            <motion.aside
              className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-cream shadow-lift flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 260,
              }}
            >

              {/* MOBILE HEADER */}

              <div className="flex items-center justify-between px-6 h-[72px] border-b border-charcoal/10">

                {/* MOBILE LOGO */}

                <Link
                  to="/"
                  className="flex items-center shrink-0"
                  aria-label="Ananya Home"
                >
                  <img
                    src={logo}
                    alt="Ananya Logo"
                    className="w-[110px] h-[55px] object-contain"
                  />
                </Link>

                {/* CLOSE BUTTON */}

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full grid place-items-center bg-white border border-charcoal/10"
                >
                  <X size={18} />
                </button>

              </div>

              {/* MOBILE NAVIGATION LINKS */}

              <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-3.5 border-b border-charcoal/8 font-serif text-[20px] ${
                          isActive
                            ? "text-champagne"
                            : "text-charcoal"
                        }`
                      }
                    >
                      {l.label}

                      <ArrowRight
                        size={18}
                        className="opacity-40"
                      />
                    </NavLink>
                  </motion.div>
                ))}

                {/* EXISTING PRODUCT & BRAND ROUTES */}

                <div className="mt-4 flex flex-wrap gap-2">
                  {extraLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-xs tracking-wide text-coffee hover:border-gold hover:text-charcoal"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                {/* GET A QUOTE */}

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/contact");
                  }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 text-sm font-medium text-charcoal"
                >
                  Get a Quote <ArrowRight size={16} />
                </button>

                {/* DASHBOARD LINK */}

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/dashboard");
                  }}
                  className="mt-5 flex items-center gap-3 rounded-xl bg-charcoal text-cream px-5 py-4 text-sm tracking-wide"
                >
                  <LayoutGrid size={17} />
                  Open Dashboard
                </button>

              </nav>

              {/* MOBILE FOOTER */}

              <div className="px-6 pb-7">

                {/* PHONE */}

                <a
                  href={PHONE_LINK}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <span className="w-10 h-10 rounded-full bg-charcoal text-gold grid place-items-center">
                    <Phone size={16} />
                  </span>

                  {PHONE}
                </a>

                {/* ADDRESS */}

                <p className="text-xs text-coffee mt-3">
                  Open 24 Hours • G-8, near ICICI bank,
                  Sanjay Place, Civil Lines, Agra, UP 282002
                </p>

              </div>

            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
