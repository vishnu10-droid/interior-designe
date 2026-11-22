import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Feather,
  Layers3,
  House,
  Lightbulb,
  Sofa,
  CookingPot,
  BedDouble,
  Play,
  Leaf,
} from "lucide-react";
import { blogPosts } from "../data/content";
import { DetailModal, Reveal, RevealLeft, RevealRight, StaggerContainer, StaggerItem } from "./ui";

// Editorial imagery already used across the Ananya site (journal + gallery data).
const HERO_IMAGE = blogPosts[0].image;
const FEATURED_IMAGE =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop";
const NEWSLETTER_IMAGE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900&auto=format&fit=crop";

const JOURNAL_CATEGORIES = [
  { label: "Design Ideas", icon: Feather, categories: ["Trade Ideas", "Bedroom"] },
  { label: "Material Guides", icon: Layers3, categories: ["Trade Ideas", "Kitchen"] },
  { label: "Space Planning", icon: House, categories: ["Kitchen", "Workspace"] },
  { label: "Trends & Inspiration", icon: Lightbulb, categories: ["Workspace", "Bedroom"] },
];

const ARTICLE_CATEGORIES = [
  { label: "Living Room", icon: Sofa, count: "12", categories: ["Trade Ideas"] },
  { label: "Kitchen", icon: CookingPot, count: "08", categories: ["Kitchen"] },
  { label: "Bedroom", icon: BedDouble, count: "10", categories: ["Bedroom"] },
  { label: "Materials", icon: Layers3, count: "15", categories: ["Trade Ideas", "Kitchen"] },
  { label: "Design Tips", icon: Lightbulb, count: "09", categories: ["Workspace"] },
];

const NEWSLETTER_EMAIL = "contact@ananyadesigns.com";

const scrollToArticles = () =>
  document.getElementById("latest-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ------------------------------- HERO -------------------------------- */

function JournalHero({ onExplore }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative h-[230px] overflow-hidden bg-[#201A16] sm:h-[245px] lg:h-[260px]">
      <motion.img
        src={HERO_IMAGE}
        alt="Warm luxury living room"
        initial={reduce ? false : { scale: 1.14 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 16, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#201A16]/95 via-[#201A16]/70 to-[#201A16]/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#201A16]/50 via-transparent to-transparent" />

      <StaggerContainer
        className="relative mx-auto flex h-full max-w-[1240px] flex-col justify-center px-6 sm:px-10 lg:px-9"
        stagger={0.12}
        inView={false}
      >
        <StaggerItem direction="up" className="w-fit">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BD9254]/70 px-3.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.3em] text-[#D9B87F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BD9254]" />
            Journal
          </span>
        </StaggerItem>
        <StaggerItem direction="up" className="mt-4 max-w-2xl">
          <h1 className="font-serif text-[34px] leading-[1.05] text-[#F8F4EE] sm:text-[44px] lg:text-[50px]">
            Ideas &amp; Inspiration
          </h1>
        </StaggerItem>
        <StaggerItem direction="up" className="mt-3 max-w-md">
          <p className="text-[12px] leading-relaxed text-[#E8DCCB]/85 sm:text-[13px]">
            Practical thinking on materials, layouts and the details that make a space feel like yours.
          </p>
        </StaggerItem>
        <StaggerItem direction="up" className="mt-5">
          <motion.button
            type="button"
            onClick={onExplore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#BD9254] px-5 py-2.5 text-[11px] font-semibold text-[#29231F] transition-colors hover:bg-[#D0A867]"
          >
            Explore Articles <ArrowRight size={14} />
          </motion.button>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}

/* ------------------------- CATEGORY NAV STRIP ------------------------ */

function CategoryStrip({ active, onSelect }) {
  return (
    <nav className="border-b border-[#E4D6C4] bg-[#F2E9DE]">
      <div className="no-scrollbar mx-auto flex max-w-[1240px] items-stretch overflow-x-auto px-3 sm:px-6 lg:px-9">
        {JOURNAL_CATEGORIES.map(({ label, icon: Icon, categories }, i) => {
          const isActive = active?.label === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(isActive ? null : { label, categories })}
              className={`group flex min-w-[170px] flex-1 items-center justify-center gap-2.5 whitespace-nowrap px-3 py-3.5 text-[11px] font-medium tracking-[0.06em] transition-colors sm:min-w-0 ${
                i > 0 ? "border-l border-[#D5B98F]/70" : ""
              } ${isActive ? "text-[#A98548]" : "text-[#5C4C3C] hover:text-[#A98548]"}`}
            >
              <Icon size={16} strokeWidth={1.5} className="shrink-0 text-[#A98548]" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* -------------------------- JOURNAL INTRO ---------------------------- */

function JournalIntro() {
  return (
    <section className="relative overflow-hidden bg-[#F8F4EE] px-5 pb-2 pt-7 text-center sm:pt-8">
      <div className="pointer-events-none absolute -right-6 -top-10 hidden h-60 w-60 opacity-70 sm:block soft-leaf-shadow">
        <Leaf size={190} strokeWidth={0.6} className="absolute right-2 top-2 rotate-[28deg] text-[#C9B79E]/40" />
      </div>
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A98548]">
            <span className="h-px w-10 bg-[#D9B87F]" />
            Our Journal
            <span className="h-px w-10 bg-[#D9B87F]" />
          </p>
          <h2 className="mt-2 font-serif text-[29px] leading-tight text-[#29231F] sm:text-[36px]">
            Ideas &amp; Inspiration
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-[#BD9254]" />
          <p className="mx-auto mt-3 max-w-xl text-[11px] leading-relaxed text-[#827467] sm:text-[12px]">
            Notes from our studio — practical thinking on materials, layouts and the details that make a space feel like yours.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- FEATURED -------------------------------- */

function FeaturedArticle({ article, onRead, onSelect }) {
  return (
    <section className="bg-[#F8F4EE] px-5 py-4 sm:px-8 sm:py-5">
      <div className="mx-auto grid max-w-[1240px] items-center gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-8">
        <RevealLeft>
          <div className="group relative overflow-hidden rounded-xl shadow-card">
            <img
              src={FEATURED_IMAGE}
              alt={article.title}
              loading="lazy"
              className="aspect-[2.15/1] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#8A5A2B]/10 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-[#F8F4EE]/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A6A16] shadow-sm">
              Featured
            </span>
            <button
              type="button"
              onClick={() => onRead(article)}
              aria-label={`Read ${article.title}`}
              className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#F8F4EE]/95 text-[#29231F] shadow-md transition-colors hover:bg-[#BD9254] hover:text-white"
            >
              <Play size={15} fill="currentColor" className="ml-0.5" />
            </button>
          </div>
        </RevealLeft>

        <Reveal>
          <div>
            <p className="flex items-center gap-2 text-[10px] tracking-[0.1em] text-[#827467]">
              <CalendarDays size={13} className="text-[#A98548]" /> {article.date}
            </p>
            <h3 className="mt-2 font-serif text-[22px] leading-[1.18] text-[#29231F] sm:text-[25px]">
              {article.title}
            </h3>
            <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-[#7A6C5E]">
              {article.excerpt}
            </p>
            <button
              type="button"
              onClick={() => onRead(article)}
              className="group/link mt-4 inline-flex items-center gap-2.5 rounded-full bg-[#BD9254] px-5 py-2.5 text-[11px] font-semibold text-[#29231F] transition-colors hover:bg-[#D0A867]"
            >
              Read Full Article
              <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
            </button>
          </div>
        </Reveal>

        <RevealRight>
          <div className="lg:border-l lg:border-[#D9B87F]/50 lg:pl-7">
            <h3 className="font-serif text-[20px] text-[#29231F]">Categories</h3>
            <div className="mt-3 space-y-1.5">
              {ARTICLE_CATEGORIES.map(({ label, icon: Icon, count, categories }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onSelect({ label, categories });
                    scrollToArticles();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-full border border-[#E8DCCD] bg-white px-3.5 py-1.5 text-left shadow-[0_4px_14px_-8px_rgba(41,35,31,0.25)] transition-all hover:-translate-y-0.5 hover:border-[#BD9254] hover:shadow-card"
                >
                  <Icon size={15} strokeWidth={1.5} className="shrink-0 text-[#A98548]" />
                  <span className="flex-1 text-[11px] font-medium text-[#5C4C3C]">{label}</span>
                  <span className="text-[10px] tabular-nums text-[#A98548]">{count}</span>
                </button>
              ))}
            </div>
          </div>
        </RevealRight>
      </div>
    </section>
  );
}

/* -------------------------- ARTICLE CARD ----------------------------- */

function ArticleCard({ article, onRead }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#EDE3D6] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden bg-[#EFE6DA]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="aspect-[2/1] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#F8F4EE]/95 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8A6A16] shadow-sm">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="flex items-center gap-1.5 text-[10px] text-[#827467]">
          <CalendarDays size={12} className="text-[#A98548]" /> {article.date}
        </p>
        <h3 className="mt-1.5 font-serif text-[14px] leading-snug text-[#29231F] transition-colors group-hover:text-[#A98548]">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-[#7A6C5E]">
          {article.excerpt}
        </p>
        <button
          type="button"
          onClick={() => onRead(article)}
          className="group/link mt-auto inline-flex items-center gap-1.5 pt-3 text-[10.5px] font-semibold text-[#A98548]"
        >
          Read More
          <ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

/* ------------------------- LATEST ARTICLES --------------------------- */

function LatestArticles({ articles, active, onClear, onRead }) {
  return (
    <section id="latest-articles" className="scroll-mt-24 bg-[#F8F4EE] px-5 pb-6 pt-0 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-[27px] leading-tight text-[#29231F] sm:text-[31px]">
              Latest Articles
            </h2>
            {active && (
              <p className="mt-1 text-[11px] text-[#827467]">
                Showing <strong className="font-medium text-[#A98548]">{active.label}</strong>
                <button type="button" onClick={onClear} className="ml-2 underline hover:text-[#A98548]">
                  Clear
                </button>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClear}
            className="group/link inline-flex items-center gap-2 text-[11px] font-medium text-[#A98548] hover:text-[#8A6A16]"
          >
            View All Articles
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </button>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
          inView={false}
        >
          {articles.map((article, i) => (
            <StaggerItem key={article.id} direction={["left", "up", "right", "up"][i % 4]} scale={0.96} className="h-full">
              <ArticleCard article={article} onRead={onRead} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* --------------------------- NEWSLETTER ------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    // No newsletter API exists in this project — open a real email draft so
    // the request is actually delivered instead of faking a success message.
    const subject = encodeURIComponent("Newsletter subscription request");
    const body = encodeURIComponent(`Please add ${value} to the Ananya Interior newsletter.`);
    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative overflow-hidden bg-[#30231C]">
      <div className="absolute inset-y-0 left-0 hidden w-[22%] sm:block">
        <img src={NEWSLETTER_IMAGE} alt="Warm interior details" loading="lazy" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#30231C]/40 to-[#30231C]" />
      </div>
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-6 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:pl-[26%]">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#C9A76C]">Stay Inspired</p>
          <h2 className="mt-2 font-serif text-[22px] leading-tight text-[#F8F4EE] sm:text-[27px]">
            Get Design Ideas in Your Inbox
          </h2>
          <p className="mt-2 text-[11px] text-[#D8C8B6]">
            Join our newsletter for fresh articles, trend updates and material insights.
          </p>
        </div>
        <form onSubmit={subscribe} className="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full rounded-full border border-white/20 bg-white px-5 py-3 text-[12px] text-[#29231F] placeholder:text-[#9A8B7E] sm:w-[260px]"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#BD9254] px-5 py-3 text-[11px] font-semibold text-[#29231F] transition-colors hover:bg-[#D0A867]"
          >
            Subscribe <ArrowRight size={14} />
          </motion.button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------- PAGE -------------------------------- */

export default function BlogExperience() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = activeFilter
    ? blogPosts.filter((post) => activeFilter.categories.includes(post.category))
    : blogPosts;

  return (
    <div className="bg-[#F8F4EE] pt-[72px] text-[#29231F]">
      <JournalHero onExplore={() => document.getElementById("journal-intro")?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <CategoryStrip active={activeFilter} onSelect={setActiveFilter} />
      <div id="journal-intro" className="scroll-mt-24">
        <JournalIntro />
      </div>
      <FeaturedArticle
        article={blogPosts[0]}
        onRead={setActiveArticle}
        onSelect={(filter) => setActiveFilter(filter)}
      />
      <LatestArticles
        articles={articles}
        active={activeFilter}
        onClear={() => setActiveFilter(null)}
        onRead={setActiveArticle}
      />
      <Newsletter />

      <DetailModal
        open={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        label={activeArticle?.title || "Article"}
      >
        {activeArticle && (
          <div>
            <img src={activeArticle.image} alt={activeArticle.title} className="max-h-[42vh] w-full object-cover" />
            <div className="px-6 pb-8 pt-6 md:px-9">
              <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#A98548]">
                <CalendarDays size={13} /> {activeArticle.date} · {activeArticle.category}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[#29231F] md:text-3xl">{activeArticle.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B5B4C]">{activeArticle.body}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {activeArticle.highlights.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-[#29231F]/85">
                    <CheckCircle2 size={15} className="shrink-0 text-[#A98548]" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}

// Kept as a named export so older imports of BlogSection keep working.
export function BlogSection() {
  return <BlogExperience />;
}
