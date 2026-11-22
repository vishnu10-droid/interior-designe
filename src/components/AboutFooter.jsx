import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, ArrowUp } from "lucide-react";
import { ADDRESS, PHONE, PHONE_LINK } from "../data/services";
import logo from "../assets/logo.png";
import { RevealUp, StaggerContainer, StaggerItem } from "./ui";

/* Brand marks are drawn inline: this lucide build no longer ships brand icons. */
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v5h4v-5h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" />
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="4" /><path d="M7 10v7M7 7v.01M11 17v-7M11 13a2.5 2.5 0 0 1 5 0v4" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "YouTube", href: "https://www.youtube.com/", icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedinIcon },
];

const nav = [
  ["/", "Home"], ["/about", "About"], ["/products", "Products"],
  ["/brands", "Brands"], ["/services", "Services"], ["/contact", "Contact"],
];
const svc = [
  ["/services/home-interiors", "Home Interior"],
  ["/services/modular-kitchen", "Modular Kitchen"],
  ["/services/bedroom", "Bedroom"],
  ["/services/living-room", "Living Room"],
  ["/services/office-interiors", "Office Interior"],
];

export default function AboutFooter() {
  return (
    <footer className="bg-walnut text-ivory">
      <StaggerContainer className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:px-7 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        <StaggerItem direction="left">
          <img src={logo} alt="Ananya Interior Logo" className="h-14 w-16 object-contain" />
          <p className="mt-4 max-w-[260px] text-[12.5px] leading-[1.85] text-ivory/60">
            Premium residential and commercial interior trade studio in Agra — modern, elegant and functional spaces.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}
                className="grid h-8 w-8 place-items-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-champagne hover:bg-champagne/10 hover:text-champagne">
                <Icon size={14} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem direction="up">
          <p className="eyebrow-label">Navigation</p>
          <ul className="mt-5 space-y-2.5 text-[12.5px]">
            {nav.map(([to, label]) => (
              <li key={to}><Link to={to} className="text-ivory/65 transition-colors hover:text-champagne">{label}</Link></li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem direction="up">
          <p className="eyebrow-label">Services</p>
          <ul className="mt-5 space-y-2.5 text-[12.5px]">
            {svc.map(([to, label]) => (
              <li key={to}><Link to={to} className="text-ivory/65 transition-colors hover:text-champagne">{label}</Link></li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem direction="right">
          <p className="eyebrow-label">Contact</p>
          <ul className="mt-5 space-y-3.5 text-[12.5px] text-ivory/65">
            <li>
              <a href={PHONE_LINK} className="flex items-center gap-2.5 hover:text-champagne">
                <Phone size={14} strokeWidth={1.6} className="shrink-0 text-champagne" />{PHONE}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} strokeWidth={1.6} className="mt-0.5 shrink-0 text-champagne" />
              <span className="leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={14} strokeWidth={1.6} className="shrink-0 text-champagne" />Open 24 Hours
            </li>
          </ul>
        </StaggerItem>
      </StaggerContainer>

      <div className="border-t border-champagne/25">
        <RevealUp className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-3 px-5 py-5 text-[11px] text-ivory/50 md:flex-row md:px-7">
          <p>© 2026 Ananya Interior. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-champagne/35 px-4 py-2 text-ivory/75 transition-colors hover:border-champagne hover:bg-champagne/10 hover:text-champagne">
            Back to top <ArrowUp size={12} />
          </button>
        </RevealUp>
      </div>
    </footer>
  );
}
