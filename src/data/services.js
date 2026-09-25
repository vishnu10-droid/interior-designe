import { Home, Sofa, BedDouble, CookingPot, DoorClosed, Briefcase, LampCeiling, Hammer } from "lucide-react";

export const PHONE = "098973 13419";
export const PHONE_LINK = "tel:+919897313419";
export const WHATSAPP_LINK = "https://wa.me/919897313419?text=Hi%20AF%20Interior%2C%20I%20want%20a%20design%20consultation.";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=AF+Interior+Sanjay+Place+Civil+Lines+Agra+282002";
export const ADDRESS = "Shop No. 1, Block No. 4, Cloth Market, GG Hospital, Sanjay Palace, Sanjay Place, Civil Lines, Agra, Uttar Pradesh – 282002";

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
];
