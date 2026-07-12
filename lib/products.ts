export type ProductCategory =
  | "tshirts"
  | "hoodies"
  | "mugs"
  | "phone-cases"
  | "accessories"
  | "caps"
  | "home"
  | "bags"
  | "gifts";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  colors: string[];
  featured?: boolean;
  available: boolean;
};

export const categoryLabels: Record<"all" | ProductCategory, string> = {
  "all": "الكل",
  "tshirts": "تيشيرتات",
  "hoodies": "بلوفرات",
  "mugs": "أكواب",
  "phone-cases": "كفرات موبايل",
  "accessories": "ميداليات وإكسسوارات",
  "caps": "كابات",
  "home": "ديكور وخدديات",
  "bags": "حقائب",
  "gifts": "هدايا وتغليف",
};

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-white-tshirt",
    name: "تيشيرت أبيض كلاسيكي",
    category: "tshirts",
    description: "تيشيرت أبيض مناسب لطباعة الصور والعبارات والشعارات.",
    price: 12000,
    image: "/products/classic-white-tshirt.svg",
    colors: ["أبيض"],
    featured: true,
    available: true,
  },
  {
    id: "2",
    slug: "classic-black-tshirt",
    name: "تيشيرت أسود كلاسيكي",
    category: "tshirts",
    description: "تيشيرت أسود أنيق للطباعة الفاتحة والملونة.",
    price: 13000,
    image: "/products/classic-black-tshirt.svg",
    colors: ["أسود"],
    featured: true,
    available: true,
  },
  {
    id: "3",
    slug: "oversized-tshirt",
    name: "تيشيرت أوفر سايز",
    category: "tshirts",
    description: "قصة واسعة وعصرية مناسبة للتصاميم الكبيرة.",
    price: 16000,
    image: "/products/oversized-tshirt.svg",
    colors: ["أسود", "أبيض"],
    featured: true,
    available: true,
  },
  {
    id: "4",
    slug: "hoodie-basic",
    name: "هودي مخصص",
    category: "hoodies",
    description: "هودي دافئ قابل للطباعة على الصدر أو الظهر.",
    price: 25000,
    image: "/products/hoodie-basic.svg",
    colors: ["أسود", "رصاصي"],
    featured: true,
    available: true,
  },
  {
    id: "5",
    slug: "white-mug",
    name: "كوب أبيض",
    category: "mugs",
    description: "كوب سيراميك أبيض مناسب للصور والعبارات.",
    price: 7000,
    image: "/products/white-mug.svg",
    colors: ["أبيض"],
    featured: true,
    available: true,
  },
  {
    id: "6",
    slug: "magic-mug",
    name: "كوب سحري",
    category: "mugs",
    description: "يظهر التصميم عند إضافة المشروب الساخن.",
    price: 11000,
    image: "/products/magic-mug.svg",
    colors: ["أسود"],
    featured: true,
    available: true,
  },
  {
    id: "7",
    slug: "colored-handle-mug",
    name: "كوب ملون المقبض",
    category: "mugs",
    description: "كوب أبيض مع مقبض وداخل ملون.",
    price: 9000,
    image: "/products/colored-handle-mug.svg",
    colors: ["أحمر", "أزرق", "أسود"],
    featured: true,
    available: true,
  },
  {
    id: "8",
    slug: "thermal-tumbler",
    name: "كوب حافظ للحرارة",
    category: "mugs",
    description: "كوب عملي للمشروبات الساخنة والباردة.",
    price: 18000,
    image: "/products/thermal-tumbler.svg",
    colors: ["فضي", "أسود"],
    featured: true,
    available: true,
  },
  {
    id: "9",
    slug: "iphone-case",
    name: "كفر آيفون مخصص",
    category: "phone-cases",
    description: "كفر مخصص بطباعة كاملة حسب التصميم.",
    price: 10000,
    image: "/products/iphone-case.svg",
    colors: ["شفاف", "أسود"],
    featured: false,
    available: true,
  },
  {
    id: "10",
    slug: "samsung-case",
    name: "كفر سامسونج مخصص",
    category: "phone-cases",
    description: "كفر متين قابل للطباعة لموديلات سامسونج.",
    price: 10000,
    image: "/products/samsung-case.svg",
    colors: ["شفاف", "أسود"],
    featured: false,
    available: true,
  },
  {
    id: "11",
    slug: "round-keychain",
    name: "ميدالية دائرية",
    category: "accessories",
    description: "ميدالية خفيفة بطباعة وجهين.",
    price: 4000,
    image: "/products/round-keychain.svg",
    colors: ["فضي"],
    featured: false,
    available: true,
  },
  {
    id: "12",
    slug: "acrylic-keychain",
    name: "ميدالية أكريليك",
    category: "accessories",
    description: "ميدالية أكريليك شفافة بتصميم مخصص.",
    price: 5000,
    image: "/products/acrylic-keychain.svg",
    colors: ["شفاف"],
    featured: false,
    available: true,
  },
  {
    id: "13",
    slug: "round-badge",
    name: "بروش دائري",
    category: "accessories",
    description: "بروش مناسب للمناسبات والفعاليات.",
    price: 2500,
    image: "/products/round-badge.svg",
    colors: ["فضي"],
    featured: false,
    available: true,
  },
  {
    id: "14",
    slug: "baseball-cap",
    name: "كاب مخصص",
    category: "caps",
    description: "كاب بطباعة أو شعار بسيط في الواجهة.",
    price: 12000,
    image: "/products/baseball-cap.svg",
    colors: ["أسود", "أبيض"],
    featured: false,
    available: true,
  },
  {
    id: "15",
    slug: "square-cushion",
    name: "خدادية مربعة",
    category: "home",
    description: "خدادية مخصصة للصور والعبارات والهدايا.",
    price: 14000,
    image: "/products/square-cushion.svg",
    colors: ["أبيض"],
    featured: false,
    available: true,
  },
  {
    id: "16",
    slug: "photo-frame",
    name: "برواز صورة",
    category: "home",
    description: "برواز أنيق لطباعة الصور والذكريات.",
    price: 15000,
    image: "/products/photo-frame.svg",
    colors: ["أسود", "أبيض"],
    featured: false,
    available: true,
  },
  {
    id: "17",
    slug: "canvas-print",
    name: "تابلوه كانفس",
    category: "home",
    description: "طباعة فنية على كانفس للديكور والهدايا.",
    price: 20000,
    image: "/products/canvas-print.svg",
    colors: ["متعدد"],
    featured: false,
    available: true,
  },
  {
    id: "18",
    slug: "tote-bag",
    name: "حقيبة قماش",
    category: "bags",
    description: "حقيبة قماش عملية بطباعة أمامية.",
    price: 10000,
    image: "/products/tote-bag.svg",
    colors: ["بيج", "أبيض"],
    featured: false,
    available: true,
  },
  {
    id: "19",
    slug: "gift-box",
    name: "بوكس هدايا",
    category: "gifts",
    description: "بوكس هدايا قابل للتخصيص بالاسم أو المناسبة.",
    price: 22000,
    image: "/products/gift-box.svg",
    colors: ["أسود", "أبيض"],
    featured: false,
    available: true,
  },
  {
    id: "20",
    slug: "gift-wrap",
    name: "تغليف هدية مخصص",
    category: "gifts",
    description: "تغليف مرتب مع اسم أو عبارة خاصة.",
    price: 6000,
    image: "/products/gift-wrap.svg",
    colors: ["متعدد"],
    featured: false,
    available: true,
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ar-IQ").format(price) + " د.ع";
}
