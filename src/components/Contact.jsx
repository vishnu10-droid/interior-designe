import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Star, Navigation, CheckCircle2, X, Send } from "lucide-react";
import { ADDRESS, MAPS_LINK, PHONE, PHONE_LINK, WHATSAPP_LINK } from "../data/services";
import { Reveal, SectionHeading } from "./ui";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "Home Interior", budget: "₹2–5 Lakh", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please fill your name, phone and a short message.");
      return;
    }
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    setSent(true);
  };

  const inputCls = "w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm placeholder:text-stonewarm transition-shadow";

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading eyebrow="Get In Touch" title="Let's Create Your Space" desc="Tell us about your project — we usually respond within a few hours." />
      <div className="grid lg:grid-cols-5 gap-6 mt-12">
        <Reveal className="lg:col-span-2">
          <div className="bg-charcoal rounded-3xl p-8 text-cream h-full flex flex-col gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold">AF Interior</p>
              <p className="flex items-center gap-2 mt-3 text-sm"><Star size={15} className="text-gold" fill="currentColor" /> 4.9 rated • 254+ reviews</p>
              <a href={PHONE_LINK} className="font-serif text-3xl mt-2 block hover:text-gold transition-colors">{PHONE}</a>
              <p className="flex items-start gap-2 text-sm text-cream/70 mt-4 leading-relaxed"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{ADDRESS}</p>
              <p className="flex items-center gap-2 text-sm text-cream/70 mt-3"><Clock size={15} className="text-gold" /> Open 24 Hours, all days</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-auto">
              <a href={PHONE_LINK} className="flex flex-col items-center gap-1.5 rounded-xl bg-gold text-charcoal py-4 text-xs font-medium hover:bg-cream transition-colors"><Phone size={17} /> Call Now</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 py-4 text-xs hover:bg-white/20 transition-colors"><MessageCircle size={17} /> WhatsApp</a>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 py-4 text-xs hover:bg-white/20 transition-colors"><Navigation size={17} /> Directions</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <form onSubmit={submit} className="bg-white rounded-3xl p-7 md:p-9 shadow-card border border-charcoal/5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-xs tracking-wider uppercase text-coffee">Name *</label><input value={form.name} onChange={set("name")} placeholder="Your full name" className={`${inputCls} mt-1.5`} /></div>
              <div><label className="text-xs tracking-wider uppercase text-coffee">Phone *</label><input value={form.phone} onChange={set("phone")} placeholder="98XXX XXXXX" className={`${inputCls} mt-1.5`} /></div>
              <div><label className="text-xs tracking-wider uppercase text-coffee">Email</label><input value={form.email} onChange={set("email")} type="email" placeholder="you@email.com" className={`${inputCls} mt-1.5`} /></div>
              <div><label className="text-xs tracking-wider uppercase text-coffee">Project Type</label>
                <select value={form.type} onChange={set("type")} className={`${inputCls} mt-1.5`}>
                  {["Home Interior", "Modular Kitchen", "Bedroom", "Living Room", "Office", "Commercial", "Renovation", "Other"].map((t) => <option key={t}>{t}</option>)}
                </select></div>
              <div className="sm:col-span-2"><label className="text-xs tracking-wider uppercase text-coffee">Budget</label>
                <select value={form.budget} onChange={set("budget")} className={`${inputCls} mt-1.5`}>
                  {["Under ₹1 Lakh", "₹1–2 Lakh", "₹2–5 Lakh", "₹5–8 Lakh", "₹8 Lakh+"].map((b) => <option key={b}>{b}</option>)}
                </select></div>
              <div className="sm:col-span-2"><label className="text-xs tracking-wider uppercase text-coffee">Message *</label>
                <textarea value={form.message} onChange={set("message")} rows={4} placeholder="Tell us about your space, size and what you dream of…" className={`${inputCls} mt-1.5 resize-none`} /></div>
            </div>
            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-4">{error}</p>}
            <button type="submit" className="mt-6 inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-espresso transition-colors">
              Send Enquiry <Send size={15} />
            </button>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setSent(false)} />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }}
              className="relative bg-cream rounded-3xl p-10 max-w-md w-full text-center shadow-lift">
              <button onClick={() => setSent(false)} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-charcoal/10 grid place-items-center"><X size={16} /></button>
              <span className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-700 grid place-items-center"><CheckCircle2 size={30} /></span>
              <h3 className="font-serif text-2xl mt-5">Thank you, {form.name.split(" ")[0] || "friend"}!</h3>
              <p className="text-sm text-coffee mt-2 leading-relaxed">Your enquiry has been noted. Our Agra studio will call you shortly on <strong>{form.phone}</strong>.</p>
              <div className="flex gap-2.5 justify-center mt-6">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-charcoal text-cream text-sm">Chat on WhatsApp</a>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", type: "Home Interior", budget: "₹2–5 Lakh", message: "" }); }} className="px-6 py-3 rounded-full border border-charcoal/20 text-sm">Done</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
