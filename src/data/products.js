// Local fallback used only if a category image fails to load.
export const PRODUCT_RANGE_FALLBACK_IMAGE =
  "/images/company-profile/page-06-image-01.png";

const rangeImage = (page, index = 1) =>
  `/images/company-profile/page-${String(page).padStart(2, "0")}-image-${String(index).padStart(2, "0")}.png`;

export const productRange = [
  { name: "Plywood & Block Boards", image: rangeImage(6), brands: ["GREENPLY", "GreenPanel", "Century", "SRG Premium", "Kalpataru", "Ananya ULTIMA"] },
  { name: "HDHMR & Boilo Boards Plain & Prelaminated", image: rangeImage(12), brands: ["Action TESA", "Greenply", "Merino", "Mother Wood", "Archid"] },
  { name: "Doors", image: rangeImage(11), brands: ["Greenply", "SRG", "Kalpataru", "Dormak"] },
  { name: "Decorative Laminates", image: rangeImage(7), brands: ["Merino", "Greenlam", "Mikasa", "Euro"] },
  { name: "Decorative Veneers", image: rangeImage(22), brands: ["Greenlam Mikasa", "Greenply Deco Crest", "Turakhia"] },
  { name: "Acrylic Laminates", image: rangeImage(20), brands: ["Vivre", "Euro Pratik", "Rehau"] },
  { name: "HPL", image: rangeImage(23), brands: ["Greenlam", "Mikasa", "Century", "Merino"] },
  { name: "ACP", image: rangeImage(21), brands: ["Timex", "Aludecor"] },
  { name: "Stone Veneers", image: rangeImage(24), brands: ["Sattva"] },
  { name: "Soft Stone", image: rangeImage(19), brands: ["MCM"] },
  { name: "Soffit", image: rangeImage(16), brands: ["Vox", "ALWUD"] },
  { name: "Interior Wall Cladding", image: rangeImage(9), brands: ["Decmore", "Euro Pratik", "Vox", "Glo", "Ventura", "Vivre"] },
  { name: "Exterior Wall Cladding", image: rangeImage(24), brands: ["Ventura", "Alfresco", "ALWUD", "Dario"] },
  { name: "FCB Boards", image: rangeImage(14, 6), brands: ["Conwood", "Shera", "Ramco"] },
  { name: "WPC Boards, Doors, Door Frames & Louvers", image: rangeImage(10), brands: ["Century", "Greenply", "Alstone"] },
  { name: "Bamboo Charcoal Sheets & Louvers", image: rangeImage(22), brands: ["Euro Pratik", "Glo", "Treelam"] },
  { name: "Wood & PVC Edgeband", image: rangeImage(18), brands: ["Rehau", "Turakhia"] },
  { name: "Cubicles & Lockers", image: rangeImage(5, 4), brands: ["Merino", "Century", "Greenlam"] },
  { name: "Interior & Exterior Flooring", image: rangeImage(25), brands: ["Action TESA", "Greenlam Mikasa", "European"] },
  { name: "Thermo Treated Woods", image: rangeImage(23), brands: ["Thermo Pine", "Oak", "Ash", "IPE"] },
];

export const productCategories = [
  {
    id: "plywood",
    name: "Plywood",
    slug: "plywood",
    description:
      "There are several types of plywood, each with its own characteristics and uses. Common types include Interior, Exterior, Marine, Structural, Decorative, BWP (Boiling Water Proof), MR (Moisture Resistant), BWR (Boiling Water Resistant), Fire-Retardant and Sustainable plywood. These vary in durability, moisture resistance, and appearance, making them suitable for different applications and projects.",
    types: [
      "Interior Plywood",
      "Exterior Plywood",
      "Marine Plywood",
      "Structural Plywood",
      "Decorative Plywood",
      "BWP (Boiling Water Proof) Plywood",
      "MR (Moisture Resistant) Plywood",
      "BWR (Boiling Water Resistant) Plywood",
      "Fire-Retardant Plywood",
      "Sustainable Plywood",
    ],
    features: ["Moisture resistance", "Durability", "Structural strength", "Decorative finishes"],
    applications: ["Furniture", "Cabinetry", "Interior panelling", "Exterior cladding", "Doors"],
    brands: ["Greenply", "SRG", "Kalapatrau", "ANANYA Compact", "Austin", "Century", "Ironic"],
    image: "/images/company-profile/page-05-image-01.png",
    pdfPage: 5,
    pdfImageCount: 6,
  },
  {
    id: "acrylic-laminates",
    name: "Acrylic Laminates",
    slug: "acrylic-laminates",
    description:
      "Acrylic laminates come in various types including Solid Acrylic, Acrylic-Coated, High-Gloss, Matte, Color-Core and UV-Resistant. These cater to different design needs and applications such as signage and displays, furniture and interior design, retail and exhibition displays, and architectural features.",
    types: [
      "Solid Acrylic Laminates",
      "Acrylic-Coated Laminates",
      "High-Gloss Acrylic Laminates",
      "Matte Acrylic Laminates",
      "Color-Core Acrylic Laminates",
      "UV-Resistant Acrylic Laminates",
    ],
    features: ["High-gloss finish", "UV resistance", "Color stability", "Easy maintenance"],
    applications: ["Signage and displays", "Furniture and interior design", "Retail and exhibition displays", "Architectural features"],
    brands: ["Merino", "NewMika", "Greenlam", "Pedro", "Shivshakti"],
    image: "/images/company-profile/page-06-image-01.png",
    pdfPage: 6,
    pdfImageCount: 1,
  },
  {
    id: "decorative-laminate",
    name: "Decorative Laminates",
    slug: "decorative-laminate",
    description:
      "Decorative laminates are layered materials used to enhance surface aesthetics. Made by bonding layers of paper, resin, and other materials under heat and pressure. Types include High Pressure (HPL), Low Pressure (LPL), Compact, Decorative Paper, Thermosetting, Acrylic and PVC laminates.",
    types: ["HPL", "LPL", "Compact Laminates", "Decorative Paper Laminates", "Thermosetting Laminates", "Acrylic Laminates", "PVC Laminates"],
    features: ["Durability", "Easy maintenance", "Design versatility", "Cost-effective"],
    applications: ["Furniture making", "Interior design", "Building construction", "Signage and displays"],
    brands: ["Merino", "Greenlam", "Century", "NewMika"],
    image: "/images/company-profile/page-07-image-01.png",
    pdfPage: 7,
    pdfImageCount: 1,
  },
  {
    id: "veneers",
    name: "Veneers",
    slug: "veneers",
    description:
      "Veneer is a durable and versatile material used to cover or enhance the appearance of surfaces such as furniture, cabinetry, and walls. Available as natural wood or engineered veneers for design consistency over large spaces. Wood veneers add elegance and sophistication to home interiors.",
    types: ["Natural Veneers", "Recon Veneers", "Smoked Veneers", "Dyed Veneers", "Textured Veneers"],
    features: ["Real wood appearance", "Design consistency", "Elegant finish", "Versatile application"],
    applications: ["Furniture", "Cabinetry", "Wall panelling", "Doors"],
    brands: ["Greenlam Decowood", "Greenply", "Decmore", "Turakhia"],
    image: "/images/company-profile/page-08-image-01.png",
    pdfPage: 8,
    pdfImageCount: 1,
  },
  {
    id: "wpc-cladding-decking",
    name: "WPC Cladding & Decking",
    slug: "wpc-cladding-decking",
    description:
      "WPC (Wood Plastic Composite) cladding and decking for exterior applications. Cladding protects walls from weather conditions while decking is suitable for outdoor decks, patios, and walkways.",
    types: ["Exterior Wall Cladding", "Outdoor Decking"],
    features: ["Weather resistant", "Rot and decay resistant", "Insect damage resistant", "Low maintenance", "Slip-resistant surfaces"],
    applications: ["Exterior wall covering", "Decks", "Patios", "Walkways"],
    brands: ["Ventura", "Alfreso", "Alstone", "Dario"],
    image: "/images/company-profile/page-09-image-01.png",
    pdfPage: 9,
    pdfImageCount: 1,
  },
  {
    id: "wpc-doors-frames",
    name: "WPC Boards, Doors & Frames",
    slug: "wpc-doors-frames",
    description:
      "WPC (Wood Plastic Composite) doors and frames are made from a combination of wood fibers and plastic materials. They offer durability, moisture resistance, low maintenance, sustainability, termite and borer proof properties, and fire retardant characteristics.",
    types: ["WPC Doors", "WPC Frames", "WPC Boards"],
    features: ["Moisture resistance", "Termite and borer proof", "Fire retardant", "Waterproof", "Stable", "Sustainable"],
    applications: ["Interior doors", "Exterior doors", "Door frames"],
    brands: ["Greenply", "Black Cobra", "ALSTONE"],
    image: "/images/company-profile/page-10-image-01.png",
    pdfPage: 10,
    pdfImageCount: 1,
  },
  {
    id: "mdf-hdhmr-boards",
    name: "MDF / HDHMR / Boards",
    slug: "mdf-hdhmr-boards",
    description:
      "Engineered wood boards including Prelaminated MDF (smooth surface, scratch and fade resistant), Particle Boards (cost-effective, lightweight), and HDHMR (high-density, high-molecular-weight resin boards, moisture-resistant, durable, suitable for high-humidity areas).",
    types: ["Prelaminated MDF", "Particle Boards", "HDHMR Boards"],
    features: ["Smooth surface", "Scratch resistant", "Moisture resistant", "Cost-effective", "Warping resistant"],
    applications: ["Furniture making", "Interior applications", "High-humidity areas", "Cabinetry"],
    brands: ["Merino", "Action TESA", "Greenply"],
    image: "/images/company-profile/page-11-image-01.png",
    pdfPage: 11,
    pdfImageCount: 1,
  },
  {
    id: "louvers",
    name: "Louvers",
    slug: "louvers",
    description:
      "Louver systems in Charcoal (charcoal-infused for acoustics and air quality, purifies air and reduces odors), Wooden (natural wood, warm look, stainable or paintable), and PVC (durable, water-resistant, easy to maintain, suitable for high-humidity areas).",
    types: ["Charcoal Louvers", "Wooden Louvers", "PVC Louvers"],
    features: ["Airflow control", "Light control", "Aesthetic appeal", "Water-resistant", "Easy maintenance"],
    applications: ["Windows & doors", "Room dividers", "Decorative elements"],
    brands: ["Decmore", "Unique"],
    image: "/images/company-profile/page-12-image-01.png",
    pdfPage: 12,
    pdfImageCount: 1,
  },
  {
    id: "doors",
    name: "Doors",
    slug: "doors",
    description:
      "Factory-made, ready-to-fit door solutions — an emerging category offering large potential for residential and commercial construction. Doors and frames manufactured as matched pairs in the factory and fixed at the point of use. Also introducing Bacteria Free Laminates.",
    types: ["Factory-made doors", "Door frames", "Matched door & frame sets"],
    features: ["Ready to fit", "Factory manufactured", "Moisture resistant", "Termite proof"],
    applications: ["Residential doors", "Commercial doors", "Interior doors", "Exterior doors"],
    brands: ["Greenply", "Century", "Legend", "ANANYA", "SRG", "Kalapatrau"],
    image: "/images/company-profile/page-10-image-01.png",
    pdfPage: 13,
    pdfImageCount: 0,
  },
  {
    id: "fibre-cement-board",
    name: "Fibre Cement Board (FCB)",
    slug: "fibre-cement-board",
    description:
      "Fibre Cement Board is a building material made from a combination of cement, sand, and cellulose fibers. A versatile, durable, and low-maintenance building material suitable for various applications including exterior cladding, interior partitioning, ceiling linings, and facade cladding.",
    types: ["Grooved & Fluted FCB Panels", "Skirting", "Deck Floor"],
    features: ["Durability", "Fire resistance", "Low maintenance", "Versatility", "Sustainability", "Rot and insect damage resistant"],
    applications: ["Exterior cladding", "Interior partitioning", "Ceiling linings", "Facade cladding"],
    brands: ["Woodium FCB", "Shera FCB", "Ramco", "Ramco HD"],
    image: "/images/company-profile/page-14-image-06.png",
    pdfPage: 14,
    pdfImageCount: 6,
  },
  {
    id: "flooring",
    name: "Flooring",
    slug: "flooring",
    description:
      "Wooden and laminated flooring options including Solid Hardwood, Engineered Wood, Parquet, Bamboo, High-Pressure Laminate (HPL), Direct Pressure Laminate (DPL), Glue-Down, Click-Lock, Reclaimed Wood, Exotic Wood, and Wood-Look Tile flooring.",
    types: ["Solid Hardwood", "Engineered Wood", "Parquet", "Bamboo", "HPL Flooring", "DPL Flooring", "Click-Lock Laminate"],
    features: ["Durable", "Water-resistant options", "Easy installation", "Multiple styles and colors"],
    applications: ["Residential flooring", "Commercial flooring", "Offices", "Restaurants", "Retail environments"],
    brands: ["Action TESA", "BVG", "Greenlam Mikasa", "Unique"],
    image: "/images/company-profile/page-16-image-01.png",
    pdfPage: 16,
    pdfImageCount: 1,
    additionalImages: ["/images/company-profile/page-25-image-01.png"],
  },
  {
    id: "edge-band-tapes",
    name: "Edge Band Tapes",
    slug: "edge-band-tapes",
    description:
      "Edge band tapes in PVC (durable, flexible, moisture and scratch resistant, easy to apply, cost-effective) and Wooden (natural wood for seamless finish, can be stained or painted). Available in different thicknesses, colors, finishes, and wood species.",
    types: ["PVC Edge Band Tapes", "Wooden Edge Band Tapes"],
    features: ["Durable", "Flexible", "Moisture resistant", "Scratch resistant", "Easy to apply", "Cost-effective"],
    applications: ["Furniture making", "Cabinetry", "Interior design"],
    brands: ["Rehau", "E3", "Zarik"],
    image: "/images/company-profile/page-17-image-01.png",
    pdfPage: 17,
    pdfImageCount: 1,
  },
  {
    id: "thermo-wood",
    name: "Thermo Wood",
    slug: "thermo-wood",
    description:
      "Thermally modified wood for enhanced durability. Thermo-S (Softwood) for exterior applications on softwoods like pine. Thermo-D (Deciduous) for interior and exterior applications on deciduous woods. Treatment levels include ThermoWood S (Stable) and ThermoWood D (Durable).",
    types: ["Thermo-S (Softwood)", "Thermo-D (Deciduous)", "ThermoWood S (Stable)", "ThermoWood D (Durable)"],
    features: ["Enhanced durability", "Stability", "Heat-treated", "Ground contact resistance"],
    applications: ["Exterior applications", "Interior applications", "Decking", "Cladding"],
    brands: [],
    image: "/images/company-profile/page-18-image-01.png",
    pdfPage: 18,
    pdfImageCount: 1,
  },
  {
    id: "td-walls",
    name: "TD Walls",
    slug: "td-walls",
    description:
      "Ready-made wooden panels of size 4x2. Product range includes Solid Wood Panels (add warmth without additional tree cutting), Decorative Wooden Wall Panels (suitable for realistic 3D applications), Designer Wood Mosaics (aesthetic appeal), and 3D Wall Panels (various designs like Aster series).",
    types: ["Solid Wood Panels", "Decorative Wooden Wall Panels", "Designer Wood Mosaics", "3D Wall Panels"],
    features: ["Environmental sustainability", "Realistic designs", "Variety of styles", "Ready-made 4x2 size"],
    applications: ["Interior wall cladding", "Decorative walls", "3D wall applications"],
    brands: [],
    image: "/images/company-profile/page-19-image-01.png",
    pdfPage: 19,
    pdfImageCount: 1,
  },
  {
    id: "acp",
    name: "ACP (Aluminium Composite Panel)",
    slug: "acp",
    description:
      "Aluminium Composite Panels consist of two thin aluminum sheets on the outer sides and a non-aluminum core, typically polyethylene or a fire-retardant mineral-filled core. Lightweight, durable, versatile designs, fire-resistant options, low maintenance, and eco-friendly.",
    types: ["Exterior ACP", "Interior ACP", "Fire-Retardant ACP"],
    features: ["Lightweight", "Durable", "Versatile designs", "Fire resistant", "Low maintenance", "Eco-friendly"],
    applications: ["Exterior cladding for building facades", "Interior wall panels", "False ceilings and partitions", "Signage for shopfronts and hoardings", "Canopies and soffits"],
    brands: ["Alu Decor", "Timex"],
    image: "/images/company-profile/page-20-image-01.png",
    pdfPage: 20,
    pdfImageCount: 1,
  },
  {
    id: "decmore-wall-panels",
    name: "Decmore Wall Panels",
    slug: "decmore-wall-panels",
    description:
      "Decmore is a premium designer and manufacturer of high-end decorative wall panels based in India, offering a fresh and sustainable alternative to traditional paneling. Delivers durable, eco-friendly, and aesthetically crafted surfaces in a wide variety of colors and designs.",
    types: ["Ready-to-use wall coverings", "Highlighters", "Wall art", "Fluted panels"],
    features: ["Premium designer quality", "Eco-friendly", "Sustainable", "Wide variety of colors and designs"],
    applications: ["Residential interiors", "Commercial interiors", "Decorative wall surfaces"],
    brands: ["Decmore"],
    image: "/images/company-profile/page-21-image-01.png",
    pdfPage: 21,
    pdfImageCount: 1,
  },
  {
    id: "vox-panels",
    name: "VOX Panels",
    slug: "vox-panels",
    description:
      "VOX offers a comprehensive range of building materials designed to enhance both aesthetics and functionality. Includes building materials (Infratop Ceiling Panels, Soffit Connex System, Facade Solutions, Wall Panels) and ceiling and wall panels (Infratop Four Lamella Sv26, Fronto Sv24, Welo Sv22), plus flooring (Primerra SPC Flooring).",
    types: ["Infratop Ceiling Panels", "Soffit Connex System", "Facade Solutions", "Wall Panels", "Primerra SPC Flooring"],
    features: ["Comprehensive building materials range", "Aesthetic and functional", "PVC panels for interior and exterior"],
    applications: ["Ceiling solutions", "Wall panels", "Facade cladding", "Flooring"],
    brands: ["VOX"],
    image: "/images/company-profile/page-22-image-01.png",
    pdfPage: 22,
    pdfImageCount: 1,
  },
  {
    id: "hpl",
    name: "HPL (High Pressure Laminates)",
    slug: "hpl",
    description:
      "High Pressure Laminates are extensively used due to their versatility, durability, and aesthetic appeal. Crafted through a high-pressure manufacturing process that enhances density and robustness.",
    types: ["HPL Sheets", "HPL Panels", "Compact HPL"],
    features: ["Durability", "Low maintenance", "Design versatility", "Sustainability"],
    applications: ["Building facades and exterior cladding", "Interior design and decoration", "Furniture making and cabinetry", "Signage and branding"],
    brands: ["NewMika FX", "Greenlam Clads", "Century", "Heritage"],
    image: "/images/company-profile/page-23-image-01.png",
    pdfPage: 23,
    pdfImageCount: 1,
  },
  {
    id: "spc-flooring",
    name: "SPC Flooring",
    slug: "spc-flooring",
    description:
      "SPC (Stone Plastic Composite) flooring with key features including durability (scratch and dent resistant), water resistance (waterproof, suitable for moist areas), stability (less prone to temperature-related expansion), easy installation (click-lock system), and low maintenance.",
    types: ["SPC Flooring Planks", "Primerra SPC Flooring"],
    features: ["Scratch resistant", "Waterproof", "Temperature stable", "Click-lock installation", "Low maintenance"],
    applications: ["Residential homes and apartments", "Commercial offices", "Restaurants", "Retail environments"],
    brands: ["VOX Primerra"],
    image: "/images/company-profile/page-24-image-01.png",
    pdfPage: 24,
    pdfImageCount: 1,
  },
];

// Material-family filters used by the Products page. Each entry points to the
// existing category ids, so no product content is duplicated.
export const productFilters = [
  { label: "All", ids: null },
  {
    label: "Boards & Laminates",
    ids: ["plywood", "acrylic-laminates", "decorative-laminate", "mdf-hdhmr-boards", "hpl", "fibre-cement-board", "edge-band-tapes"],
  },
  {
    label: "Wood & Panels",
    ids: ["veneers", "thermo-wood", "td-walls", "decmore-wall-panels", "louvers"],
  },
  {
    label: "Doors & WPC",
    ids: ["doors", "wpc-doors-frames", "wpc-cladding-decking"],
  },
  {
    label: "Flooring",
    ids: ["flooring", "spc-flooring"],
  },
  {
    label: "Facade & Ceiling",
    ids: ["acp", "vox-panels"],
  },
];

// Identical copies produced while extracting images from the company-profile PDF.
// Filtered so a category never shows the same product twice.
const duplicateProfileImages = new Set([
  "/images/company-profile/page-01-image-04.png",
  "/images/company-profile/page-05-image-05.png",
  "/images/company-profile/page-05-image-06.png",
]);

export function getProductImages(category) {
  const pageImages = Array.from(
    { length: category.pdfImageCount },
    (_, index) =>
      `/images/company-profile/page-${String(category.pdfPage).padStart(2, "0")}-image-${String(index + 1).padStart(2, "0")}.png`,
  );

  const images = [...pageImages, ...(category.additionalImages || [])]
    .filter((src) => !duplicateProfileImages.has(src));
  const unique = [...new Set(images)];
  return unique.length > 0 ? unique : [category.image];
}

export const allBrands = [
  "Greenply", "SRG", "Kalapatrau", "ANANYA Compact", "Austin", "Century", "Ironic",
  "Merino", "NewMika", "Greenlam", "Pedro", "Shivshakti",
  "Greenlam Decowood", "Decmore", "Turakhia",
  "Ventura", "Alfreso", "Alstone", "Dario",
  "Black Cobra", "ALSTONE",
  "Action TESA",
  "Unique",
  "Legend",
  "Woodium FCB", "Shera FCB", "Ramco", "Ramco HD",
  "BVG", "Greenlam Mikasa",
  "Rehau", "E3", "Zarik",
  "Alu Decor", "Timex",
  "NewMika FX", "Greenlam Clads", "Heritage",
  "VOX", "VOX Primerra",
];

// Official brand logos (downloaded from each brand's own website / Wikimedia Commons)
// used in the homepage marquee and on the Brands page.
export const featuredBrands = [
  { name: "Greenply", image: "/images/brands/greenply.svg" },
  { name: "Merino", image: "/images/brands/merino.png" },
  { name: "Greenlam", image: "/images/brands/greenlam.png" },
  { name: "Century", image: "/images/brands/century.png" },
  { name: "Decmore", image: "/images/brands/decmore.jpg" },
  { name: "Ramco", image: "/images/brands/ramco.png" },
  { name: "VOX", image: "/images/brands/vox.svg" },
  { name: "Rehau", image: "/images/brands/rehau.png" },
];
