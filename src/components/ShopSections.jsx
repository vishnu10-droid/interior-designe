import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { productCategories, productFilters, getProductImages, PRODUCT_RANGE_FALLBACK_IMAGE } from "../data/products";
import { IMAGES, services, WHATSAPP_LINK } from "../data/services";
import { blogPosts, reviews } from "../data/content";
import { Stars } from "./ui";
import ShopProductCard from "./ShopProductCard";

const SLIDES = [
  {
    id: "materials",
    image: IMAGES.hero,
    eyebrow: "The Ananya Edit",
    title: "Materials that make a home",
    text: "Plywood, laminates, veneers and finishes chosen for the way you actually live.",
    cta: "Shop materials",
    href: "/products",
  },
  {
    id: "kitchen",
    image: IMAGES.kitchen,
    eyebrow: "Kitchen Collection",
    title: "Built around the way you cook",
    text: "Moisture-resistant boards, easy-clean laminates and hardware that keeps up.",
    cta: "Explore kitchen picks",
    href: "/products?group=Boards%20%26%20Laminates",
  },
  {
    id: "living",
    image: IMAGES.living,
    eyebrow: "Living Spaces",
    title: "Warmth in every detail",
    text: "Textured veneers, fluted panels and lighting-friendly finishes for calm interiors.",
    cta: "Explore living picks",
    href: "/products?group=Wood%20%26%20Panels",
  },
  {
    id: "finishes",
    image: IMAGES.texture,
    eyebrow: "Surfaces & Finishes",
    title: "Beauty you can feel",
    text: "Wood-look laminates, veneers and rich textures that bring depth to every surface.",
    cta: "Browse finishes",
    href: "/products?group=Boards%20%26%20Laminates",
  },
];

export function AnnouncementBar() {
  return (
    <div className="w-full bg-charcoal text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[10px] tracking-[0.14em] text-cream/80 sm:justify-between">
        <span>FREE TRADE CONSULTATION · AGRA &amp; NEARBY</span>
        <span className="hidden items-center gap-5 sm:flex">
          <span className="inline-flex items-center gap-1.5"><Truck size={12} className="text-gold" /> Free site visit</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-gold" /> Genuine brands</span>
          <span className="inline-flex items-center gap-1.5"><RotateCcw size={12} className="text-gold" /> Easy exchange</span>
        </span>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-gold hover:underline">Chat with us →</a>
      </div>
    </div>
  );
}

/* ---------------- Hero banner slider ---------------- */

export function ShopHeroSlider() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState({});
  const reduceMotion = useReducedMotion();
  const slide = SLIDES[active];

  // Load all four images up front so a slide change never shows an empty frame.
  useEffect(() => {
    SLIDES.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => setActive((prev) => (prev + 1) % SLIDES.length), 5500);
    return () => window.clearInterval(timer);
  }, [reduceMotion, active]);

  return (
    <section className="w-full bg-cream px-4 py-4 md:px-8 md:py-6" aria-label="Featured collections">
      <div className="relative mx-auto h-[330px] max-w-[1600px] overflow-hidden rounded-xl bg-[#EDE5D9] sm:h-[420px] lg:h-[500px]">
        {/* Every slide stays mounted and cross-fades — no dark gap on change. */}
        <div className="absolute inset-0">
          {SLIDES.map((item, index) => (
            <motion.img
              key={item.id}
              src={failed[item.id] ? PRODUCT_RANGE_FALLBACK_IMAGE : item.image}
              alt=""
              initial={false}
              animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.04 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
              onError={() => setFailed((prev) => ({ ...prev, [item.id]: true }))}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent" />

        <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-6 sm:px-10 md:px-14">
          <motion.p key={`e-${active}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            {slide.eyebrow}
          </motion.p>
          <motion.h2 key={`t-${active}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            {slide.title}
          </motion.h2>
          <motion.p key={`p-${active}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-3 max-w-md text-[13px] leading-relaxed text-cream/80 sm:text-sm">
            {slide.text}
          </motion.p>
          <motion.div key={`c-${active}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
            <Link to={slide.href} className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:bg-cream">
              {slide.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-gold" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => setActive((active - 1 + SLIDES.length) % SLIDES.length)} aria-label="Previous slide" className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-charcoal hover:bg-white sm:left-5">
          <ChevronLeft size={17} />
        </button>
        <button type="button" onClick={() => setActive((active + 1) % SLIDES.length)} aria-label="Next slide" className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-charcoal hover:bg-white sm:right-5">
          <ChevronRight size={17} />
        </button>
      </div>
    </section>
  );
}

/* ---------------- Horizontal product carousel ---------------- */

export function ProductCarousel({ categories, eyebrow, title, href, note, onViewAll }) {
  const trackRef = useRef(null);
  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-slide-card]");
    const step = (card?.offsetWidth || 240) + 12;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-golddark">{eyebrow}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
            {title} <em className="italic text-golddark">{note}</em>
          </h2>
          <div className="flex items-center gap-2">
            {onViewAll ? (
              <button type="button" onClick={onViewAll} className="mr-2 text-[11px] uppercase tracking-[0.14em] text-golddark hover:underline">View all</button>
            ) : href ? (
              <Link to={href} className="mr-2 text-[11px] uppercase tracking-[0.14em] text-coffee hover:text-golddark">View all</Link>
            ) : null}
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll products left" className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal hover:border-gold">
              <ChevronLeft size={15} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll products right" className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal hover:border-gold">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
        {categories.length === 0 ? (
          <p className="mt-8 rounded-xl border border-charcoal/10 bg-white py-12 text-center text-[13px] text-coffee">No products in this collection yet.</p>
        ) : (
          <div ref={trackRef} className="no-scrollbar mt-6 flex snap-x gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <div key={category.id} data-slide-card className="w-[62%] shrink-0 snap-start sm:w-[45%] md:w-[30%] lg:w-[19%]">
                <ShopProductCard category={category} index={index} compact />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Curated collections ---------------- */

function CollectionImage({ category }) {
  const [failed, setFailed] = useState(false);
  const images = getProductImages(category);
  return (
    <img
      src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : (images[0] || category.image)}
      alt={category.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export function CuratedCollections({ onSelect }) {
  const groups = productFilters.filter((item) => item.label !== "All");
  const [active, setActive] = useState(groups[0]?.label);
  const list = productCategories.filter((category) => groups.find((g) => g.label === active)?.ids?.includes(category.id));

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-golddark">Handpicked for you</p>
        <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">Curated <em className="italic text-golddark">collections</em></h2>
        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          {groups.map((group) => (
            <button
              key={group.label}
              type="button"
              onClick={() => setActive(group.label)}
              className={`shrink-0 rounded-full px-4 py-2 text-[11px] tracking-wide transition-all ${
                active === group.label ? "bg-charcoal text-cream" : "border border-charcoal/10 text-coffee hover:border-gold"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {list.map((category, index) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => onSelect?.(category.slug)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.04, 0.2) }}
              className="group overflow-hidden rounded-xl border border-charcoal/8 bg-cream text-left transition-shadow hover:shadow-card"
            >
              <div className="aspect-[4/3] overflow-hidden bg-beige">
                <CollectionImage category={category} />
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-[12px] font-semibold text-charcoal group-hover:text-golddark">{category.name}</p>
                <p className="mt-1 text-[10px] text-stonewarm">{getProductImages(category).length} designs</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Promotional banner ---------------- */

export function PromoBanner() {
  return (
    <section className="px-4 py-4 md:px-8 md:py-6">
      <div className="relative mx-auto h-[300px] max-w-[1600px] overflow-hidden rounded-xl bg-charcoal sm:h-[380px]">
        <img src={IMAGES.luxury} alt="Premium interiors by Ananya" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-charcoal/65" />
        <div className="relative z-10 flex h-full max-w-lg flex-col justify-center px-6 sm:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Made for your space</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">Your personality, made into a space.</h2>
          <p className="mt-3 text-[13px] leading-relaxed text-cream/75">From the first material sample to the final handover — every finish chosen with you.</p>
          <Link to="/contact" className="group mt-6 inline-flex w-fit items-center gap-2 border border-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-charcoal">
            Plan my space <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shop by room ---------------- */

export function ShopByRoom({ onSelect }) {
  const rooms = services.slice(0, 5);
  const groups = productFilters.filter((item) => item.label !== "All").map((item) => item.label);
  const [active, setActive] = useState(rooms[0]?.id);
  const groupIndex = Math.max(0, rooms.findIndex((room) => room.id === active));
  const group = productFilters.find((item) => item.label === groups[groupIndex % groups.length]);
  const list = productCategories.filter((category) => group?.ids?.includes(category.id)).slice(0, 10);

  return (
    <section className="bg-cream py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-golddark">Room by room</p>
        <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">Shop by <em className="italic text-golddark">room</em></h2>
        <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto pb-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => setActive(room.id)}
              className={`flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all ${
                active === room.id ? "border-gold bg-white shadow-card" : "border-charcoal/8 bg-white/60 hover:border-gold/50"
              }`}
            >
              <img src={room.image} alt="" loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-[12px] font-medium text-charcoal">{room.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-stonewarm">Showing materials for {rooms.find((room) => room.id === active)?.name}</p>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
          {list.map((category, index) => (
            <div key={category.id} className="w-[62%] shrink-0 sm:w-[45%] md:w-[30%] lg:w-[19%]">
              <ShopProductCard category={category} index={index} compact />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setActive(rooms[0]?.id);
            onSelect?.("");
          }}
          className="mt-5 text-[11px] uppercase tracking-[0.14em] text-golddark hover:underline"
        >
          Clear room filter
        </button>
      </div>
    </section>
  );
}

/* ---------------- Editorial ---------------- */

export function EditorialSection() {
  const posts = blogPosts.slice(0, 4);
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-golddark">From the studio</p>
        <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">Stories worth <em className="italic text-golddark">reading</em></h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group overflow-hidden rounded-xl border border-charcoal/8 bg-cream">
              <div className="aspect-[16/10] overflow-hidden bg-beige">
                <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-[9px] uppercase tracking-[0.18em] text-golddark">{post.category} · {post.date}</p>
                <h3 className="mt-2 line-clamp-2 text-[13px] font-semibold leading-snug text-charcoal group-hover:text-golddark">{post.title}</h3>
                <Link to="/blog" className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-golddark hover:underline">Read more <ArrowRight size={12} /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

export function ShopTestimonials() {
  const approved = reviews.filter((review) => review.status === "Approved");
  const average = approved.length
    ? (approved.reduce((sum, review) => sum + review.rating, 0) / approved.length).toFixed(1)
    : "—";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.luxury} alt="" loading="lazy" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Client stories</p>
            <h2 className="mt-2 font-serif text-3xl text-white md:text-4xl">Loved by the people we build for.</h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3">
            <span className="font-serif text-4xl text-white">{average}</span>
            <div>
              <Stars size={13} />
              <p className="mt-1 text-[10px] text-cream/60">from {approved.length} verified reviews</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {approved.slice(0, 3).map((review) => (
            <div key={review.id} className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <Stars size={13} />
              <p className="mt-3 text-[13px] leading-relaxed text-cream/85">“{review.text}”</p>
              <p className="mt-4 text-[12px] font-semibold text-white">{review.name}</p>
              <p className="text-[10px] text-cream/50">{review.location} · {review.date}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-[11px] text-cream/60">
          <Star size={13} className="text-gold" /> Rated {average}/5 by our clients in Agra
        </div>
      </div>
    </section>
  );
}
