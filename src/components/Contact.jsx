
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Navigation,
  CheckCircle2,
  X,
  Send,
  UserRound,
  Mail,
  PenLine,
  ChevronDown,
  Sofa,
  CookingPot,
  BedDouble,
  BriefcaseBusiness,
  ClipboardList,
} from "lucide-react";

import {
  ADDRESS,
  IMAGES,
  MAPS_LINK,
  PHONE,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "../data/services";

import {
  Reveal,
  RevealLeft,
  RevealRight,
  StaggerContainer,
  StaggerItem,
} from "./ui";

const EASE = [0.22, 1, 0.36, 1];

// Project Types
const projectTypes = [
  "Home Interior",
  "Modular Kitchen",
  "Bedroom",
  "Living Room",
  "Office Interior",
  "Commercial Interior",
  "Office",
  "School",
  "Hospital",
  "Factory",
  "Hotel/Resturant",
  "Government Contractor",
  "OME",
  "Builder",
  "Gem",
  "Other",
];

// Project Requirements / Timeline
const projectRequirements = [
  "Immediate",
  "Within 15 Days",
  "3 Months",
  "6 Months",
];

// User Roles
const roles = [
  "Homeowner",
  "Interior Designer",
  "Architect",
  "Builder",
  "Contractor",
  "Other",
];

// Quick Services
const fastServices = [
  { label: "Home Interior", icon: Sofa },
  { label: "Modular Kitchen", icon: CookingPot },
  { label: "Bedroom", icon: BedDouble },
  { label: "Office Interior", icon: BriefcaseBusiness },
];

// Reusable Field Component
function Field({
  id,
  label,
  required = false,
  icon: Icon,
  iconClass = "",
  className = "",
  children,
}) {
  return (
    <StaggerItem className={className}>
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-[0.16em] text-coffee"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-champagne">*</span>
        )}
      </label>

      <div className="relative mt-1.5">
        {Icon && (
          <Icon
            size={16}
            aria-hidden="true"
            className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-champagne/80 ${iconClass}`}
          />
        )}

        {children}
      </div>
    </StaggerItem>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Home Interior",
    role: "",
    city: "",
    area: "",
    pincode: "",
    requirements: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Handle Input Changes
  const set = (k) => (e) => {
    setForm((prev) => ({
      ...prev,
      [k]: e.target.value,
    }));

    setError("");
  };

  // Handle Pincode
  const handlePincode = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setForm((prev) => ({
      ...prev,
      pincode: value,
    }));

    setError("");
  };

  // Form Submit
  const submit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.role ||
      !form.city.trim() ||
      !form.area.trim() ||
      !form.pincode ||
      !form.requirements ||
      !form.message.trim()
    ) {
      setError(
        "Please fill all required fields including City, Area, Pincode and Project Requirements."
      );
      return;
    }

    // Phone Validation
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Indian Pincode Validation
    if (!/^[1-9][0-9]{5}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    setError("");
    setSent(true);
  };

  // Quick service cards pre-fill the enquiry form and jump to the project type.
  const selectService = (label) => {
    setForm((prev) => ({ ...prev, type: label }));
    setError("");
    const field = document.getElementById("enquiry-type");
    field?.scrollIntoView({ behavior: "smooth", block: "center" });
    field?.focus({ preventScroll: true });
  };

  // Reset Form
  const resetForm = () => {
    setSent(false);

    setForm({
      name: "",
      phone: "",
      email: "",
      type: "Home Interior",
      role: "",
      city: "",
      area: "",
      pincode: "",
      requirements: "",
      message: "",
    });

    setError("");
  };

  // Input Styling
  const inputCls =
    "w-full rounded-xl border border-champagne/35 bg-white py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-stonewarm transition-all duration-300 hover:border-champagne/60 focus:border-champagne focus:ring-2 focus:ring-champagne/15";

  const selectCls = `${inputCls} appearance-none pr-10 cursor-pointer`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ivory py-20 md:py-24"
    >
      {/* Background Decorations */}
      <div className="soft-leaf-shadow pointer-events-none absolute -right-32 -top-24 h-[440px] w-[440px] rotate-[20deg]" />

      <div className="soft-leaf-shadow pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] -rotate-[35deg] opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <RevealLeft className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-champagne/70 sm:w-14" />

            <span className="eyebrow-label whitespace-nowrap">
              Get In Touch
            </span>

            <span className="h-px w-8 bg-champagne/70 sm:w-14" />
          </RevealLeft>

          <Reveal className="mt-4">
            <h2 className="font-serif text-[32px] leading-[1.12] text-espressodeep sm:text-[40px] md:text-[46px]">
              Let&rsquo;s Create{" "}
              <em className="italic text-champagne">
                Your Space
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-[15px] leading-relaxed text-coffee">
              Tell us about your project — we usually respond within a few hours.
            </p>
          </Reveal>
        </div>

        {/* Service Quick Links */}
        <StaggerContainer
          className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-brownrich/10 bg-white/50 md:grid-cols-4 md:divide-x md:divide-brownrich/10"
          stagger={0.09}
        >
          {fastServices.map(({ label, icon: Icon }) => (
            <StaggerItem
              key={label}
              className="border-b border-brownrich/10 last:border-b-0 md:border-b-0"
            >
              <button
                type="button"
                onClick={() => selectService(label)}
                aria-pressed={form.type === label}
                className={`group flex w-full items-center justify-center gap-3 px-4 py-5 transition-colors hover:bg-champagne/10 ${
                  form.type === label ? "bg-champagne/15" : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne transition-colors group-hover:bg-champagne group-hover:text-espressodeep">
                  <Icon size={19} strokeWidth={1.6} />
                </span>

                <span className="font-serif text-[15px] text-brownrich">
                  {label}
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Contact Card + Enquiry Form */}
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-5">

          {/* Contact Information */}
          <RevealLeft
            className="lg:col-span-2"
            delay={0.05}
            distance={52}
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2c211a] via-espressodeep to-brownrich p-8 text-cream shadow-[0_30px_70px_-32px_rgba(33,25,20,0.85)] ring-1 ring-champagne/15 md:p-9"
            >
              <div
                aria-hidden="true"
                className="wood-slats pointer-events-none absolute inset-0 opacity-70"
              />

              <img
                src={IMAGES.texture}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute bottom-0 right-0 h-3/4 w-3/4 object-cover opacity-[0.22] mix-blend-luminosity [mask-image:linear-gradient(to_left,#000,transparent)]"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espressodeep/90 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-champagne" />

                  <span className="text-[11px] font-medium uppercase tracking-[0.38em] text-champagne">
                    Ananya
                  </span>
                </div>

                <a
                  href={PHONE_LINK}
                  className="mt-5 block font-serif text-[21px] leading-snug text-cream transition-colors hover:text-champagne sm:text-[23px]"
                >
                  {PHONE}
                </a>

                <div className="mt-6 flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                    <MapPin size={16} />
                  </span>

                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm leading-relaxed text-cream/75 transition-colors hover:text-champagne hover:underline"
                  >
                    {ADDRESS}
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-champagne/30 bg-champagne/10 text-champagne">
                    <Clock size={16} />
                  </span>

                  <p className="text-sm text-cream/75">
                    Open 24 Hours, all days
                  </p>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="relative z-10 mt-auto grid grid-cols-3 gap-2.5 pt-9">
                <motion.a
                  href={PHONE_LINK}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-champagne py-4 text-xs font-medium text-espressodeep shadow-[0_12px_28px_-14px_rgba(196,154,90,0.9)] transition-colors hover:bg-[#d9b274]"
                >
                  <Phone size={17} />
                  Call Now
                </motion.a>

                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 py-4 text-xs text-cream transition-colors hover:border-champagne/50 hover:bg-white/15"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </motion.a>

                <motion.a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 py-4 text-xs text-cream transition-colors hover:border-champagne/50 hover:bg-white/15"
                >
                  <Navigation size={17} />
                  Directions
                </motion.a>
              </div>
            </motion.div>
          </RevealLeft>

          {/* Enquiry Form */}
          <RevealRight
            className="lg:col-span-3"
            delay={0.1}
            distance={52}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative h-full overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_24px_70px_-30px_rgba(73,48,32,0.45)] ring-1 ring-brownrich/5 md:p-9"
            >
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-tl from-champagne/20 via-champagne/5 to-transparent blur-xl" />

              <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-36 rounded-tl-[100%] border-l border-t border-champagne/25 bg-champagne/10" />

              <form onSubmit={submit} className="relative z-10">
                <StaggerContainer
                  className="grid gap-x-4 gap-y-5 sm:grid-cols-2"
                  stagger={0.06}
                >

                  {/* Name */}
                  <Field
                    id="enquiry-name"
                    label="Name"
                    required
                    icon={UserRound}
                  >
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </Field>

                  {/* Phone */}
                  <Field
                    id="enquiry-phone"
                    label="Phone"
                    required
                    icon={Phone}
                  >
                    <input
                      id="enquiry-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="98XXX XXXXX"
                      className={inputCls}
                    />
                  </Field>

                  {/* Email */}
                  <Field
                    id="enquiry-email"
                    label="Email"
                    icon={Mail}
                  >
                    <input
                      id="enquiry-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                      className={inputCls}
                    />
                  </Field>

                  {/* Project Type Dropdown */}
                  <Field
                    id="enquiry-type"
                    label="Project Type"
                    icon={Sofa}
                  >
                    <select
                      id="enquiry-type"
                      value={form.type}
                      onChange={set("type")}
                      className={selectCls}
                    >
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-champagne"
                    />
                  </Field>

                  {/* You Are Dropdown */}
                  <Field
                    id="enquiry-role"
                    label="You Are"
                    required
                    icon={UserRound}
                  >
                    <select
                      id="enquiry-role"
                      required
                      value={form.role}
                      onChange={set("role")}
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select your profession
                      </option>

                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-champagne"
                    />
                  </Field>

                  {/* Site Location - City, Area, Pincode */}
                  <StaggerItem className="sm:col-span-2">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-coffee">
                      Site Location
                      <span className="ml-0.5 text-champagne">*</span>
                    </label>

                    <div className="mt-1.5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                      {/* City */}
                      <div className="relative">
                        <MapPin
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-champagne/80"
                        />

                        <input
                          id="enquiry-city"
                          type="text"
                          required
                          value={form.city}
                          onChange={set("city")}
                          placeholder="Enter City"
                          aria-label="Site city"
                          className={inputCls}
                        />
                      </div>

                      {/* Area / Locality */}
                      <div className="relative">
                        <Navigation
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-champagne/80"
                        />

                        <input
                          id="enquiry-area"
                          type="text"
                          required
                          value={form.area}
                          onChange={set("area")}
                          placeholder="Area / Locality"
                          aria-label="Site area or locality"
                          className={inputCls}
                        />
                      </div>

                      {/* Pincode */}
                      <div className="relative">
                        <MapPin
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-champagne/80"
                        />

                        <input
                          id="enquiry-pincode"
                          type="text"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={6}
                          required
                          value={form.pincode}
                          onChange={handlePincode}
                          placeholder="6-digit Pincode"
                          aria-label="Site pincode"
                          className={inputCls}
                        />
                      </div>

                    </div>
                  </StaggerItem>

                  {/* Project Requirements Dropdown */}
                  <Field
                    id="enquiry-requirements"
                    label="Project Requirements"
                    required
                    icon={ClipboardList}
                  >
                    <select
                      id="enquiry-requirements"
                      required
                      value={form.requirements}
                      onChange={set("requirements")}
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select project timeline
                      </option>

                      {projectRequirements.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-champagne"
                    />
                  </Field>

                  {/* Message */}
                  <Field
                    id="enquiry-message"
                    label="Message"
                    required
                    icon={PenLine}
                    iconClass="!top-4 !translate-y-0"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="enquiry-message"
                      required
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      placeholder="Tell us about your space, size and what you dream of…"
                      className={`${inputCls} min-h-[112px] resize-none pt-3.5`}
                    />
                  </Field>

                </StaggerContainer>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-espressodeep px-8 py-3.5 text-sm tracking-wide text-cream shadow-[0_14px_32px_-16px_rgba(33,25,20,0.9)] transition-all duration-300 hover:scale-[1.02] hover:bg-brownrich active:scale-[0.98]"
                >
                  Send Enquiry
                  <Send size={15} />
                </button>
              </form>
            </motion.div>
          </RevealRight>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {sent && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-espressodeep/70 backdrop-blur-sm"
              onClick={() => setSent(false)}
            />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              role="dialog"
              aria-modal="true"
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-cream p-8 text-center shadow-lift"
            >
              <button
                onClick={() => setSent(false)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-brownrich/10 bg-white transition-colors hover:text-champagne"
              >
                <X size={16} />
              </button>

              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={30} />
              </span>

              <h3 className="mt-5 font-serif text-[26px] text-espressodeep">
                Thank you, {form.name.split(" ")[0] || "friend"}!
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-coffee">
                Your enquiry has been noted. Our Agra studio will call you
                shortly on <strong>{form.phone}</strong>.
              </p>

              {/* Enquiry Summary */}
              <div className="mt-5 rounded-xl bg-white/70 p-4 text-left text-sm text-coffee">
                <p>
                  <strong>Project Type:</strong> {form.type}
                </p>

                <p className="mt-2">
                  <strong>Profession:</strong> {form.role}
                </p>

                <p className="mt-2">
                  <strong>City:</strong> {form.city}
                </p>

                <p className="mt-2">
                  <strong>Area:</strong> {form.area}
                </p>

                <p className="mt-2">
                  <strong>Pincode:</strong> {form.pincode}
                </p>

                <p className="mt-2">
                  <strong>Project Timeline:</strong> {form.requirements}
                </p>

                <p className="mt-2">
                  <strong>Message:</strong> {form.message}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-espressodeep px-6 py-3 text-sm text-cream transition-colors hover:bg-brownrich"
                >
                  Chat on WhatsApp
                </a>

                <button
                  onClick={resetForm}
                  className="rounded-full border border-brownrich/20 px-6 py-3 text-sm text-coffee transition-colors hover:border-champagne hover:text-espressodeep"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
