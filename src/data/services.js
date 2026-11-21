import { Home, Sofa, BedDouble, CookingPot, DoorClosed, Briefcase, LampCeiling, Hammer } from "lucide-react";

export const PHONE = "+91 7351400063 / +91 9837027055";
export const PHONE_LINK = "tel:+917351400063";
export const WHATSAPP_LINK = "https://wa.me/917351400063?text=Hi%20Ananya%20Interior%2C%20I%20want%20a%20trade%20consultation.";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=G-8+Kailash+Tower+Near+ICICI+Bank+Sanjay+Place+Agra+282002";
export const ADDRESS = "21/18, Mangal Sen Bhawan, Freeganj, Agra (U.P) 282004";
export const DISPLAY_CENTRE = "G-8 Kailash Tower, Near ICICI Bank, Sanjay Place, Agra - 282002";
export const GODOWN = "Opp. Maya Devi Cold Storage, Village Ujrai, Hathras Road, Agra - 282006";
export const MOBILE = "+91 9568011400";
export const WEBSITE = "www.ananyaagra.com";

const profileImage = (page, index = 1) =>
  `/images/company-profile/page-${String(page).padStart(2, "0")}-image-${String(index).padStart(2, "0")}.png`;

export const IMAGES = {
  hero: profileImage(1),
  about: profileImage(2),
  aboutSmall: profileImage(26),
  cta: profileImage(4, 3),
  living: profileImage(4, 3),
  bedroom: profileImage(1),
  kitchen: profileImage(4, 3),
  office: profileImage(3),
  dining: profileImage(4, 2),
  luxury: profileImage(4, 1),
  detail: profileImage(25),
};

export const services = [
  { id: "home-interiors", name: "Home Interiors", desc: "Complete interior solutions for modern homes.", icon: Home, image: profileImage(26), status: "Active" },
  { id: "living-room", name: "Living Room", desc: "Elegant spaces tradeed for comfort and personality.", icon: Sofa, image: profileImage(2), status: "Active" },
  { id: "bedroom", name: "Bedroom", desc: "Calm, sophisticated and personalized bedrooms.", icon: BedDouble, image: profileImage(1), status: "Active" },
  { id: "modular-kitchen", name: "Modular Kitchen", desc: "Functional kitchens with modern storage solutions.", icon: CookingPot, image: profileImage(4, 3), status: "Active" },
  { id: "wardrobe", name: "Wardrobe", desc: "Customized wardrobes tradeed around your needs.", icon: DoorClosed, image: profileImage(10), status: "Active" },
  { id: "office-interiors", name: "Office Interiors", desc: "Professional and productive workspace trade.", icon: Briefcase, image: profileImage(3), status: "Active" },
  { id: "false-ceiling", name: "False Ceiling", desc: "Modern ceiling concepts with architectural lighting.", icon: LampCeiling, image: profileImage(4, 2), status: "Active" },
  { id: "renovation", name: "Renovation", desc: "Transform existing spaces into modern interiors.", icon: Hammer, image: profileImage(25), status: "Active" },
  // Ananya Company Profile product categories
  { id: "plywood", name: "Plywood", desc: "Interior, exterior, marine, structural, decorative, BWP, MR, BWR, fire-retardant and sustainable plywood types.", icon: Home, image: profileImage(5), status: "Active" },
  { id: "decorative-laminate", name: "Decorative Laminate", desc: "High Pressure (HPL), Low Pressure (LPL), Compact, Decorative Paper and Thermosetting laminates for furniture and construction.", icon: Sofa, image: profileImage(7), status: "Active" },
  { id: "hpl", name: "HPL (High Pressure Laminates)", desc: "Versatile, durable and aesthetic HPL for building facades, interior trade, furniture and signage.", icon: CookingPot, image: profileImage(23), status: "Active" },
  { id: "veneers", name: "Veneers", desc: "Natural, recon, smoked, dyed and textured wood veneers for furniture and wall enhancement.", icon: DoorClosed, image: profileImage(8), status: "Active" },
  { id: "flooring", name: "Flooring", desc: "Wooden, laminated and other flooring options including solid hardwood, engineered wood, bamboo and HPL flooring.", icon: BedDouble, image: profileImage(16), status: "Active" },
  { id: "thermo-wood", name: "ThermoWood", desc: "Thermo-S (softwood exterior), Thermo-D (deciduous interior/exterior) thermally modified wood for enhanced durability.", icon: LampCeiling, image: profileImage(18), status: "Active" },
  { id: "td-walls", name: "TD Walls", desc: "Solid wood panels, decorative wooden wall panels, tradeer wood mosaics and 3D wall panels (Aster series).", icon: Briefcase, image: profileImage(19), status: "Active" },
  { id: "decmore", name: "Decmore Wall Panels", desc: "Premium tradeer decorative wall panels offering sustainable, eco-friendly surfaces in wide colors and trades.", icon: Hammer, image: profileImage(21), status: "Active" },
  { id: "vox", name: "VOX Panels", desc: "Building materials including Infratop ceiling panels, soffit systems, facade solutions and wall panels.", icon: Briefcase, image: profileImage(22), status: "Active" },
  { id: "wpc-cladding", name: "WPC Cladding & Decking", desc: "Exterior wall covering and outdoor flooring with durability, low maintenance and weather resistance.", icon: Home, image: profileImage(9), status: "Active" },
  { id: "wpc-doors", name: "WPC Boards, Doors & Frames", desc: "Wood plastic composite doors and frames with moisture resistance, termite-proof and fire retardant properties.", icon: DoorClosed, image: profileImage(10), status: "Active" },
  { id: "fcb", name: "Fibre Cement Board (FCB)", desc: "Cement, sand and cellulose fiber boards for exterior cladding, interior partitioning and ceiling linings.", icon: Briefcase, image: profileImage(14, 6), status: "Active" },
];
