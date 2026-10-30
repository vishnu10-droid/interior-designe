import { Reveal, SectionHeading } from "../components/ui";

export default function CompanyProfileSection() {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Ananya Company Profile"
          title="May 2025 Profile"
          desc="Company profile from May 2025"
          center
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-card border border-charcoal/10">
              <img
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop"
                alt="Ananya Company"
                loading="lazy"
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">Ananya Interior Designs</h2>
                <p className="text-coffee text-base mb-4">
                  Premier interior design studio specializing in residential and commercial spaces.
                </p>
                <p className="text-coffee/70 text-sm leading-relaxed">
                  Based in Agra, we create elegant, functional, and personalized living spaces that blend
                  traditional Indian aesthetics with contemporary global design trends.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2 text-coffee">
                    <span className="w-3 h-3 rounded-full bg-gold"></span>
                    Established 2020
                  </li>
                  <li className="flex items-center gap-2 text-coffee">
                    <span className="w-3 h-3 rounded-full bg-gold"></span>
                    Open 24 Hours
                  </li>
                  <li className="flex items-center gap-2 text-coffee">
                    <span className="w-3 h-3 rounded-full bg-gold"></span>
                    Serving Agra & Beyond
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-cream border-b border-charcoal/8 pb-3">Our Services</h3>
              <ul className="space-y-3 text-coffee">
                <li>Residential Interior Design</li>
                <li>Commercial Interior Design</li>
                <li>Modular Kitchen Design</li>
                <li>3D Visualization & Rendering</li>
                <li>Project Management</li>
                <li>Site Execution & Supervision</li>
              </ul>

              <h3 className="font-serif text-2xl text-cream border-b border-charcoal/8 pb-3">Why Choose Ananya</h3>
              <ul className="space-y-3 text-coffee">
                <li>Personalized design solutions</li>
                <li>Quality materials and finishes</li>
                <li>Transparent pricing</li>
                <li>Timely project delivery</li>
                <li>24/7 client support</li>
                <li>Expert site execution</li>
              </ul>

              <div>
                <h3 className="font-serif text-2xl text-cream border-b border-charcoal/8 pb-3">Contact</h3>
                <p className="text-coffee/70 mt-2">
                  <a href="mailto:contact@ananyadesigns.com" className="hover:text-gold transition-colors">
                    contact@ananyadesigns.com
                  </a>
                </p>
                <p className="text-coffee/70 mt-4">
                  <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}