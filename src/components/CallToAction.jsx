import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { ADDRESS, PHONE, PHONE_LINK, WHATSAPP_LINK, MAPS_LINK, DISPLAY_CENTRE, GODOWN, MOBILE } from "../data/services";
import { RevealUp } from "./ui";

export function CallToAction({ title, desc, buttonText, buttonHref }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-charcoal">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-espresso to-charcoal" />
      <RevealUp className="relative max-w-7xl mx-auto px-5 md:px-8 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold font-medium mb-4">
          Ready to transform your space?
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-cream mb-6 leading-tight">{title}</h2>
        <p className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={buttonHref || "/contact"}
            className="inline-flex items-center gap-2.5 bg-gold text-charcoal px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white transition-colors shadow-lg shadow-gold/25"
          >
            {buttonText || "Get Consultation"}
            <ArrowRight size={16} />
          </Link>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white/70 bg-white/5 hover:bg-white hover:text-charcoal text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide backdrop-blur-md transition-all"
          >
            <Phone size={16} /> Call Now
          </a>
        </div>
      </RevealUp>
    </section>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return;
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) return;

    // No enquiry API is configured — hand the enquiry to the studio's real
    // email address so the button always performs a genuine action.
    const subject = encodeURIComponent(`Website enquiry — ${form.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nEmail: ${form.email.trim() || "-"}\n\n${form.message.trim()}`
    );
    window.location.href = `mailto:contact@ananyadesigns.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-charcoal rounded-3xl p-8 text-cream h-full flex flex-col gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Ananya</p>
              <a href={PHONE_LINK} className="font-serif text-xl text-cream mt-2 block hover:text-gold transition-colors">{PHONE}</a>
              <p className="flex items-start gap-2 text-sm text-cream/70 mt-4 leading-relaxed"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{ADDRESS}</p>
              <p className="flex items-center gap-2 text-sm text-cream/70 mt-3"><Clock size={15} className="text-gold" /> Open 24 Hours, all days</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-auto">
              <a href={PHONE_LINK} className="flex flex-col items-center gap-1.5 rounded-xl bg-gold text-charcoal py-4 text-xs font-medium hover:bg-cream transition-colors"><Phone size={17} /> Call Now</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 py-4 text-xs hover:bg-white/20 transition-colors"><span className="text-xl">💬</span> WhatsApp</a>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 py-4 text-xs hover:bg-white/20 transition-colors"><MapPin size={17} /> Directions</a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-charcoal rounded-3xl p-8 text-cream h-full">
            <h3 className="font-serif text-2xl mb-6">Office Locations</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0"><MapPin size={16} /></div>
                <div>
                  <h4 className="font-serif text-lg text-cream mb-1">Head Office</h4>
                  <p className="text-sm text-cream/70 leading-relaxed">{ADDRESS}</p>
                  <p className="text-sm text-cream/70 mt-1">{PHONE}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0"><MapPin size={16} /></div>
                <div>
                  <h4 className="font-serif text-lg text-cream mb-1">Display Centre - Ananya</h4>
                  <p className="text-sm text-cream/70 leading-relaxed">{DISPLAY_CENTRE}</p>
                  <p className="text-sm text-cream/70 mt-1">+91 562 4031200, +91 7351400069 / 79</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0"><MapPin size={16} /></div>
                <div>
                  <h4 className="font-serif text-lg text-cream mb-1">Godown</h4>
                  <p className="text-sm text-cream/70 leading-relaxed">{GODOWN}</p>
                  <p className="text-sm text-cream/70 mt-1">Mobile: {MOBILE}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-card border border-charcoal/5">
            <h3 className="font-serif text-2xl text-charcoal mb-6">Send Enquiry</h3>
            <form className="space-y-4" onSubmit={submit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-coffee mb-1.5">Name *</label>
                  <input required value={form.name} onChange={set("name")} type="text" placeholder="Your full name" className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-coffee mb-1.5">Phone *</label>
                  <input required value={form.phone} onChange={set("phone")} type="tel" placeholder="+91 XXXXX XXXX" className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:border-gold transition-colors" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs tracking-wider uppercase text-coffee mb-1.5">Email</label>
                <input value={form.email} onChange={set("email")} type="email" placeholder="you@email.com" className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:border-gold transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs tracking-wider uppercase text-coffee mb-1.5">Message *</label>
                <textarea required value={form.message} onChange={set("message")} rows={4} placeholder="Tell us about your project…" className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl px-4 py-3 text-sm focus:border-gold transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-charcoal text-cream px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-espresso transition-colors">
                Send Enquiry
              </button>
              {sent && (
                <p className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                  <CheckCircle2 size={16} /> Your email draft is ready — send it to complete the enquiry.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
