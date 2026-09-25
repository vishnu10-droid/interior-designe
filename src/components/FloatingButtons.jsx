import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../data/services";

export default function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
      <AnimatePresence>
        {show && (
          <motion.button key="top" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-white shadow-lift border border-charcoal/10 grid place-items-center text-charcoal hover:bg-charcoal hover:text-cream transition-colors">
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lift relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle size={24} className="relative" />
      </motion.a>
    </div>
  );
}
