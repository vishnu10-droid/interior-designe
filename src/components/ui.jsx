import { useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Shared motion tokens                                                       */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 0.75;
const STAGGER = 0.1;
const DISTANCE = 44;

// One media-query listener shared by every reveal on the page.
let mobileListeners = new Set();
const mobileQuery = typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)") : null;
let mobileValue = mobileQuery ? mobileQuery.matches : false;
if (mobileQuery) {
  mobileQuery.addEventListener("change", (event) => {
    mobileValue = event.matches;
    mobileListeners.forEach((listener) => listener(mobileValue));
  });
}

function subscribeMobile(listener) {
  mobileListeners.add(listener);
  return () => mobileListeners.delete(listener);
}
function getMobileSnapshot() {
  return mobileValue;
}

/** Mobile = below Tailwind's md breakpoint. Used to soften movement/parallax. */
export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileSnapshot);
}

function useViewportMotion() {
  return { reduceMotion: useReducedMotion(), isMobile: useIsMobile() };
}

function getVariants(direction, distance, scale, isMobile) {
  const travel = isMobile ? Math.min(distance, 22) : distance;
  const hidden = { opacity: 0, scale: isMobile ? 1 : scale };
  if (direction === "left") hidden.x = -travel;
  else if (direction === "right") hidden.x = travel;
  else if (direction === "down") hidden.y = -travel;
  else hidden.y = travel; // "up"
  return { hidden, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
}

function MotionTag({ as = "div", ...props }) {
  const Tag = motion[as] || motion.div;
  return <Tag {...props} />;
}

/* -------------------------------------------------------------------------- */
/*  Reusable reveal components                                                 */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION,
  distance = DISTANCE,
  scale = 1,
  className = "",
  as = "div",
  once = true,
  amount = 0.15,
}) {
  const { reduceMotion, isMobile } = useViewportMotion();
  return (
    <MotionTag
      as={as}
      className={className}
      variants={getVariants(direction, distance, scale, isMobile)}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export const RevealLeft = (props) => <Reveal direction="left" {...props} />;
export const RevealRight = (props) => <Reveal direction="right" {...props} />;
export const RevealUp = (props) => <Reveal direction="up" {...props} />;

export function RevealZoom({ children, scale = 0.92, distance = 20, ...props }) {
  return (
    <Reveal direction="up" scale={scale} distance={distance} {...props}>
      {children}
    </Reveal>
  );
}

/** Parent that orchestrates children entrance one after another. */
export function StaggerContainer({
  children,
  className = "",
  stagger = STAGGER,
  delayChildren = 0,
  as = "div",
  amount = 0.12,
  once = true,
  // Lists whose children change at runtime (filters, sorting, pagination)
  // must animate on mount/update. With whileInView, a container that is
  // taller than the viewport never reaches the `amount` threshold, and
  // children swapped in after the first reveal stay stuck at opacity 0.
  inView = true,
}) {
  const { reduceMotion } = useViewportMotion();
  const revealProps = inView
    ? { whileInView: reduceMotion ? undefined : "visible", viewport: { once, amount } }
    : { animate: reduceMotion ? undefined : "visible" };
  return (
    <MotionTag
      as={as}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      {...revealProps}
      variants={{
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of StaggerContainer — direction is inherited, timing is parent-driven. */
export function StaggerItem({
  children,
  direction = "up",
  distance = DISTANCE,
  scale = 1,
  className = "",
  as = "div",
}) {
  const { isMobile } = useViewportMotion();
  return (
    <MotionTag
      as={as}
      className={className}
      variants={getVariants(direction, distance, scale, isMobile)}
      transition={{ duration: DURATION, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Scroll-linked image drift. Disabled on mobile and for reduced motion. */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  strength = 8,
  style,
  ...rest
}) {
  const { reduceMotion, isMobile } = useViewportMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amount = reduceMotion || isMobile ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y }} className={imgClassName} />
    </div>
  );
}

/** Clip-style text reveal — the line slides up into place inside its own box. */
export function TextReveal({ children, className = "", delay = 0, duration = 0.85, as = "span" }) {
  const { reduceMotion } = useViewportMotion();
  return (
    <motion.span
      className={`inline-block overflow-hidden align-top ${className}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <MotionTag
        as={as}
        className="inline-block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE },
          },
        }}
      >
        {children}
      </MotionTag>
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading — eyebrows / titles / copy enter from alternating sides    */
/* -------------------------------------------------------------------------- */

const headingDirections = new Map();
let headingCount = 0;
function headingDirection(key) {
  if (!headingDirections.has(key)) {
    headingDirections.set(key, headingCount % 2 === 0 ? "left" : "right");
    headingCount += 1;
  }
  return headingDirections.get(key);
}

export function SectionHeading({ eyebrow, title, desc, center = true, light = false, direction }) {
  const dir = direction || headingDirection(`${eyebrow || ""}-${title || ""}`);
  const item = { direction: dir, scale: 1 };

  return (
    <StaggerContainer className={`${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      <StaggerItem {...item}>
        <p className="text-[11px] tracking-[0.3em] uppercase text-golddark font-medium">{eyebrow}</p>
      </StaggerItem>
      <StaggerItem {...item}>
        <h2 className={`font-serif text-3xl md:text-3xl leading-tight mt-3 ${light ? "text-cream" : "text-charcoal"}`}>{title}</h2>
      </StaggerItem>
      <StaggerItem {...item}>
        <div className={`mt-4 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
      </StaggerItem>
      {desc && (
        <StaggerItem {...item}>
          <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-cream/70" : "text-coffee"}`}>{desc}</p>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
}

export function Stars({ size = 14 }) {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );
}

/** Shared accessible modal used by project and journal detail views. */
export function DetailModal({ open, onClose, children, label = "Details" }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-cream shadow-lift"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="sticky top-4 float-right z-10 mr-4 mt-4 grid h-10 w-10 place-items-center rounded-full bg-charcoal text-cream shadow-lg transition-transform hover:scale-105"
            >
              <X size={17} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
