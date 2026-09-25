import { MessagesSquare, Ruler, PenTool, Layers, HardHat, KeyRound } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { Award, Compass, LayoutGrid, Gem, MessagesCircle, Users, PackageCheck, Headset } from "lucide-react";

export const steps = [
  { n: "01", title: "Consultation", desc: "We listen to your needs, lifestyle and budget.", icon: MessagesSquare },
  { n: "02", title: "Understanding Your Space", desc: "Site visit, measurements and light study.", icon: Ruler },
  { n: "03", title: "Concept & Design", desc: "Moodboards, layouts and 3D views.", icon: PenTool },
  { n: "04", title: "Material Selection", desc: "Curated finishes, fabrics and fixtures.", icon: Layers },
  { n: "05", title: "Execution", desc: "Skilled site team with quality checks.", icon: HardHat },
  { n: "06", title: "Final Reveal", desc: "Deep-cleaned, styled and ready to move in.", icon: KeyRound },
];

export function ProcessSection() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading light eyebrow="How We Work" title="From Vision to Reality" desc="A calm, transparent process — you always know what happens next." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-7 hover:border-gold/50 hover:bg-white/[0.07] transition-colors h-full">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-gold/15 text-gold grid place-items-center"><s.icon size={20} /></span>
                  <span className="font-serif text-4xl text-white/10">{s.n}</span>
                </div>
                <h3 className="font-serif text-xl text-cream mt-5">{s.title}</h3>
                <p className="text-sm text-cream/60 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const feats = [
  { icon: Compass, title: "Personalized Design", desc: "Every plan starts from your lifestyle, not a catalogue." },
  { icon: Gem, title: "Modern Aesthetics", desc: "Timeless palettes with quiet luxury detailing." },
  { icon: LayoutGrid, title: "Functional Planning", desc: "Storage, movement and light — resolved first." },
  { icon: Award, title: "Quality Materials", desc: "Branded hardware and verified finishes." },
  { icon: PenTool, title: "Attention to Detail", desc: "Joints, edges and paint lines we obsess over." },
  { icon: MessagesCircle, title: "Transparent Communication", desc: "Clear quotes, weekly site updates." },
  { icon: Users, title: "Experienced Team", desc: "Designers + site supervisors under one roof." },
  { icon: PackageCheck, title: "End-to-End Solutions", desc: "Design to handover — one accountable partner." },
];

export function WhySection() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading eyebrow="The Studio Difference" title="Why Choose AF Interior?" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {feats.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.07}>
            <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-lift hover:-translate-y-1 transition-all duration-300 h-full border border-charcoal/5">
              <span className="w-12 h-12 rounded-xl bg-beige text-espresso grid place-items-center"><f.icon size={20} /></span>
              <h3 className="font-serif text-lg mt-5">{f.title}</h3>
              <p className="text-sm text-coffee mt-2 leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="text-center text-xs text-stonewarm mt-10 flex items-center justify-center gap-2"><Headset size={14} /> Open 24 Hours — call or WhatsApp anytime for guidance.</p>
    </section>
  );
}
