import { useState } from "react";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { projects } from "../data/projects";
import { DetailModal, SectionHeading, StaggerContainer, StaggerItem } from "./ui";

export function ProjectsSection() {
  const [active, setActive] = useState(null);
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-3 md:px-5 py-17 md:py-25">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Spaces We're Proud Of"
        desc="A selection of homes, kitchens and workplaces crafted across Agra. Select a project to explore the story behind it."
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-12" stagger={0.11}>
        {featured.map((project, i) => (
          <StaggerItem key={project.id} direction={["left", "up", "right", "up"][i % 4]} scale={0.94} className="h-full">
            <article className="group relative h-full overflow-hidden rounded-2xl bg-charcoal shadow-card hover:shadow-lift transition-shadow duration-500">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-espresso font-medium backdrop-blur">
                {project.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-serif text-xl text-cream leading-tight">{project.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-cream/70">
                  <MapPin size={12} /> {project.location}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="group/link mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold transition-colors hover:text-cream"
                >
                  View Project
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </button>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <DetailModal open={Boolean(active)} onClose={() => setActive(null)} label={active?.name || "Project details"}>
        {active && (
          <div>
            <img src={active.image} alt={active.name} className="max-h-[46vh] w-full object-cover" />
            <div className="px-6 pb-8 pt-6 md:px-9">
              <p className="text-[11px] tracking-[0.28em] uppercase text-golddark">{active.category} · {active.location}</p>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-2">{active.name}</h3>
              <p className="text-coffee text-[15px] leading-relaxed mt-4">{active.description}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {active.highlights.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-charcoal/85">
                    <CheckCircle2 size={15} className="text-golddark shrink-0" /> {item}
                  </p>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {active.gallery.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${active.name} view ${i + 1}`}
                    loading="lazy"
                    className="h-24 w-full rounded-xl object-cover md:h-32"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>
    </section>
  );
}
