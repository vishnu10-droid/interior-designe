import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { categories, projects } from "../data/projects";
import { Reveal, SectionHeading } from "./ui";

export function ProjectCard({ p }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
      <Link to={`/projects/${p.id}`} className="group block relative rounded-2xl overflow-hidden shadow-card img-zoom bg-charcoal">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
        <span className="absolute top-4 left-4 text-[11px] tracking-[0.2em] uppercase bg-cream/90 backdrop-blur px-3 py-1.5 rounded-full text-espresso">{p.category}</span>
        <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl text-white">{p.name}</h3>
            <p className="flex items-center gap-1.5 text-white/70 text-sm mt-1.5"><MapPin size={13} />{p.location}</p>
          </div>
          <span className="w-11 h-11 shrink-0 rounded-full bg-gold text-charcoal grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection({ limit = 6, showFilter = true }) {
  const [cat, setCat] = useState("All");
  const filtered = (limit ? projects.slice(0, limit) : projects).filter((p) => cat === "All" || p.category === cat);
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading eyebrow="Portfolio" title="Our Recent Work" desc="A selection of homes, kitchens and workplaces crafted across Agra." />
      {showFilter && (
        <Reveal className="flex flex-wrap justify-center gap-2 mt-10">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-5 py-2.5 rounded-full text-[13px] tracking-wide transition-all ${cat === c ? "bg-charcoal text-cream" : "bg-white border border-charcoal/10 text-coffee hover:border-gold"}`}>
              {c}
            </button>
          ))}
        </Reveal>
      )}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => <ProjectCard key={p.id} p={p} />)}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="text-center text-coffee mt-10">No projects in this category yet.</p>}
      {limit && (
        <div className="text-center mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 border border-charcoal/20 px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-charcoal hover:text-cream transition-colors">
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
