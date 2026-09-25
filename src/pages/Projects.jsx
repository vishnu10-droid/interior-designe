import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, CheckCircle2 } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectsSection } from "../components/Projects";
import { PageHero } from "./Services";
import { Reveal } from "../components/ui";

export default function ProjectsPage() {
  return (
    <div className="pt-[72px]">
      <PageHero eyebrow="Portfolio" title="Our Recent Work" desc="Homes, kitchens, offices and commercial spaces across Agra." image={projects[0].image} />
      <ProjectsSection showFilter limit={0} />
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);
  if (!p) {
    return (
      <div className="pt-[72px] max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-serif text-4xl">Project not found</h1>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-6 text-golddark"><ArrowLeft size={16} /> Back to projects</Link>
      </div>
    );
  }
  return (
    <div className="pt-[72px]">
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden bg-charcoal">
        <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-12">
          <Link to="/projects" className="inline-flex items-center gap-2 text-cream/75 text-sm hover:text-cream w-fit"><ArrowLeft size={15} /> All projects</Link>
          <span className="w-fit text-[11px] tracking-[0.25em] uppercase bg-gold text-charcoal px-4 py-1.5 rounded-full mt-5">{p.category}</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4">{p.name}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/75 text-sm mt-4">
            <span className="flex items-center gap-1.5"><MapPin size={14} />{p.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{p.date}</span>
            <span className="flex items-center gap-1.5"><Tag size={14} />{p.status}</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-3 gap-6">
        <Reveal className="md:col-span-2">
          <p className="text-[11px] tracking-[0.3em] uppercase text-golddark">Design Concept</p>
          <p className="font-serif text-2xl mt-3 leading-snug">{p.concept}</p>
          <p className="text-coffee leading-relaxed mt-5">{p.description}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {p.gallery.map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-card img-zoom"><img src={g} alt={`${p.name} view ${i + 1}`} loading="lazy" className="w-full h-64 object-cover" /></div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-white rounded-3xl p-7 shadow-card border border-charcoal/5 h-fit md:sticky md:top-24">
            <h3 className="font-serif text-xl">Design highlights</h3>
            <ul className="mt-4 space-y-3">
              {p.highlights.map((h) => <li key={h} className="flex items-start gap-2.5 text-sm text-charcoal/85"><CheckCircle2 size={16} className="text-golddark mt-0.5 shrink-0" />{h}</li>)}
            </ul>
            <div className="mt-7 rounded-2xl bg-charcoal text-cream p-6 text-center">
              <p className="font-serif text-xl">Want a Similar Space?</p>
              <p className="text-xs text-cream/60 mt-1.5">Free first consultation in Agra.</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-full text-sm font-medium hover:bg-cream transition-colors">Book a Consultation <ArrowRight size={15} /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
