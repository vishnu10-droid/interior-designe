import { MessagesSquare, Ruler, PenTool, Layers, HardHat, KeyRound } from "lucide-react";
import { SectionHeading, StaggerContainer, StaggerItem } from "./ui";
import { Award, Compass, LayoutGrid, Gem, MessagesCircle, Users, PackageCheck, Headset, Timer } from "lucide-react";
import { motion } from "framer-motion";

export const steps = [
  { n: "01", title: "Consultation", desc: "We listen to your needs, lifestyle and budget.", icon: MessagesSquare },
  { n: "02", title: "Understanding Your Space", desc: "Site visit, measurements and light study.", icon: Ruler },
  { n: "03", title: "Concept & Trade", desc: "Moodboards, layouts and 3D views.", icon: PenTool },
  { n: "04", title: "Material Selection", desc: "Curated finishes, fabrics and fixtures.", icon: Layers },
  { n: "05", title: "Execution", desc: "Skilled site team with quality checks.", icon: HardHat },
  { n: "06", title: "Final Reveal", desc: "Deep-cleaned, styled and ready to move in.", icon: KeyRound },
];

export function ProcessSection() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading light eyebrow="How We Work" title="From Vision to Reality" desc="A calm, transparent process — you always know what happens next." />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12" stagger={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.n} direction={["left", "up", "right"][i % 3]}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-7 hover:border-gold/50 hover:bg-white/[0.07] transition-colors h-full">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-gold/15 text-gold grid place-items-center"><s.icon size={20} /></span>
                  <span className="font-serif text-4xl text-white/10">{s.n}</span>
                </div>
                <h3 className="font-serif text-xl text-cream mt-5">{s.title}</h3>
                <p className="text-sm text-cream/60 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

const feats = [
  { icon: Compass, title: "Personalized Trade", desc: "Every plan starts from your lifestyle, not a catalogue." },
  { icon: Gem, title: "Modern Aesthetics", desc: "Timeless palettes with quiet luxury detailing." },
  { icon: LayoutGrid, title: "Functional Planning", desc: "Storage, movement and light — resolved first." },
  { icon: Award, title: "Quality Materials", desc: "Branded hardware and verified finishes." },
  { icon: PenTool, title: "Attention to Detail", desc: "Joints, edges and paint lines we obsess over." },
  { icon: MessagesCircle, title: "Transparent Communication", desc: "Clear quotes, weekly site updates." },
  { icon: Users, title: "Experienced Team", desc: "Tradeers + site supervisors under one roof." },
  { icon: PackageCheck, title: "End-to-End Solutions", desc: "Trade to handover — one accountable partner." },
];

const highlights = [
  {
    icon: Users,
    title: "Expert Tradeers",
    desc: "Tradeers and site supervisors under one roof, translating your lifestyle into thoughtful, detail-led interiors.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "Branded hardware and verified finishes from the material brands we have trusted since 1995.",
  },
  {
    icon: Timer,
    title: "On-Time Delivery",
    desc: "Clear timelines, weekly site updates and a handover that respects your schedule.",
  },
];

export function HighlightsSection() {
  return (
    <section id="highlights" className="bg-cream py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="The Studio Difference"
          title="Why Choose Ananya?"
          desc="Three things we never compromise on — the people, the materials and the promise of time."
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12" stagger={0.12}>
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <StaggerItem key={title} direction={["left", "up", "right"][i % 3]}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group flex h-full items-start gap-5 rounded-2xl border border-charcoal/5 bg-white p-7 shadow-card hover:border-gold/40 hover:shadow-lift transition-colors duration-300"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-beige text-espresso transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-serif text-xl text-charcoal">{title}</h3>
                  <p className="text-sm text-coffee mt-2 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="text-center text-xs text-stonewarm mt-10 flex items-center justify-center gap-2">
          <Headset size={14} /> Open 24 Hours — call or WhatsApp anytime for guidance.
        </p>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHeading eyebrow="The Studio Difference" title="Why Choose Ananya?" />
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12" stagger={0.1}>
        {feats.map((f, i) => (
          <StaggerItem key={f.title} direction={["left", "up", "right", "up"][i % 4]}>
            <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-lift hover:-translate-y-1 transition-all duration-300 h-full border border-charcoal/5">
              <span className="w-12 h-12 rounded-xl bg-beige text-espresso grid place-items-center"><f.icon size={20} /></span>
              <h3 className="font-serif text-xl mt-5">{f.title}</h3>
              <p className="text-sm text-coffee mt-2 leading-relaxed">{f.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <p className="text-center text-xs text-stonewarm mt-10 flex items-center justify-center gap-2"><Headset size={14} /> Open 24 Hours — call or WhatsApp anytime for guidance.</p>
    </section>
  );
}
