
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "../data/content";
import { RevealUp, RevealZoom, Stars } from "./ui";

// Updated customer profile images
const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
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
      className="relative overflow-hidden bg-[#faf5ef] py-16 md:py-20"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full border border-[#d6a45c]/30" />
      <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full border border-[#d6a45c]/20" />
      <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full border border-[#d6a45c]/30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <RevealUp className="mx-auto max-w-3xl text-center">
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

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#68615b] md:text-base">
            Real experiences from homeowners, architects and traders who trust
            us for quality, service and long-term value.
          </p>
        </RevealUp>

        {/* Carousel */}
        <RevealZoom className="relative mt-8 md:mt-12">

          {/* Cards Stage - Reduced Height */}
          <div className="relative mx-auto h-[370px] overflow-hidden md:h-[410px]">

            {stories.map((review, index) => {
              let offset = index - active;

              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const distance = Math.abs(offset);
              const visible = distance <= 2;

              return (
                <div
                  key={review.id ?? index}
                  className="absolute left-1/2 top-1/2 w-[min(75vw,360px)] -translate-x-1/2 -translate-y-1/2"
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
                      x: offset * 290,
                      scale:
                        distance === 0
                          ? 1
                          : distance === 1
                            ? 0.86
                            : 0.72,
                      opacity: !visible
                        ? 0
                        : distance === 0
                          ? 1
                          : distance === 1
                            ? 0.88
                            : 0.58,
                      rotate: offset * 2,
                      y: distance === 0 ? 0 : 10,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex min-h-[320px] cursor-pointer flex-col items-center rounded-[25px] border border-[#e8d8c5] bg-gradient-to-br from-white via-[#fffaf4] to-[#f5e9dc] px-5 py-5 text-center shadow-[0_20px_55px_rgba(91,65,40,0.13)] md:min-h-[350px] md:px-7 md:py-6"
                    style={{
                      borderColor:
                        distance === 0 ? "#c89542" : "#e8d8c5",
                    }}
                  >

                    {/* Quote */}
                    <Quote
                      size={34}
                      strokeWidth={0}
                      className="absolute left-5 top-5 fill-[#e8c99e] text-[#e8c99e]"
                    />

                    {/* Updated Profile Image */}
                    <div className="mt-1 h-[82px] w-[82px] overflow-hidden rounded-full border-[3px] border-[#c89542] bg-white p-1 shadow-md md:h-[90px] md:w-[90px]">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    {/* Customer Name */}
                    <h3 className="mt-3 font-serif text-lg font-semibold text-[#211b16] md:text-xl">
                      {review.name}
                    </h3>

                    {/* Location */}
                    <p className="mt-1 text-[11px] font-medium text-[#74675b] md:text-xs">
                      {review.location}
                    </p>

                    {/* Stars */}
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <Stars size={16} />
                    </div>

                    {/* Review */}
                    <blockquote className="mt-4 line-clamp-4 flex-grow font-sans text-[13px] leading-6 text-[#302b26] md:text-sm">
                      “{review.text}”
                    </blockquote>

                    {/* Date */}
                    <div className="mt-4 h-px w-10 bg-[#c89542]" />

                    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#998777]">
                      {review.date}
                    </p>

                  </motion.div>
                </div>
              );
            })}

          </div>
        </RevealZoom>

        {/* Navigation Controls */}
        <div className="mt-3 flex items-center justify-center gap-6">

          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6a45c]/50 text-[#a47a3e] transition-all duration-300 hover:bg-[#c89542] hover:text-white"
          >
            <ChevronLeft size={19} />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-[7px] rounded-full transition-all duration-500 ${
                  active === index
                    ? "w-7 bg-[#c89542]"
                    : "w-[7px] bg-[#d8c9b5]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6a45c]/50 text-[#a47a3e] transition-all duration-300 hover:bg-[#c89542] hover:text-white"
          >
            <ChevronRight size={19} />
          </button>

        </div>

      </div>
    </section>
  );
}
