import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "../data/content";
import { SectionHeading, Stars } from "./ui";

const avatars = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop",
];

const stories = reviews
  .filter((review) => review.status === "Approved")
  .slice(0, 8)
  .map((review, index) => ({
    ...review,
    avatar: avatars[index % avatars.length],
  }));

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = stories.length;

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (reduceMotion || total <= 1) return;

    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [reduceMotion, total]);

  if (!total) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#faf5ef] py-18 md:py-26"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full border border-[#d6a45c]/30" />
      <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full border border-[#d6a45c]/20" />
      <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full border border-[#d6a45c]/30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-[#c89542]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal">
              Testimonials
            </span>
            <span className="h-px w-16 bg-[#c89542]" />
          </div>

          <h2 className="font-serif text-2xl leading-tight text-[#171411] md:text-4xl">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#68615b] md:text-lg">
            Real experiences from homeowners, architects and tradeers who trust
            us for quality, service and long-term value.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 md:mt-16">
          {/* Cards Stage */}
          <div className="relative mx-auto h-[420px] overflow-hidden md:h-[510px]">
            {stories.map((review, index) => {
              let offset = index - active;

              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const distance = Math.abs(offset);
              const visible = distance <= 2;

              return (
                <div
                  key={review.id ?? index}
                  className="absolute left-1/2 top-1/2 w-[min(78vw,440px)] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    zIndex: 30 - distance,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <motion.div
                    onClick={() => {
                      if (offset !== 0) setActive(index);
                    }}
                    initial={false}
                    animate={{
                      x: offset * 340,
                      scale: distance === 0 ? 1 : distance === 1 ? 0.86 : 0.72,
                      opacity: !visible
                        ? 0
                        : distance === 0
                          ? 1
                          : distance === 1
                            ? 0.88
                            : 0.58,
                      rotate: offset * 2,
                      y: distance === 0 ? 0 : 12,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex min-h-[390px] cursor-pointer flex-col items-center rounded-[30px] border border-[#e8d8c5] bg-gradient-to-br from-white via-[#fffaf4] to-[#f5e9dc] px-6 py-7 text-center shadow-[0_20px_55px_rgba(91,65,40,0.13)] md:min-h-[430px] md:px-10 md:py-9"
                    style={{
                      borderColor: distance === 0 ? "#c89542" : "#e8d8c5",
                    }}
                  >
                    {/* Quote */}
                    <Quote
                      size={42}
                      strokeWidth={0}
                      className="absolute left-6 top-7 fill-[#e8c99e] text-[#e8c99e] md:left-8"
                    />

                    {/* Profile Image */}
                    <div className="mt-1 h-[100px] w-[100px] overflow-hidden rounded-full border-[3px] border-[#c89542] bg-white p-1 shadow-sm md:h-[116px] md:w-[116px]">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    {/* Customer Name */}
                    <h3 className="mt-4 font-serif text-xl font-semibold text-[#211b16] md:text-2xl">
                      {review.name}
                    </h3>

                    {/* Location */}
                    <p className="mt-1 text-xs font-medium text-[#74675b] md:text-sm">
                      {review.location}
                    </p>

                    {/* Stars */}
                    <div className="mt-4 flex items-center justify-center gap-1">
                      <Stars size={19} />
                    </div>

                    {/* Review */}
                    <blockquote className="mt-6 flex-grow font-sans text-sm leading-7 text-[#302b26] md:text-[17px] md:leading-8">
                      “{review.text}”
                    </blockquote>

                    {/* Date */}
                    <div className="mt-5 h-px w-12 bg-[#c89542]" />
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#998777]">
                      {review.date}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
      </div>
    </section>
  );
}
