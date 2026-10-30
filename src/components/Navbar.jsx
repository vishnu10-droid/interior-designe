
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

import { PHONE, PHONE_LINK } from "../data/services";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            ? "bg-cream/85 backdrop-blur-xl shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between gap-4">

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

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-[13px] tracking-[0.14em] uppercase transition-colors ${
                    isActive
                      ? "text-golddark"
                      : solid
                      ? "text-charcoal/80 hover:text-charcoal"
                      : "text-white/85 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE BUTTONS */}

          <div className="flex items-center gap-2.5">

            

            
              
                

              

            <button
              onClick={() => navigate("/contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-charcoal text-cream text-[13px] tracking-wide px-5 py-2.5 rounded-full hover:bg-espresso transition-colors"
            >
              Get Consultation
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
              <LayoutDashboard size={17} />
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
                        `flex items-center justify-between py-3.5 border-b border-charcoal/8 font-serif text-2xl ${
                          isActive
                            ? "text-golddark"
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

                {/* DASHBOARD LINK */}

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/dashboard");
                  }}
                  className="mt-5 flex items-center gap-3 rounded-xl bg-charcoal text-cream px-5 py-4 text-sm tracking-wide"
                >
                  <LayoutDashboard size={17} />
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
