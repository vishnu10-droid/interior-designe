import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Handshake,
  Gem,
  LayoutGrid,
  Sparkles,
  Leaf,
  Layers,
  ShieldCheck,
  Home,
  Building2,
  Ruler,
  BadgeCheck,
  Palette,
  PackageCheck,
  CalendarDays,
  Award,
} from "lucide-react";
import { ADDRESS, MAPS_LINK, PHONE } from "../data/services";
import {
  Reveal,
  RevealLeft,
  RevealRight,
  RevealUp,
  StaggerContainer,
  StaggerItem,
} from "../components/ui";
import AboutFooter from "../components/AboutFooter";

/* Premium editorial imagery — interiors, materials and the Ananya studio. */
const IMG = {
  hero: "https://images.unsplash.com/photo-1723258341592-e76d798273bb?auto=format&fit=crop&w=2000&q=85",
  story: "https://images.unsplash.com/photo-1777895868494-4e01af8487b6?auto=format&fit=crop&w=1200&q=85",
  slats: "/images/company-profile/page-16-image-01.png",
  material: "/images/company-profile/page-09-image-01.png",
  furniture: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
  stone: "https://images.unsplash.com/photo-1785535573671-507b061d2fa8?auto=format&fit=crop&w=900&q=85",
  showroom: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
};

const EASE = [0.22, 1, 0.36, 1];

const storyFeatures = [
  { icon: Home, label: "Residential Interiors" },
  { icon: Building2, label: "Commercial Interiors" },
  { icon: Ruler, label: "Customized Trade Solutions" },
  { icon: BadgeCheck, label: "Quality-Focused Execution" },
  { icon: Palette, label: "Modern Aesthetics" },
  { icon: Clock, label: "Open 24 Hours Support" },
];

const differentiators = [
  { icon: Handshake, title: "Personalized Trade", desc: "Every plan starts from your lifestyle, not a catalogue." },
  { icon: Gem, title: "Modern Aesthetics", desc: "Timeless palettes with quiet luxury detailing." },
  { icon: LayoutGrid, title: "Functional Planning", desc: "Storage, movement and light — resolved first." },
  { icon: Sparkles, title: "Attention to Detail", desc: "Joints, edges and paint lines we obsess over." },
];

const approachPoints = [
  { icon: Leaf, title: "Curated Materials" },
  { icon: Layers, title: "Refined Finishes" },
  { icon: ShieldCheck, title: "Enduring Quality" },
];

const stats = [
  { value: 24, suffix: "+", label: "Projects Delivered", icon: PackageCheck },
  { value: 8, suffix: "", label: "Trade Services", icon: Award },
  { value: 1995, suffix: "", label: "Established", icon: CalendarDays },
];

/* ---------- Small shared pieces ---------- */

function Eyebrow({ children, center = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} ${className}`}>
      <span className="h-px w-7 shrink-0 bg-champagne" />
      <span className="eyebrow-label whitespace-nowrap">{children}</span>
      <span className="h-px w-12 shrink-0 bg-champagne/60" />
    </div>
  );
}

function GoldButton({ children, to = "/contact", className = "" }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-champagne px-7 py-3 text-[12px] font-medium tracking-wide text-walnut shadow-[0_10px_30px_-12px_rgba(196,154,90,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d3ac6f] hover:shadow-[0_16px_34px_-12px_rgba(196,154,90,0.9)] ${className}`}
    >
      {children}
      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function WalnutButton({ children, href, to, className = "" }) {
  const cls = `group inline-flex items-center gap-2.5 rounded-full bg-walnut px-7 py-3 text-[12px] font-medium tracking-wide text-ivory shadow-[0_12px_30px_-16px_rgba(43,32,26,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:shadow-[0_18px_36px_-16px_rgba(43,32,26,0.95)] ${className}`;
  const arrow = <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />;
  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}{arrow}</a>;
  }
  return <Link to={to || "/contact"} className={cls}>{children}{arrow}</Link>;
}

/* Circular "Interior & Exterior Solutions" seal on the hero. */
function BrandSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
      className="pointer-events-none absolute right-[6%] top-1/2 hidden -translate-y-1/2 place-items-center lg:grid"
    >
      <div className="relative grid h-[142px] w-[142px] place-items-center rounded-full bg-walnut/85 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-champagne/50 backdrop-blur-sm">
        <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full">
          <defs>
            <path id="sealPath" d="M70,70 m-53,0 a53,53 0 1,1 106,0 a53,53 0 1,1 -106,0" />
          </defs>
          <text fill="#C49A5A" fontSize="9" letterSpacing="3.1" fontFamily="Jost, sans-serif">
            <textPath href="#sealPath" startOffset="2%">INTERIOR &amp; EXTERIOR SOLUTIONS • ANANYA</textPath>
          </text>
        </svg>
        <div className="relative text-center">
          <span className="block font-serif text-[34px] italic leading-none text-[#EBD8B4]">AB</span>
          <span className="mt-1.5 block text-[7px] tracking-[0.32em] text-champagne">ANANYA</span>
        </div>
      </div>
    </motion.div>
  );
}

/** Count-up that starts when the statistic scrolls into view. */
function CountUp({ to, suffix = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    let frame;
    const started = performance.now();
    const duration = 1700;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/** Embedded map with a polished, always-usable fallback. */
function StudioMap() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "failed" : current));
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl border border-parchment bg-parchment shadow-[0_14px_40px_-24px_rgba(43,32,26,0.5)] lg:h-full lg:min-h-[320px]">
      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,#F8F4EE,#E9DFD0)] px-6 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne/50 bg-white text-champagne shadow-sm">
            <MapPin size={21} />
          </span>
          <p className="font-serif text-lg text-walnut">Ananya Interior</p>
          <p className="max-w-[240px] text-[11px] leading-relaxed text-muted">{ADDRESS}</p>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 rounded-full bg-walnut px-5 py-2.5 text-[11px] tracking-wide text-ivory transition-colors hover:bg-brown">
            Get Directions <ArrowRight size={13} />
          </a>
        </div>
      )}
      <iframe
        title="Ananya Interior location map"
        src="https://www.google.com/maps?q=Sanjay+Place+Civil+Lines+Agra+282002&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("failed")}
        className={`h-full w-full border-0 transition-opacity duration-700 ${status === "ready" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ---------- 1. Hero ---------- */

function Hero() {
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.85, ease: EASE } },
  };

  return (
    <section className="relative flex min-h-[470px] items-center overflow-hidden bg-walnut lg:min-h-[510px]">
      <img
        src={IMG.hero}
        alt="Warm luxury living room by Ananya Interior"
        className={`absolute inset-0 h-full w-full object-cover object-center ${reduce ? "" : "hero-zoom"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/95 via-walnut/72 to-walnut/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 via-transparent to-walnut/35" />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="relative mx-auto w-full max-w-[1180px] px-5 py-24 md:px-7 lg:py-28"
      >
        <motion.div variants={item}><Eyebrow>About Ananya</Eyebrow></motion.div>
        <motion.h1 variants={item} className="mt-7 max-w-[640px] font-serif text-[40px] leading-[1.14] text-ivory sm:text-5xl lg:text-[58px]">
          Your Space. <em className="font-normal italic">Reimagined</em>
          <br className="hidden sm:block" /> for Tomorrow.
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-[440px] text-[14px] leading-[1.85] text-ivory/75 md:text-[15px]">
          Premium interior and exterior solutions crafted with experience, design and precision.
        </motion.p>
        <motion.div variants={item} className="mt-8">
          <GoldButton to="/services">Get to Know Us</GoldButton>
        </motion.div>
      </motion.div>

      <BrandSeal />

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {[0, 1, 2, 3].map((dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Go to slide ${dot + 1}`}
            onClick={() => setSlide(dot)}
            className={`h-[5px] rounded-full transition-all duration-300 ${slide === dot ? "w-6 bg-champagne" : "w-[5px] bg-ivory/50 hover:bg-ivory/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- 2. Our Story ---------- */

function StoryImage() {
  return (
    <RevealLeft className="relative mx-auto w-full max-w-[520px] pb-10 pr-6 pt-4 sm:pb-14 sm:pr-10">
      <div className="absolute bottom-0 left-0 h-[78%] w-[84%] rounded-[28px] bg-parchment" />
      <div className="absolute right-0 top-0 h-[52%] w-[54%] rounded-[24px] border border-champagne/60" />
      <div className="relative ml-[7%] h-[340px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-28px_rgba(43,32,26,0.6)] sm:h-[410px]">
        <img src={IMG.story} alt="Ananya Interior — warm dining and living space" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105" />
      </div>
      <div className="absolute bottom-[68px] left-0 flex items-center gap-3 rounded-xl border border-champagne/40 bg-walnut/95 px-5 py-3 shadow-xl backdrop-blur sm:bottom-[86px]">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/50 text-champagne"><Sparkles size={15} /></span>
        <span className="leading-tight">
          <span className="block text-[9px] uppercase tracking-[0.24em] text-ivory/60">Since</span>
          <span className="block font-serif text-[22px] text-champagne">1995</span>
        </span>
      </div>
    </RevealLeft>
  );
}

function OurStory() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 md:py-24">
      <div className="soft-leaf-shadow pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full" />
      <div className="soft-leaf-shadow pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <StoryImage />
        <div>
          <RevealRight><Eyebrow>Our Story</Eyebrow></RevealRight>
          <RevealRight delay={0.08}>
            <h2 className="mt-6 font-serif text-[36px] leading-[1.16] text-ink sm:text-[42px] lg:text-[46px]">Spaces Traded Around You.</h2>
          </RevealRight>
          <RevealRight delay={0.14}>
            <p className="mt-5 text-[13.5px] leading-[1.9] text-muted md:text-[14px]">
              Ananya, a front-runner one-stop interior and exterior products mall, has its origin in the year 1995. A humble start-up by Mr. Vikas Bansal — M/s Bansal Wood Decor (P) Ltd. — focused on a single point: plywood, laminates, doors, veneers and other interior &amp; exterior products. Over the decades we have grown with a commitment to quality, design and customer trust.
            </p>
          </RevealRight>
          <StaggerContainer className="mt-7 grid gap-2.5 sm:grid-cols-2" stagger={0.06}>
            {storyFeatures.map(({ icon: Icon, label }) => (
              <StaggerItem key={label} direction="up">
                <div className="flex h-full items-center gap-3 rounded-lg border border-[#E7DCCD] bg-white px-4 py-3 shadow-[0_8px_24px_-18px_rgba(43,32,26,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/70 hover:shadow-[0_14px_30px_-18px_rgba(43,32,26,0.45)]">
                  <Icon size={17} strokeWidth={1.6} className="shrink-0 text-champagne" />
                  <span className="text-[12px] leading-snug text-ink sm:text-[12.5px]">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <RevealRight delay={0.2}>
            <WalnutButton to="/services" className="mt-8">Discover Our Story</WalnutButton>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Statistics ---------- */

function Statistics() {
  return (
    <section className="relative overflow-hidden bg-walnut">
      <img src={IMG.slats} alt="" aria-hidden="true" className="absolute inset-y-0 left-0 h-full w-[38%] object-cover opacity-25" />
      <div className="wood-slats absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/40 via-walnut/90 to-walnut" />
      <StaggerContainer className="relative mx-auto grid max-w-[1060px] grid-cols-3 gap-2 px-3 py-12 sm:gap-6 sm:px-6 md:py-[70px]" stagger={0.14}>
        {stats.map(({ value, suffix, label, icon: Icon }, i) => (
          <StaggerItem key={label} direction="up">
            <div className={`flex flex-col items-center text-center ${i > 0 ? "sm:border-l sm:border-champagne/25" : ""}`}>
              <Icon size={20} strokeWidth={1.35} className="text-champagne sm:h-[26px] sm:w-[26px]" />
              <p className="mt-3 font-serif text-[30px] leading-none text-[#EDDCBB] sm:mt-4 sm:text-[46px] md:text-[54px]"><CountUp to={value} suffix={suffix} /></p>
              <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.18em] text-champagne sm:mt-4 sm:text-[10px] sm:tracking-[0.32em]">{label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

/* ---------- 4. Why Choose Ananya ---------- */

function WhyChoose() {
  return (
    <section className="bg-ivory py-20 md:py-[88px]">
      <div className="mx-auto max-w-[1180px] px-5 md:px-7">
        <RevealUp>
          <Eyebrow center>The Studio Difference</Eyebrow>
          <h2 className="mt-5 text-center font-serif text-[36px] leading-tight text-ink md:text-[42px]">
            Why Choose <em className="font-normal italic text-champagne">Ananya?</em>
          </h2>
        </RevealUp>
        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {differentiators.map(({ icon: Icon, title, desc }, i) => (
            <StaggerItem key={title} direction="up">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className={`group flex h-full flex-col items-center rounded-xl border bg-[#FCFAF6] px-6 py-8 text-center shadow-[0_16px_38px_-28px_rgba(43,32,26,0.5)] transition-colors duration-300 hover:border-champagne hover:shadow-[0_22px_44px_-24px_rgba(43,32,26,0.45)] ${i === 0 ? "border-champagne" : "border-[#E7DCCD]"}`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne/35 bg-champagne/10 text-champagne transition-colors duration-300 group-hover:bg-champagne group-hover:text-white">
                  <Icon size={21} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-[20px] text-ink">{title}</h3>
                <p className="mt-3 text-[12.5px] leading-[1.75] text-muted">{desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ---------- 5. Design Philosophy ---------- */

function Philosophy() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-7 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
        <RevealLeft className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[430px]">
          <div className="absolute left-0 top-0 h-[68%] w-[62%] overflow-hidden rounded-lg shadow-[0_18px_44px_-24px_rgba(43,32,26,0.6)]">
            <img src={IMG.material} alt="Premium wood and stone material selection" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-0 top-[5%] h-[82%] w-[37%] overflow-hidden rounded-lg shadow-[0_18px_44px_-24px_rgba(43,32,26,0.6)]">
            <img src={IMG.furniture} alt="Luxury interior furniture and finishes" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-[26%] h-[30%] w-[44%] overflow-hidden rounded-lg border-[5px] border-white shadow-[0_22px_46px_-20px_rgba(43,32,26,0.65)]">
            <img src={IMG.stone} alt="Natural stone material finish" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </RevealLeft>
        <div>
          <RevealRight><Eyebrow>Our Approach</Eyebrow></RevealRight>
          <RevealRight delay={0.08}>
            <h2 className="mt-6 font-serif text-[36px] leading-[1.18] text-ink sm:text-[42px]">A Thoughtful Design Philosophy</h2>
          </RevealRight>
          <RevealRight delay={0.14}>
            <p className="mt-5 text-[13.5px] leading-[1.9] text-muted md:text-[14px]">
              Great spaces come from the right balance of materials, function and style. Our collections bring together trusted brands, refined textures and enduring quality to create spaces that feel truly yours — considered in every detail and made to last.
            </p>
          </RevealRight>
          <StaggerContainer className="mt-9 grid grid-cols-3 gap-1" stagger={0.1}>
            {approachPoints.map(({ icon: Icon, title }, i) => (
              <StaggerItem key={title} direction="up">
                <div className={`flex flex-col items-center px-2 text-center ${i > 0 ? "border-l border-[#E7DCCD]" : ""}`}>
                  <Icon size={23} strokeWidth={1.4} className="text-champagne" />
                  <p className="mt-3 font-serif text-[13px] leading-snug text-ink sm:text-[14px]">{title}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Visit Our Agra Studio ---------- */

function VisitStudio() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto grid max-w-[1180px] gap-7 px-5 md:px-7 lg:grid-cols-[0.92fr_1.08fr_1.08fr]">
        <div className="flex flex-col justify-center">
          <RevealLeft>
            <Eyebrow>Visit Us</Eyebrow>
            <h2 className="mt-6 font-serif text-[34px] leading-tight text-ink md:text-[38px]">Our Agra Studio</h2>
            <p className="mt-4 text-[13px] leading-[1.85] text-muted">Experience our wide range of interior and exterior products, materials and finishes in person.</p>
          </RevealLeft>
          <RevealLeft delay={0.1}>
            <ul className="mt-7 space-y-4">
              <li className="flex items-start gap-3"><MapPin size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-champagne" /><span className="text-[12.5px] leading-[1.7] text-muted">{ADDRESS}</span></li>
              <li className="flex items-start gap-3"><Clock size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-champagne" /><span className="text-[12.5px] leading-[1.7] text-muted">Open 24 Hours</span></li>
              <li className="flex items-start gap-3"><Phone size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-champagne" /><span className="text-[12.5px] leading-[1.7] text-muted">{PHONE}</span></li>
            </ul>
          </RevealLeft>
          <RevealLeft delay={0.16}>
            <WalnutButton href={MAPS_LINK} className="mt-8 self-start">Get Directions</WalnutButton>
          </RevealLeft>
        </div>
        <RevealUp className="h-[280px] overflow-hidden rounded-xl shadow-[0_18px_44px_-24px_rgba(43,32,26,0.6)] lg:h-auto lg:min-h-[320px]">
          <img src={IMG.showroom} alt="Ananya Interior showroom and studio in Agra" loading="lazy" className="h-full w-full object-cover" />
        </RevealUp>
        <RevealRight className="h-[300px] lg:h-auto"><StudioMap /></RevealRight>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function About() {
  return (
    <div className="overflow-x-clip bg-ivory pt-[72px]">
      <Hero />
      <OurStory />
      <Statistics />
      <WhyChoose />
      <Philosophy />
      <VisitStudio />
      <AboutFooter />
    </div>
  );
}
