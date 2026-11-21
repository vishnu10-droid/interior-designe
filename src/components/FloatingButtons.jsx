
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Phone,
  Send,
  CheckCircle2,
  ArrowRight,
  UserRound,
} from "lucide-react";

import { PHONE_LINK, WHATSAPP_LINK } from "../data/services";
import { DetailModal } from "./ui";

function WhatsAppIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.786h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const emptyForm = {
  name: "",
  contact: "",
  role: "Interior Designer",
};

const inputCls =
  "w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-stonewarm transition-shadow";

export default function FloatingButtons() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.contact.trim()) {
      setError("Please enter your name and contact number.");
      return;
    }

    if (!/^[0-9+\s-]{8,15}$/.test(form.contact.trim())) {
      setError("Please enter a valid contact number.");
      return;
    }

    setError("");
    setSent(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSent(false);
    setForm(emptyForm);
    setError("");
  };

  return (
    <>
      {/* Left Corner - Red Are You Button */}

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.9,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 md:bottom-24 left-5 z-40 flex items-center gap-2.5 rounded-full bg-red-600 px-5 py-3 text-white shadow-xl backdrop-blur-md transition-colors hover:bg-red-700 sm:px-7"
      >
        <UserRound size={19} strokeWidth={2.5} />

        <span className="whitespace-nowrap font-serif text-sm tracking-wide sm:text-base">
          Are you
        </span>
      </motion.button>

      {/* Quick Enquiry Modal */}

      <DetailModal open={open} onClose={closeModal} label="Quick enquiry">
        {sent ? (
          <div className="px-7 py-12 text-center md:px-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 size={30} />
            </span>

            <h3 className="mt-5 font-serif text-2xl text-charcoal">
              Thank you, {form.name.trim().split(" ")[0] || "friend"}!
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-coffee">
              You're enquiring as an <strong>{form.role}</strong>. Our Agra
              studio will reach you on <strong>{form.contact}</strong> shortly.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm text-cream transition-colors hover:bg-espresso"
              >
                Chat on WhatsApp <ArrowRight size={15} />
              </a>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-charcoal/20 px-6 py-3 text-sm text-charcoal transition-colors hover:bg-beige"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-8 pr-14 md:px-9 md:py-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-golddark">
              Quick Enquiry
            </p>

            <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">
              Are you looking for{" "}
              <em className="italic text-golddark">
                interior design?
              </em>
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-coffee">
              Tell us who you are — we'll get in touch with the right design
              guidance.
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              {/* Name */}

              <div>
                <label
                  className="text-xs uppercase tracking-wider text-coffee"
                  htmlFor="quick-name"
                >
                  Name *
                </label>

                <input
                  id="quick-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              {/* Contact */}

              <div>
                <label
                  className="text-xs uppercase tracking-wider text-coffee"
                  htmlFor="quick-contact"
                >
                  Contact *
                </label>

                <input
                  id="quick-contact"
                  required
                  value={form.contact}
                  onChange={set("contact")}
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone / WhatsApp number"
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              {/* Profession */}

              <div>
                <label
                  className="text-xs uppercase tracking-wider text-coffee"
                  htmlFor="quick-role"
                >
                  I am a
                </label>

                <select
                  id="quick-role"
                  value={form.role}
                  onChange={set("role")}
                  className={`${inputCls} mt-1.5`}
                >
                  <option>Interior Designer</option>
                  <option>Architect</option>
                  <option>Builder</option>
                  <option>Contractor</option>
                </select>
              </div>

              {/* Error */}

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              {/* Submit */}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm tracking-wide text-cream transition-colors hover:bg-espresso"
              >
                Submit Enquiry <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </DetailModal>

      {/* Right Side Floating Buttons */}

      <div className="fixed bottom-20 md:bottom-24 right-5 z-40 flex flex-col gap-3 items-end">
        <AnimatePresence>
          {show && (
            <motion.button
              key="top"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-white shadow-lift border border-charcoal/10 grid place-items-center text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
            >
              <ArrowUp size={17} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Call Button */}

        <motion.a
          href={PHONE_LINK}
          aria-label="Call us"
          title="Call us"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-charcoal text-gold grid place-items-center shadow-lift border border-gold/30"
        >
          <Phone size={23} />
        </motion.a>

        {/* WhatsApp Button */}

        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lift relative"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

          <WhatsAppIcon size={26} className="relative" />
        </motion.a>
      </div>
    </>
  );
}
