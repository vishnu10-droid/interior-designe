import { Home, Sofa, BedDouble, CookingPot, DoorClosed, Briefcase, LampCeiling, Hammer } from "lucide-react";

export const PHONE = "+91 7351400063 / +91 9837027055";
export const PHONE_LINK = "tel:+917351400063";
export const WHATSAPP_LINK = "https://wa.me/917351400063?text=Hi%20Ananya%20Interior%2C%20I%20want%20a%20design%20consultation.";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=G-8+Kailash+Tower+Near+ICICI+Bank+Sanjay+Place+Agra+282002";
export const ADDRESS = "21/18, Mangal Sen Bhawan, Freeganj, Agra (U.P) 282004";
export const DISPLAY_CENTRE = "G-8 Kailash Tower, Near ICICI Bank, Sanjay Place, Agra - 282002";
export const GODOWN = "Opp. Maya Devi Cold Storage, Village Ujrai, Hathras Road, Agra - 282006";
export const MOBILE = "+91 9568011400";
export const WEBSITE = "www.ananyaagra.com";

const img = (id, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: img("photo-1618221195710-dd6b41faaea6", 2000),
  about: img("photo-1600210492486-724fe5c67fb0"),
  aboutSmall: img("photo-1600607687939-ce8a6c25118c", 800),
  living: img("photo-1600566753086-00f18fb6b3ea"),
  bedroom: img("photo-1616594039964-ae9021a400a0"),
  kitchen: img("photo-1556911220-bff31c812dba"),
  office: img("photo-1497366216548-37526070297c"),
  dining: img("photo-1617806118233-18e1de247200"),
  luxury: img("photo-1600585154340-be6161a56a0c"),
  detail: img("photo-1600607687920-4e2a09cf159d"),
};

export const services = [
  { id: "home-interiors", name: "Home Interiors", desc: "Complete interior solutions for modern homes.", icon: Home, image: img("photo-1600585154340-be6161a56a0c"), status: "Active" },
  { id: "living-room", name: "Living Room", desc: "Elegant spaces designed for comfort and personality.", icon: Sofa, image: img("photo-1600566753086-00f18fb6b3ea"), status: "Active" },
  { id: "bedroom", name: "Bedroom", desc: "Calm, sophisticated and personalized bedrooms.", icon: BedDouble, image: img("photo-1616594039964-ae9021a400a0"), status: "Active" },
  { id: "modular-kitchen", name: "Modular Kitchen", desc: "Functional kitchens with modern storage solutions.", icon: CookingPot, image: img("photo-1556911220-bff31c812dba"), status: "Active" },
  { id: "wardrobe", name: "Wardrobe", desc: "Customized wardrobes designed around your needs.", icon: DoorClosed, image: img("photo-1616486338812-3dadae4b4ace"), status: "Active" },
  { id: "office-interiors", name: "Office Interiors", desc: "Professional and productive workspace design.", icon: Briefcase, image: img("photo-1497366216548-37526070297c"), status: "Active" },
  { id: "false-ceiling", name: "False Ceiling", desc: "Modern ceiling concepts with architectural lighting.", icon: LampCeiling, image: img("photo-1600607687939-ce8a6c25118c"), status: "Active" },
  { id: "renovation", name: "Renovation", desc: "Transform existing spaces into modern interiors.", icon: Hammer, image: img("photo-1600210492486-724fe5c67fb0"), status: "Active" },
  // Ananya Company Profile product categories
  { id: "plywood", name: "Plywood", desc: "Interior, exterior, marine, structural, decorative, BWP, MR, BWR, fire-retardant and sustainable plywood types.", icon: Home, status: "Active" },
  { id: "decorative-laminate", name: "Decorative Laminate", desc: "High Pressure (HPL), Low Pressure (LPL), Compact, Decorative Paper and Thermosetting laminates for furniture and construction.", icon: Sofa, status: "Active" },
  { id: "hpl", name: "HPL (High Pressure Laminates)", desc: "Versatile, durable and aesthetic HPL for building facades, interior design, furniture and signage.", icon: CookingPot, status: "Active" },
  { id: "veneers", name: "Veneers", desc: "Natural, recon, smoked, dyed and textured wood veneers for furniture and wall enhancement.", icon: DoorClosed, status: "Active" },
  { id: "flooring", name: "Flooring", desc: "Wooden, laminated and other flooring options including solid hardwood, engineered wood, bamboo and HPL flooring.", icon: BedDouble, status: "Active" },
  { id: "thermo-wood", name: "ThermoWood", desc: "Thermo-S (softwood exterior), Thermo-D (deciduous interior/exterior) thermally modified wood for enhanced durability.", icon: LampCeiling, status: "Active" },
  { id: "td-walls", name: "TD Walls", desc: "Solid wood panels, decorative wooden wall panels, designer wood mosaics and 3D wall panels (Aster series).", icon: Briefcase, status: "Active" },
  { id: "decmore", name: "Decmore Wall Panels", desc: "Premium designer decorative wall panels offering sustainable, eco-friendly surfaces in wide colors and designs.", icon: Hammer, status: "Active" },
  { id: "vox", name: "VOX Panels", desc: "Building materials including Infratop ceiling panels, soffit systems, facade solutions and wall panels.", icon: Briefcase, status: "Active" },
  { id: "wpc-cladding", name: "WPC Cladding & Decking", desc: "Exterior wall covering and outdoor flooring with durability, low maintenance and weather resistance.", icon: Home, status: "Active" },
  { id: "wpc-doors", name: "WPC Boards, Doors & Frames", desc: "Wood plastic composite doors and frames with moisture resistance, termite-proof and fire retardant properties.", icon: DoorClosed, status: "Active" },
  { id: "fcb", name: "Fibre Cement Board (FCB)", desc: "Cement, sand and cellulose fiber boards for exterior cladding, interior partitioning and ceiling linings.", icon: Briefcase, status: "Active" },
];
