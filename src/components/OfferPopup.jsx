import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, X } from "lucide-react";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1400&auto=format&fit=crop";

const COUNTRIES = [
  { code: "IN", dial: "+91" },
  { code: "AE", dial: "+971" },
  { code: "US", dial: "+1" },
];

const fieldCls =
  "w-full rounded-[10px] border border-[#D7D5D2] bg-white px-4 py-3 text-[14px] text-charcoal placeholder:text-[#A5A09A] outline-none transition-colors focus:border-[#E23A32]";

function OfferForm({ onClose }) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [form, setForm] = useState({ name: "", mobile: "", pincode: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const mobile = form.mobile.replace(/[\s-]/g, "").replace(/^0+/, "");
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^\d{8,12}$/.test(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="px-5 pb-5 pt-5">
      {submitted ? (
        <div className="py-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 size={28} />
          </span>
          <h3 className="mt-4 text-[20px] font-bold text-charcoal">Offer unlocked!</h3>
          <p className="mx-auto mt-2 max-w-[290px] text-[13px] leading-relaxed text-[#6A625B]">
            Thanks, {form.name.trim().split(" ")[0]}! Our team will call you on {country.dial} {form.mobile} with your 20% off code.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-[8px] bg-[#F4212A] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D81B23]"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-[19px] font-bold leading-tight text-[#191716]">
            Fill details to unlock the offer
          </h3>

          <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              aria-label="Enter your name"
              className={fieldCls}
            />

            <div className="flex overflow-hidden rounded-[10px] border border-[#D7D5D2] bg-white focus-within:border-[#E23A32]">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setCountryOpen((value) => !value)}
                  aria-label="Select country code"
                  className="flex h-full items-center gap-1.5 border-r border-[#E2E0DD] px-3 text-[13px] text-charcoal"
                >
                  {country.code} {country.dial}
                  <ChevronDown size={13} className="text-[#8A837B]" />
                </button>
                {countryOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1 w-32 overflow-hidden rounded-lg border border-[#E2E0DD] bg-white shadow-lg">
                    {COUNTRIES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountry(item);
                          setCountryOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-beige/60"
                      >
                        {item.code} {item.dial}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={form.mobile}
                onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
                placeholder="Enter Mobile No."
                aria-label="Enter Mobile No."
                className="min-w-0 flex-1 border-0 px-3 py-3 text-[14px] text-charcoal placeholder:text-[#A5A09A] outline-none"
              />
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={form.pincode}
              onChange={(e) => setForm((prev) => ({ ...prev, pincode: e.target.value }))}
              placeholder="Enter Pincode"
              aria-label="Enter Pincode"
              className={fieldCls}
            />

            {error && <p className="text-[12px] text-[#D93025]">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-[8px] bg-[#F4212A] py-3.5 text-[14px] font-semibold tracking-wide text-white transition-colors hover:bg-[#D81B23]"
            >
              Submit
            </button>
          </form>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-[#6A625B]">
            By continuing, I agree to the Ananya Interior{" "}
            <Link to="/contact" className="text-[#E23A32] hover:underline">
              Terms of Use &amp; Privacy Policy
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default function OfferPopup() {
  const { pathname } = useLocation();
  // A fresh id each time it opens remounts <OfferForm>, so the fields reset.
  const [shown, setShown] = useState(null);
  const open = Boolean(shown && shown.pathname === pathname);

  useEffect(() => {
    const timer = window.setTimeout(() => setShown({ pathname, id: Date.now() }), 5000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setShown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#141110]/70 p-4 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setShown(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Diwali makeover offer"
        >
          <motion.div
            className="relative w-full max-w-[430px]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShown(null)}
              aria-label="Close offer"
              className="absolute -right-3 -top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white text-[#2A2522] shadow-lg transition-transform hover:scale-105"
            >
              <X size={19} strokeWidth={2.2} />
            </button>

            <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
              {/* Promotional banner */}
              <div
                className="relative h-[150px] bg-cover bg-center sm:h-[168px]"
                style={{ backgroundImage: `url("${BANNER_IMAGE}")` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFF7EF]/95 via-[#FFF7EF]/55 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-center px-5">
                  <p className="font-serif text-[13px] tracking-[0.22em] text-[#7A3A2A]">DIWALI</p>
                  <p className="font-serif text-[24px] italic leading-none text-[#5B2E20] sm:text-[28px]">Makeover</p>
                  <p className="font-serif text-[16px] font-semibold leading-none tracking-[0.18em] text-[#5B2E20]">SALE</p>
                  <p className="mt-2 text-[17px] font-bold leading-tight text-[#E23A32] sm:text-[19px]">
                    Flat 20% off*
                  </p>
                  <p className="text-[10px] text-[#6B5347]">on modular interiors</p>
                  <p className="mt-1 text-[8px] text-[#8A7568]">*T&amp;C apply. Visit us for more details</p>
                </div>
                <p className="absolute bottom-2 right-3 text-[9px] font-semibold tracking-[0.12em] text-white drop-shadow">
                  ANANYA INTERIOR
                </p>
              </div>

              <OfferForm key={shown.id} onClose={() => setShown(null)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
