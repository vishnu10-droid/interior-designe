import { Link } from "react-router-dom";
import { ArrowUp, Phone, MapPin, Clock } from "lucide-react";
import { ADDRESS, PHONE, PHONE_LINK } from "../data/services";
import logo from "../assets/logo.png";
import { RevealUp, StaggerContainer, StaggerItem } from "./ui";

const nav = [
  ["/", "Home"],
  ["/about", "About"],
  ["/products", "Products"],
  ["/brands", "Brands"],
  ["/services", "Services"],
  ["/contact", "Contact"],
];

const svc = [
  ["/services/home-interiors", "Home Interior"],
  ["/services/modular-kitchen", "Modular Kitchen"],
  ["/services/bedroom", "Bedroom"],
  ["/services/living-room", "Living Room"],
  ["/services/office-interiors", "Office Interior"],
];

// Inline brand glyphs keep the footer icon-led without adding a dependency.
const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    paths: [
      "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7z",
      "M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
      "M17.5 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
    ],
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    paths: [
      "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.23H7.75V13h2.7v8h3.05z",
    ],
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    paths: [
      "M21.6 7.2c-.24-.9-.94-1.6-1.83-1.84C18.25 5 12 5 12 5s-6.25 0-7.77.36c-.89.24-1.59.94-1.83 1.84C2 8.75 2 12 2 12s0 3.25.4 4.8c.24.9.94 1.6 1.83 1.84C5.75 19 12 19 12 19s6.25 0 7.77-.36c.89-.24 1.59-.94 1.83-1.84.4-1.55.4-4.8.4-4.8s0-3.25-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z",
    ],
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    paths: [
      "M6.5 8.5H3V21h3.5V8.5zM4.75 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 13.8c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.94-2.9 1.6V8.5H11V21h3.4v-6.6c0-1.75.9-2.8 2.3-2.8 1.3 0 1.9.95 1.9 2.8V21H21v-7.2z",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espressodeep text-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
      <div className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-champagne/5 blur-3xl" />

      <StaggerContainer
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 md:px-8"
        stagger={0.12}
      >
        <StaggerItem direction="left">
          <Link to="/" className="inline-flex items-center shrink-0" aria-label="Ananya Home">
            <img
              src={logo}
              alt="Ananya Interior Logo"
              className="h-16 w-16 rounded-xl bg-champagne/10 p-1 ring-1 ring-champagne/30"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Premium residential and commercial interior design studio in Agra —
            modern, elegant and functional spaces.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {socials.map(({ label, href, paths }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]" aria-hidden="true">
                  {paths.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem direction="up" className="lg:border-l lg:border-white/10 lg:pl-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-champagne">
            Navigation
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-cream/70 transition-colors hover:pl-1 hover:text-champagne"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem direction="up" className="lg:border-l lg:border-white/10 lg:pl-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-champagne">
            Services
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {svc.map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-cream/70 transition-colors hover:pl-1 hover:text-champagne"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem direction="right" className="lg:border-l lg:border-white/10 lg:pl-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-champagne">
            Contact
          </p>
          <ul className="mt-5 space-y-3.5 text-sm text-cream/70">
            <li>
              <a
                href={PHONE_LINK}
                className="flex items-center gap-2.5 transition-colors hover:text-champagne"
              >
                <Phone size={15} className="shrink-0 text-champagne" />
                {PHONE}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-champagne" />
              <span className="leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={15} className="shrink-0 text-champagne" />
              Open 24 Hours
            </li>
          </ul>
        </StaggerItem>
      </StaggerContainer>

      <div className="relative border-t border-white/10 bg-black/10">
        <RevealUp className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/50 sm:flex-row md:px-8">
          <p>Copyright © 2026 Ananya Interior. All Rights Reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-champagne hover:text-champagne"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </RevealUp>
      </div>
    </footer>
  );
}
