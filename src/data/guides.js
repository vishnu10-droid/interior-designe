// Material education content supplied by Bansal Wood Decor.
// Each item carries its own local product/material image.
const img = (page, index = 1) =>
  `/images/company-profile/page-${String(page).padStart(2, "0")}-image-${String(index).padStart(2, "0")}.png`;

export const GUIDE_FALLBACK_IMAGE = img(6);

// Local image references used across the guide cards.
const IMG = {
  plywood: img(6),
  boards: img(9),
  hdf: img(12),
  doorWhite: img(11),
  doorDark: img(14, 6),
  doorWood: img(10),
  laminate: img(7),
  panelPattern: img(20),
  woodPanels: img(23),
  facade: img(21),
  exterior: img(24),
  cladding: img(19),
  louvers: img(16),
  slats: img(22),
  edgeBand: img(18),
  flooring: img(25),
  tradeer: img(8),
};

export const materialGuides = [
  {
    id: "plywood",
    label: "Plywood & Block Boards",
    intro: "At Bansal Wood Decor, we always guide our customers to choose the right board for the right space. Because the right material means furniture that lasts for decades.",
    sections: [
      {
        title: "Plywood Types",
        items: [
          { name: "MR Plywood – Moisture Resistant", text: "Light weight, smooth finish and budget-friendly.", bestFor: "bedroom furniture, wardrobes, TV units and all dry areas.", image: IMG.plywood },
          { name: "BWR Plywood – Boiling Water Resistant", text: "Strong bonding and termite resistant.", bestFor: "kitchen shutters, bathroom vanity and dining tables.", image: IMG.boards },
          { name: "BWP Plywood – Boiling Water Proof / Marine", text: "100% waterproof and strongest of all. Life 25+ years.", bestFor: "kitchen, bathroom, outdoor furniture and heavy-use areas.", image: IMG.hdf },
          { name: "Flexi Plywood", text: "Bends easily for curves.", bestFor: "round pillars, arches, curved panels and reception desks.", image: IMG.slats },
          { name: "Calibrated Plywood", text: "Perfect equal thickness, machine pressed.", bestFor: "modular kitchens, CNC work and premium finishing.", image: IMG.plywood },
          { name: "Fire Retardant Plywood", text: "Slow burning and fire-safe.", bestFor: "offices, hospitals, schools, theatres and commercial spaces.", image: IMG.hdf },
        ],
      },
      {
        title: "Block Boards – For Doors & Big Sizes",
        items: [
          { name: "Softwood Block Board", text: "Light and economical.", bestFor: "partitions, small shelves and light furniture.", image: IMG.woodPanels },
          { name: "Hardwood Block Board", text: "Very strong, does not bend.", bestFor: "doors, large dining tables, bookshelves and bed frames.", image: IMG.plywood },
          { name: "BWP Block Board", text: "Waterproof and heavy duty.", bestFor: "kitchen doors and bathroom doors.", image: IMG.hdf },
        ],
      },
    ],
  },
  {
    id: "doors",
    label: "Types of Doors",
    intro: "At Bansal Wood Decor, we help you choose the right door for the right space. A good door is not just about looks, it is about safety, strength and daily comfort.",
    sections: [
      {
        title: "Know The Difference",
        items: [
          { name: "Flush Door", text: "Simple, flat and smooth surface. Light weight and budget-friendly.", bestFor: "bedrooms, bathrooms and interior rooms.", image: IMG.doorWhite },
          { name: "Panel Door / Moulded Door", text: "Beautiful trade with panels and moulding. Premium look.", bestFor: "main entrance, living room and bedroom doors.", image: IMG.doorDark },
          { name: "Solid Wood Door", text: "Made from pure hardwood like Teak, Sagwan. Very strong, heavy and long-lasting.", bestFor: "main entrance, villa and premium homes.", image: IMG.doorWood },
          { name: "Laminated Door", text: "Plywood door with laminate finish. Many colours and textures available. Easy to maintain.", bestFor: "bedroom, kitchen and modern interiors.", image: IMG.doorDark },
          { name: "Veneer Door", text: "Natural wood look with real veneer finish. Elegant and classy.", bestFor: "living room, study room and luxury homes.", image: IMG.slats },
          { name: "PVC / WPC Door", text: "100% waterproof, termite-proof and no maintenance.", bestFor: "bathrooms, toilets and wet areas.", image: IMG.doorWhite },
        ],
      },
    ],
  },
  {
    id: "laminates",
    label: "Decorative Laminates",
    intro: "At Bansal Wood Decor, laminates are the soul of your furniture. The right laminate gives the right look, feel and life to your interiors.",
    sections: [
      {
        title: "Know The Difference",
        items: [
          { name: "Glossy Laminate", text: "High shine, mirror-like finish. Looks premium and modern.", bestFor: "wardrobes, TV units, kitchen shutters and showroom furniture. Gives a rich, luxurious feel.", image: IMG.laminate },
          { name: "Matte Laminate", text: "Soft, no-shine finish. Elegant and calm look. No fingerprints.", bestFor: "bedroom wardrobes, study tables, living room panels and modern homes.", image: IMG.panelPattern },
          { name: "Textured Laminate", text: "Feels like real wood, fabric or stone. Natural touch.", bestFor: "bed back panels, wardrobes, TV walls and luxury interiors.", image: IMG.boards },
          { name: "Wooden / Wood Grain Laminate", text: "Looks exactly like real teak, walnut, oak. Budget-friendly alternative to real wood.", bestFor: "doors, wardrobes, dining tables and classic interiors.", image: IMG.woodPanels },
          { name: "Solid Colour Laminate", text: "Single clean colour, available in 100+ shades. Simple and trendy.", bestFor: "kids room, modular kitchen, office furniture and contemporary homes.", image: IMG.laminate },
          { name: "Metallic / Mirror Laminate", text: "Shiny metallic and mirror effect. Very stylish.", bestFor: "wardrobe accents, bar units, boutique and commercial spaces.", image: IMG.facade },
          { name: "Acrylic Laminate", text: "Super glossy, glass-like premium finish. Very smooth and rich.", bestFor: "high-end modular kitchens, wardrobes and luxury furniture.", image: IMG.panelPattern },
          { name: "Super Matte / Anti-Fingerprint Laminate", text: "Ultra soft touch, no fingerprints, no marks.", bestFor: "premium wardrobes, kitchen shutters and tradeer furniture.", image: IMG.panelPattern },
          { name: "Digital / Tradeer Laminate", text: "Printed trades, patterns, 3D effects. Unique and creative.", bestFor: "kids room, cafe, showroom, feature walls.", image: IMG.tradeer },
          { name: "Exterior Grade Laminate", text: "Weather-proof, UV-proof and waterproof.", bestFor: "outdoor furniture, balcony panels, shop front and exterior cladding.", image: IMG.exterior },
        ],
      },
    ],
    rule: [
      "Luxury Kitchen & Wardrobe – Acrylic / Super Matte",
      "Bedroom – Matte / Textured / Wooden",
      "Modern Home – Solid Colour / Glossy",
      "Shop & Cafe – Metallic / Digital",
      "Outdoor – Exterior Grade",
    ],
  },
  {
    id: "veneers",
    label: "Decorative Veneers",
    intro: "At Bansal Wood Decor, veneer is for those who love the real beauty of natural wood. It is not a print, it is real wood – thin, elegant and timeless.",
    sections: [
      {
        title: "Know The Difference",
        items: [
          { name: "Natural Veneer", text: "Made from real wood slice. Every sheet has a unique natural grain. No two pieces are same.", bestFor: "luxury wardrobes, bed back panels, dining tables and premium homes. Gives a warm, royal feel.", image: IMG.slats },
          { name: "Recon / Engineered Veneer", text: "Made by re-joining natural wood to create a perfect, uniform grain. Consistent colour and pattern.", bestFor: "large projects, offices, hotels and modern interiors where matching is important.", image: IMG.boards },
          { name: "Smoked Veneer", text: "Wood is treated with smoke to get deep, dark rich colour. Very premium and dramatic.", bestFor: "TV walls, bar units, study rooms and luxury lounges.", image: IMG.woodPanels },
          { name: "Dyed Veneer", text: "Natural veneer coloured in shades like grey, black, walnut, wenge. Trendy and tradeer look.", bestFor: "contemporary homes, cafes, boutiques and feature walls.", image: IMG.laminate },
          { name: "Burl / Figured Veneer", text: "Rare, beautiful swirls and natural figures in wood. Very exclusive.", bestFor: "statement furniture, centre tables, headboards and tradeer pieces.", image: IMG.slats },
          { name: "Teak Veneer", text: "Classic Indian favourite. Golden brown, strong grain.", bestFor: "main doors, wardrobes, living room furniture and traditional homes.", image: IMG.woodPanels },
          { name: "Walnut Veneer", text: "Dark brown, rich and sophisticated.", bestFor: "luxury bedrooms, libraries, offices and premium wardrobes.", image: IMG.boards },
          { name: "Oak Veneer", text: "Light, straight grain, Scandinavian look.", bestFor: "modern homes, minimal interiors, kids room and light theme furniture.", image: IMG.slats },
          { name: "Wenge / Ebony Veneer", text: "Almost black, very deep and bold.", bestFor: "luxury TV units, bar counters, high-end offices.", image: IMG.doorDark },
          { name: "Fabric / Paper-Backed Veneer", text: "Veneer pasted on flexible backing. Easy to apply on curves.", bestFor: "curved panels, pillars, round tables and tradeer ceilings.", image: IMG.panelPattern },
        ],
      },
    ],
    rule: [
      "Luxury & Royal Look – Natural / Teak / Walnut",
      "Modern & Light Look – Oak / Recon Veneer",
      "Bold & Tradeer Look – Smoked / Dyed / Burl",
      "Curved Furniture – Paper-Backed Veneer",
    ],
    note: "Veneer needs polishing and care, but it gives a look that no laminate can match – Real Wood, Real Class.",
  },
  {
    id: "wall-panels",
    label: "Wall Panels",
    intro: "At Bansal Wood Decor, wall panels are the easiest way to change the whole look of your home or shop – without breaking walls. One wall is enough to make your space look premium.",
    sections: [
      {
        title: "For Interior",
        items: [
          { name: "PVC Wall Panel", text: "Light weight, waterproof and very easy to install. No paint, no polish needed. Budget-friendly and long-lasting.", bestFor: "living room, bedroom, ceiling, office and rental homes.", image: IMG.panelPattern },
          { name: "WPC Wall Panel", text: "Wood + Plastic mix. Strong, waterproof and termite-proof. Looks like real wood.", bestFor: "TV walls, bed back walls, office cabins and lobbies.", image: IMG.boards },
          { name: "Wooden / Veneer Wall Panel", text: "Real wood finish, warm and luxurious.", bestFor: "living room, bedroom, study room and luxury homes. Gives a royal, classy feel.", image: IMG.slats },
          { name: "Laminate Wall Panel", text: "Plywood or MDF base with laminate finish. 1000+ colours and textures.", bestFor: "wardrobes wall, TV units, showrooms and modern interiors.", image: IMG.laminate },
          { name: "3D Wall Panel", text: "Raised trade, stone, wave and geometric patterns. Very stylish.", bestFor: "TV back wall, entrance wall, cafe, salon and boutique.", image: IMG.panelPattern },
          { name: "Acoustic / Fabric Wall Panel", text: "Absorbs sound, reduces echo. Soft and premium.", bestFor: "home theatre, bedroom, office meeting room, studio and hospital.", image: IMG.panelPattern },
          { name: "Charcoal Panel / Louver Panel", text: "Slim vertical lines, modern look. Very trending now.", bestFor: "TV wall, bed back, partition and office background.", image: IMG.louvers },
          { name: "Stone / Marble Finish Panel", text: "Looks like real marble and stone, but light and low cost.", bestFor: "living room, lobby, bathroom wall and commercial spaces.", image: IMG.exterior },
        ],
      },
      {
        title: "For Exterior",
        items: [
          { name: "ACP Panel – Aluminium Composite Panel", text: "Weather-proof, UV-proof and very strong.", bestFor: "shop front, building facade, balcony and exterior cladding.", image: IMG.facade },
          { name: "HPL / Exterior Laminate Panel", text: "Waterproof, sun-proof and scratch-proof.", bestFor: "exterior walls, balcony, terrace and outdoor furniture.", image: IMG.woodPanels },
          { name: "WPC Exterior Panel", text: "Does not fade in sun or rain.", bestFor: "exterior walls, garden walls, farmhouse and resort.", image: IMG.cladding },
          { name: "Natural Stone Cladding Panel", text: "Real stone look, very durable.", bestFor: "main entrance wall, villa exterior and temple / feature wall.", image: IMG.exterior },
        ],
      },
    ],
  },
];
