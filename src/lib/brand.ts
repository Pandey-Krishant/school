export const BRAND = {
  name: "Strawberry Stop",
  tagline: "The one-stop shop for all your kids' and play school essentials",
  metaLine: "ISO 9001:2001 certified · Est. 1990 · New Delhi",
  colors: {
    strawberry: "#E8274B",
    pink: "#FFD6DF",
    cream: "#FFF8F0",
    forest: "#2D6A4F",
    sun: "#FFD166",
  },
} as const;

export const TICKER_ITEMS = [
  "Montessori",
  "Play School",
  "Furniture",
  "Outdoor Play",
  "ISO Certified",
  "Since 1990",
] as const;

export const COLLECTIONS = [
  {
    title: "Montessori Toys",
    subtitle: "Hands-on learning, beautifully built",
    image: "/images/81TQHtP_4ZL._SY741.webp",
    tone: "bg-pink/70",
  },
  {
    title: "Kids Chairs",
    subtitle: "Ergonomic comfort in joyful colors",
    image: "/images/p201705041336284751807.webp",
    tone: "bg-sun/60",
  },
  {
    title: "Chair & Table Sets",
    subtitle: "Classroom-ready, institution-trusted",
    image: "/images/image-of-rubberwood-kindergarten-furniture-setup.webp",
    tone: "bg-cream",
  },
  {
    title: "Indoor Play Equipment",
    subtitle: "Big movement, safe design",
    image:
      "/images/products-that-boost-physical-activity-of-kids-include-wooden-jungle-gyms-pikers-wooden-balancing-boards-wooden-balancing-beams-and-non-wooden-trampolines-slides-etc.webp",
    tone: "bg-forest/10",
  },
  {
    title: "Rugs & Wall Decor",
    subtitle: "Warm spaces kids love to return to",
    image:
      "/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp",
    tone: "bg-pink/40",
  },
  {
    title: "Organisers & Racks",
    subtitle: "Everything in its place—effortlessly",
    image: "/images/WhatsApp_Image_2025-12-15_at_13.16.19.webp",
    tone: "bg-sun/45",
  },
] as const;

export const FEATURED_PRODUCTS = [
  { name: "Rainbow Stack & Sort", price: "₹1,499", badge: "Best Seller" },
  { name: "Montessori Balance Beam", price: "₹3,999", badge: "New" },
  { name: "Mini Reading Nook Chair", price: "₹2,499", badge: "Limited" },
  { name: "Chair + Table Set (4)", price: "₹9,999", badge: "Value" },
  { name: "Sensory Wall Panel", price: "₹2,999", badge: "Trending" },
  { name: "Storage Rack — 12 Bins", price: "₹6,499", badge: "Staff Pick" },
] as const;

