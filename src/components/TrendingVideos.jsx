import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Reveal } from "./ui";

/**
 * The reels live in /public/Trending and are served from /Trending by Vite.
 * Every card is a real, muted, looping <video> — no static image stand-ins.
 */
const REELS = [
  {
    id: "living-room",
    title: "Luxury Living Room Decor",
    src: "/Trending/reel-4-dream-home.mp4",
  },
  {
    id: "pendant-lighting",
    title: "Modern Pendant Lighting",
    src: "/Trending/reel-2-japandi-style-interiors.mp4",
    caption: "and save",
  },
  {
    id: "kitchen",
    title: "Modular Kitchen & Overhead Cabinets",
    src: "/Trending/reel-3-modular-kitchen-essentials.mp4",
    overlay: { text: "Overhead Cabinets", position: "center" },
  },
  {
    id: "bedroom",
    title: "Modern Bedroom Interior",
    src: "/Trending/reel-1-home-is-a-feeling.mp4",
    overlay: { text: "2 BHK Apartment ✨", position: "top" },
  },
  {
    id: "bathroom",
    title: "Luxury Bathroom Design",
    src: "/Trending/best-bathroom-ideas-for-every-home-video.mp4",
    overlay: { text: "APNE BATHROOM", position: "bottom" },
  },
  {
    id: "bathroom-tips",
    title: "Bathroom Colour & Material Tips",
    src: "/Trending/3-1715770175-bWsqG.mp4",
    tip: {
      number: "6",
      title: "For your Bathroom Colour",
      body: "Earthy shades work well to marry it in the space or a sanctuary steel clear of darker colours, especially brick.",
    },
  },
];

const OVERLAY_POSITION = {
  top: "top-[18%]",
  center: "top-[56%] -translate-y-1/2",
  bottom: "bottom-[20%]",
};

function VideoCard({ reel, paused, onOpen }) {
  const videoRef = useRef(null);

  // Play only while the card is on screen — keeps playback smooth and light.
  // The card is paused while its full-screen player is open.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (paused) {
      video.pause();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playback = video.play();
          if (playback && typeof playback.catch === "function") playback.catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [paused]);

  return (
    <article
      data-card
      className="group relative aspect-[275/500] w-[72vw] max-w-[275px] shrink-0 snap-start overflow-hidden rounded-[5px] bg-[#E7E1DA] sm:w-[275px]"
      aria-label={reel.title}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={reel.title}
      >
        <source src={reel.src} type="video/mp4" />
      </video>

      {reel.caption && (
        <span className="pointer-events-none absolute inset-x-4 bottom-[7%] z-10 text-center font-serif text-[12px] text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
          {reel.caption}
        </span>
      )}

      {reel.overlay && (
        <span
          className={`pointer-events-none absolute inset-x-4 z-10 text-center text-[13px] font-semibold leading-snug tracking-[0.02em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] md:text-[14px] ${OVERLAY_POSITION[reel.overlay.position]}`}
        >
          {reel.overlay.text}
        </span>
      )}

      {reel.tip && (
        <div className="pointer-events-none absolute bottom-[17%] left-[11%] right-[9%] z-10 -rotate-2 rounded-[3px] bg-[#FDFBF8] px-3 py-3 text-center shadow-[0_10px_28px_rgba(0,0,0,0.22)]">
          <span className="absolute -top-3.5 right-4 grid h-8 w-8 place-items-center rounded-full border-[3px] border-[#FDFBF8] bg-[#6E4638] text-[12px] font-medium text-white shadow-sm">
            {reel.tip.number}
          </span>
          <p className="text-[11px] font-semibold leading-tight text-[#8B3B2E] md:text-[12px]">{reel.tip.title}</p>
          <p className="mt-1 text-[8.5px] leading-[1.5] text-[#4C3B33] md:text-[9px]">{reel.tip.body}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => onOpen(reel)}
        aria-label={`Play ${reel.title} with sound`}
        className="absolute inset-0 z-20 grid cursor-pointer place-items-center"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Play size={19} fill="currentColor" className="translate-x-[1px]" />
        </span>
      </button>
    </article>
  );
}

/** Full-screen vertical player — opens muted-free so the reel's voice plays. */
function VideoLightbox({ reel, onClose }) {
  const videoRef = useRef(null);
  const [blockedReel, setBlockedReel] = useState(null);
  const needsTap = Boolean(reel) && blockedReel === reel.id;

  const startPlayback = useCallback((reelId) => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    const playback = video.play();
    if (playback && typeof playback.then === "function") {
      playback.then(() => setBlockedReel(null)).catch(() => setBlockedReel(reelId));
    }
  }, []);

  useEffect(() => {
    if (!reel) return undefined;

    const video = videoRef.current;
    startPlayback(reel.id);
    requestAnimationFrame(() => startPlayback(reel.id));

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (video) video.pause();
    };
  }, [reel, onClose, startPlayback]);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          key="video-lightbox"
          className="fixed inset-0 z-[100] grid place-items-center bg-[#1F1D1B]/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={reel.title}
        >
          <motion.div
            className="relative aspect-[9/16] h-[90vh] max-h-[1000px] max-w-[92vw] overflow-hidden rounded-[10px] bg-black shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={videoRef}
              key={reel.src}
              className="h-full w-full object-contain"
              src={reel.src}
              autoPlay
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-label={reel.title}
            />

            {needsTap && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  startPlayback(reel.id);
                }}
                aria-label="Tap to play with sound"
                className="absolute inset-0 z-10 grid place-items-center bg-black/30"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-charcoal shadow-lg">
                  <Play size={26} fill="currentColor" className="translate-x-[2px]" />
                </span>
              </button>
            )}
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TrendingVideos() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeReel, setActiveReel] = useState(null);

  const openVideo = useCallback((reel) => setActiveReel(reel), []);
  const closeVideo = useCallback(() => setActiveReel(null), []);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    updateArrows();
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = (card?.offsetWidth || 275) + gap;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      id="trending"
      className="w-full scroll-mt-[90px] bg-[#F5F1EE] px-[4.4%] pb-6 pt-[55px] md:pb-8"
      aria-labelledby="trending-heading"
    >
      <Reveal className="mb-[16px] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#B08A6E]">Now Showing</p>
          <h2
            id="trending-heading"
            className="mt-3 font-serif text-[30px] leading-[1.2] text-charcoal md:whitespace-nowrap md:text-[36px]"
          >
            <span>Trending</span> <em className="italic text-[#A9795E]">design and decor</em> <span>tips</span>
          </h2>
        </div>

        <Link
          to="/blog"
          className="group/view w-fit pb-[3px] text-[13px] text-charcoal underline decoration-charcoal/60 decoration-1 underline-offset-4 transition-all duration-300 hover:text-[#A9795E] hover:decoration-[#A9795E] hover:tracking-[0.06em]"
        >
          View all
        </Link>
      </Reveal>

      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x scroll-smooth gap-[18px] overflow-x-auto md:gap-[29px]"
        >
          {REELS.map((reel) => (
            <VideoCard
              key={reel.id}
              reel={reel}
              paused={activeReel?.id === reel.id}
              onOpen={openVideo}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous videos"
          className={`absolute left-[-2%] top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-charcoal shadow-[0_4px_18px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-105 hover:bg-[#FDFBF8] md:left-[-3.2%] md:h-11 md:w-11 ${
            canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft size={19} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next videos"
          className={`absolute right-[-2%] top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-charcoal shadow-[0_4px_18px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-105 hover:bg-[#FDFBF8] md:right-[-3.2%] md:h-11 md:w-11 ${
            canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRight size={19} strokeWidth={1.8} />
        </button>
      </div>

      <VideoLightbox reel={activeReel} onClose={closeVideo} />
    </section>
  );
}
