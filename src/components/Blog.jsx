import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { blogPosts } from "../data/content";
import { DetailModal, Reveal, SectionHeading } from "./ui";

export function BlogSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="blog" className="bg-beige/40 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Journal"
          title="Ideas & Inspiration"
          desc="Notes from our studio — practical thinking on materials, layouts and the details that make a space feel like yours."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-12">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={(i % 4) * 0.07} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-48 overflow-hidden bg-charcoal">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-espresso backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs text-stonewarm">
                    <CalendarDays size={13} className="text-golddark" /> {post.date}
                  </p>
                  <h3 className="font-serif text-lg text-charcoal leading-snug mt-3 group-hover:text-golddark transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-coffee leading-relaxed mt-2.5 line-clamp-3">{post.excerpt}</p>
                  <button
                    type="button"
                    onClick={() => setActive(post)}
                    className="group/link mt-auto pt-5 inline-flex items-center gap-2 text-[13px] font-medium text-golddark"
                  >
                    Read More
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <DetailModal open={Boolean(active)} onClose={() => setActive(null)} label={active?.title || "Article"}>
        {active && (
          <div>
            <img src={active.image} alt={active.title} className="max-h-[42vh] w-full object-cover" />
            <div className="px-6 pb-8 pt-6 md:px-9">
              <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-golddark">
                <CalendarDays size={13} /> {active.date} · {active.category}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-3">{active.title}</h3>
              <p className="text-coffee text-[15px] leading-relaxed mt-4">{active.body}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {active.highlights.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-charcoal/85">
                    <CheckCircle2 size={15} className="text-golddark shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DetailModal>
    </section>
  );
}
