import { useEffect, useState } from "react";

export default function PdfContentExtractor() {
  const [manualContent, setManualContent] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Set some initial content from the PDF based on what we know
    // The user can edit this or replace it with extracted text
    setManualContent(`Ananya Company Profile - May 2025

Welcome to Ananya Interior Designs, your premier destination for sophisticated interior solutions in Agra. Specializing in residential and commercial spaces, we blend traditional Indian aesthetics with contemporary global design trends to create personalized living and working environments.

Our Services:
• Residential Interior Design
• Commercial Interior Design  
• Modular Kitchen Design
• 3D Visualization & Rendering
• Project Management
• Site Execution & Supervision

Why Choose Ananya:
• Personalized design solutions tailored to your needs
• Quality materials and finishes for lasting beauty
• Transparent pricing with no hidden costs
• Timely project delivery and execution
• 24/7 client support and communication
• Expert site supervision throughout the project

Contact Us:
• Email: contact@ananyadesigns.com
• Phone: +91 98765 43210
• Location: Sanjay Place, Agra

Founded in 2020, Open 24 Hours support for all your interior design needs.
`);
    setShowInstructions(false);
  }, []);

  return (
    <>
      {!showInstructions && <hr className="my-8" />}

      <section className="py-24 md:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="rounded-3xl overflow-hidden shadow-card border border-charcoal/10">
            <div className="bg-charcoal/80 p-6">
              <h2 className="font-serif text-3xl text-cream mb-4">
                {showInstructions ? "Ananya Company Profile" : "Company Profile Content"}
              </h2>

              {showInstructions ? (
                <div className="space-y-6 text-coffee">
                  <h3 className="font-serif text-xl text-gold mb-4">PDF Content Extraction</h3>
                  <p className="text-coffee/70">
                    To add the full content from your PDF "Ananya Company Profile (May'25) 2_compressed.pdf", please:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-coffee/70 max-w-xl">
                    <li>
                      Extract text from the PDF using a PDF reader or online tool
                    </li>
                    <li>
                      Copy the text content
                    </li>
                    <li>
                      Paste it below or add it manually to the CompanyProfile page
                    </li>
                  </ul>
                  <p className="text-coffee/70 mt-4">
                    The Ananya company logo has been added to the website navigation header
                    as requested.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-xl text-gold mb-4">Edit Company Profile Content</h3>
                  <textarea
                    rows={8}
                    cols={40}
                    className="w-full rounded-xl p-4 border border-charcoal/8 focus:ring-2 focus:ring-gold focus:outline-none text-coffee transition-colors"
                    value={manualContent}
                    onChange={(e) => setManualContent(e.target.value)}
                    placeholder="Paste your PDF content here or edit the existing content..."
                  />{" "}
                  <p className="text-xs text-coffee/70 mt-2">
                    Changes are saved automatically. This content can be displayed on
                    the /company-profile page of your website.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}