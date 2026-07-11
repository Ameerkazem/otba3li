export type Product = {
  id: string;
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "tshirt",
    name: "تيشيرت",
    price: 15000,
    colors: ["أبيض", "أسود"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  {
    id: "hoodie",
    name: "هودي",
    price: 25000,
    colors: ["أبيض", "أسود"],
    sizes: ["M", "L", "XL", "XXL"],
  },

  {
    id: "mug",
    name: "كوب",
    price: 10000,
    colors: ["أبيض"],
    sizes: [],
  },

  {
    id: "phone-case",
    name: "كفر موبايل",
    price: 12000,
    colors: ["أسود"],
    sizes: [],
  },

  {
    id: "poster",
    name: "بوستر",
    price: 8000,
    colors: ["أبيض"],
    sizes: [],
  },
];