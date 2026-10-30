import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Star, Sparkles } from "lucide-react";

// Mock Data
export const categories = ["All", "Residential", "Commercial", "Kitchen", "Living"];

export const projects = [
  {
    id: "1",
    name: "Modern Villa Interior",
    category: "Residential",
    location: "Taj Nagari, Agra",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Minimalist Modular Kitchen",
    category: "Kitchen",
    location: "Dayalbagh, Agra",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Luxury Boutique Office",
    category: "Commercial",
    location: "Sanjay Place, Agra",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
];

/* =========================================================
   1. REUSABLE SECTION HEADING
   All section headings have the same size
   ========================================================= */

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center = true,
}) {
  return (
    <div className={`mb-3 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium block mb-1">
          {eyebrow}
        </span>
      )}

      <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-semibold tracking-tight leading-tight">
        {title}
      </h2>

      {desc && (
        <p className="text-coffee/80 text-xs md:text-sm max-w-xl mx-auto mt-1 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   2. REVEAL ANIMATION
   ========================================================= */

export function Reveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   3. PROJECT CARD
   ========================================================= */

export function ProjectCard({ p }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
    >
      <Link
        to={`/projects/${p.id}`}
        className="group block relative rounded-xl overflow-hidden shadow-card img-zoom bg-charcoal"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

        <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase bg-cream/90 backdrop-blur px-2.5 py-1 rounded-full text-espresso font-medium">
          {p.category}
        </span>

        <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg text-white font-medium">
              {p.name}
            </h3>

            <p className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <MapPin size={12} />
              {p.location}
            </p>
          </div>

          <span className="w-9 h-9 shrink-0 rounded-full bg-gold text-charcoal grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================================================
   4. PROJECTS SECTION
   ========================================================= */

export function ProjectsSection({
  limit = 6,
  showFilter = true,
}) {
  const [cat, setCat] = useState("All");

  const filtered = (limit ? projects.slice(0, limit) : projects).filter(
    (p) => cat === "All" || p.category === cat
  );

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our Recent Work"
        desc="A selection of homes, kitchens and workplaces crafted across Agra."
      />

      {showFilter && (
        <Reveal className="flex flex-wrap justify-center gap-2 mt-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all ${
                cat === c
                  ? "bg-charcoal text-cream font-medium"
                  : "bg-white border border-charcoal/10 text-coffee hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>
      )}

      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-coffee mt-5 text-xs">
          No projects in this category yet.
        </p>
      )}

      {limit && (
        <div className="text-center mt-5">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-charcoal/20 px-6 py-2.5 rounded-full text-xs tracking-wide hover:bg-charcoal hover:text-cream transition-colors"
          >
            View All Projects <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   5. WHAT WE DESIGN
   ========================================================= */

export function WhatWeDesignSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10">
      <SectionHeading
        eyebrow="Services"
        title="What We Design"
        desc="Tailored interior design solutions for residential and commercial spaces."
      />
    </section>
  );
}

/* =========================================================
   6. FROM VISION TO REALITY
   ========================================================= */

export function ProcessSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10">
      <SectionHeading
        eyebrow="Our Process"
        title="From Vision to Reality"
        desc="A seamless step-by-step journey from initial concepts to final execution."
      />
    </section>
  );
}

/* =========================================================
   7. WHY CHOOSE AF INTERIOR
   ========================================================= */

export function WhyChooseUsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10">
      <SectionHeading
        eyebrow="Why AF Interior"
        title="Why Choose AF Interior?"
        desc="Uncompromised quality, transparent pricing, and timely project delivery."
      />
    </section>
  );
}

/* =========================================================
   8. RATING SECTION
   ========================================================= */

export function RatingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-2 text-center">
      <div className="inline-flex items-center gap-2 bg-cream/50 px-3 py-1 rounded-full border border-gold/20 mb-1">
        <Star size={13} className="fill-gold text-gold" />

        <span className="text-[11px] font-semibold text-charcoal">
          4.9 / 5.0 Rating
        </span>
      </div>

      <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-semibold tracking-tight leading-tight mt-0.5">
        Rated 4.9 by Agra
      </h2>

      <p className="text-coffee/80 text-xs md:text-sm mt-1">
        Trusted by 100+ happy homeowners across Agra.
      </p>
    </section>
  );
}

/* =========================================================
   9. SPACES WE LOVE
   ========================================================= */

export function SpacesWeLoveSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10">
      <SectionHeading
        eyebrow="Inspiration"
        title="Spaces We Love"
        desc="A curated showcase of aesthetic architectural features and decor concepts."
      />
    </section>
  );
}

/* =========================================================
   10. WANT A SIMILAR SPACE?
   ========================================================= */

export function CTASection() {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 my-3 bg-charcoal text-white rounded-2xl text-center relative overflow-hidden">
      <div className="relative z-10 max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium block mb-1">
          Get In Touch
        </span>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2 leading-tight">
          Want a Similar Space?
        </h2>

        <p className="text-white/70 text-xs md:text-sm mb-4">
          Let’s discuss your vision and turn your house into a dream home.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-2.5 rounded-full text-xs font-medium hover:bg-white transition-colors"
        >
          Book a Free Consultation <Sparkles size={14} />
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   11. LET'S CREATE YOUR SPACE
   ========================================================= */

export function FinalCalloutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-8 md:pt-6 md:pb-10 text-center">
      <SectionHeading
        eyebrow="Start Today"
        title="Let's Create Your Space"
        desc="Book an appointment with our lead interior architects."
      />
    </section>
  );
}