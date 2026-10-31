import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, ArrowUp } from "lucide-react";
import { ADDRESS, PHONE, PHONE_LINK } from "../data/services";
import logo from "../assets/logo.png";

export default function Footer() {
  const nav = [["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/projects", "Projects"], ["/gallery", "Gallery"], ["/contact", "Contact"]];
  const svc = [["/services/home-interiors", "Home Interior"], ["/services/modular-kitchen", "Modular Kitchen"], ["/services/bedroom", "Bedroom"], ["/services/living-room", "Living Room"], ["/services/office-interiors", "Office Interior"]];
  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="AF Interior Logo"
              className="w-16 h-14 object-contain rounded-lg bg-gold/15 border border-gold/30 grid place-items-center font-serif text-lg text-gold"
            />
          </div>
          <p className="text-sm text-cream/60 mt-5 leading-relaxed">Premium residential and commercial interior design studio in Agra — modern, elegant and functional spaces.</p>
          <p className="text-gold text-sm mt-4">★★★★★ 4.9 • 254+ Reviews</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Navigation</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map(([to, l]) => <li key={to}><Link to={to} className="text-cream/70 hover:text-cream transition-colors">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Services</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {svc.map(([to, l]) => <li key={to}><Link to={to} className="text-cream/70 hover:text-cream transition-colors">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Contact</p>
          <ul className="mt-5 space-y-3.5 text-sm text-cream/70">
            <li><a href={PHONE_LINK} className="flex items-center gap-2.5 hover:text-cream"><Phone size={15} className="text-gold shrink-0" />{PHONE}</a></li>
            <li className="flex items-start gap-2.5"><MapPin size={15} className="text-gold shrink-0 mt-0.5" /><span className="leading-relaxed">{ADDRESS}</span></li>
            <li className="flex items-center gap-2.5"><Clock size={15} className="text-gold shrink-0" />Open 24 Hours</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© 2026 AF Interior. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
