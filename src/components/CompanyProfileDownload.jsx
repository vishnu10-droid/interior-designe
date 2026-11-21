import { ShieldCheck, Users, Truck, Star } from "lucide-react";

export function CompanyProfileDownload() {
  const pdfUrl = "/documents/Ananya Company Profile (May'25) 2_compressed.pdf";

  return (
    <section className="bg-charcoal py-20 md:py-28 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-espresso to-charcoal" />
      <div className="absolute inset-0 bg-radial-at-c from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold font-medium mb-3">
          Company Profile
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-cream mb-6 leading-tight">
          Download Our Company Profile
        </h2>
        <p className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore our complete range of interior and exterior products,
          brand partnerships, and company capabilities. The official
          Ananya company profile (May 2025).
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gold text-charcoal px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white transition-colors shadow-lg shadow-gold/25"
          >
            <ShieldCheck size={16} /> View Company Profile
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white/70 bg-white/5 hover:bg-white hover:text-charcoal text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide backdrop-blur-md transition-all"
          >
            <Star size={16} className="text-gold" /> Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

export function StrengthsSection() {
  const strengths = [
    { icon: ShieldCheck, title: "Quality Products", desc: "Curated materials from India's leading brands." },
    { icon: Users, title: "Expert Consultation", desc: "Knowledgeable advice for all project sizes." },
    { icon: Truck, title: "Pan-India Reach", desc: "Serving architects, builders, and enterprises." },
    { icon: Star, title: "Customer Satisfaction", desc: "Friendly, knowledgeable support for every project." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {strengths.map((s) => (
          <div key={s.title} className="bg-white rounded-2xl p-7 shadow-card border border-charcoal/5 hover:shadow-lift transition-all duration-300 h-full flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-golddark grid place-items-center mb-5">
              <s.icon size={20} />
            </div>
            <h3 className="font-serif text-lg text-charcoal mb-3">{s.title}</h3>
            <p className="text-sm text-coffee leading-relaxed flex-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
