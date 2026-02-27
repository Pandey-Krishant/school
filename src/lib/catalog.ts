export type CatalogProduct = {
  id: string;
  name: string;
  category:
    | "Montessori"
    | "Furniture"
    | "Classroom"
    | "Outdoor"
    | "Storage"
    | "Decor";
  priceInr: number;
  image: string;
  blurb: string;
};

export const CATALOG: CatalogProduct[] = [
  {
    id: "montessori-rainbow-sorter",
    name: "Rainbow Stack & Sort Set",
    category: "Montessori",
    priceInr: 1499,
    image: "/images/81TQHtP_4ZL._SY741.webp",
    blurb: "Color recognition, fine-motor practice, and tidy play in one.",
  },
  {
    id: "sensory-wall-panel",
    name: "Sensory Wall Panel",
    category: "Decor",
    priceInr: 2999,
    image:
      "/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp",
    blurb: "A calm, tactile corner kids keep coming back to.",
  },
  {
    id: "reading-nook-chair",
    name: "Mini Reading Nook Chair",
    category: "Furniture",
    priceInr: 2499,
    image: "/images/p201705041336284751807.webp",
    blurb: "Comfy, sturdy, and kid-sized—perfect for story time corners.",
  },
  {
    id: "chair-table-set",
    name: "Chair + Table Set (4 kids)",
    category: "Classroom",
    priceInr: 9999,
    image: "/images/image-of-rubberwood-kindergarten-furniture-setup.webp",
    blurb: "A classroom staple—durable, stable, and easy to maintain.",
  },
  {
    id: "classroom-setup",
    name: "Kindergarten Classroom Setup Pack",
    category: "Classroom",
    priceInr: 24999,
    image:
      "/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp",
    blurb: "A curated starter pack for new play school classrooms.",
  },
  {
    id: "bin-storage-rack",
    name: "Storage Rack — 12 Bins",
    category: "Storage",
    priceInr: 6499,
    image: "/images/WhatsApp_Image_2025-12-15_at_13.16.19.webp",
    blurb: "Declutter fast: books, blocks, art supplies, everything fits.",
  },
  {
    id: "montessori-shelf",
    name: "Open Montessori Shelf",
    category: "Storage",
    priceInr: 5599,
    image: "/images/WhatsApp_Image_2025-12-15_at_13.16.19.webp",
    blurb: "Front-facing display encourages independent choice and cleanup.",
  },
  {
    id: "activity-table",
    name: "Round Activity Table",
    category: "Furniture",
    priceInr: 7999,
    image: "/images/image-of-rubberwood-kindergarten-furniture-setup.webp",
    blurb: "Smooth edges, stable base—ideal for group crafts and play.",
  },
  {
    id: "montessori-toy-kit",
    name: "Montessori Toy Starter Kit",
    category: "Montessori",
    priceInr: 4499,
    image: "/images/81TQHtP_4ZL._SY741.webp",
    blurb: "A curated set of skill-building toys for early learning.",
  },
  {
    id: "outdoor-movement-pack",
    name: "Outdoor Movement Pack",
    category: "Outdoor",
    priceInr: 12999,
    image:
      "/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp",
    blurb: "Daily movement essentials—safe, sturdy, and school-ready.",
  },
];

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

