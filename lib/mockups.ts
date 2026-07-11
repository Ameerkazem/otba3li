export type MockupConfig = {
  image: string;
};

export const mockups: Record<
  string,
  Record<string, MockupConfig>
> = {
  تيشيرت: {
    أبيض: {
      image: "/products/tshirts/tshirt-white.jpg",
    },
    أسود: {
      image: "/products/tshirts/tshirt-black.jpg",
    },
  },

  هودي: {
    أبيض: {
      image: "/products/hoodies/hoodie-white.jpg",
    },
    أسود: {
      image: "/products/hoodies/hoodie-black.png",
    },
  },

  كوب: {
    أبيض: {
      image: "/products/mugs/mug-white.jpg",
    },
  },

  "كفر موبايل": {
    أسود: {
      image: "/products/phone-cases/phone-case-black.png",
    },
  },

  بوستر: {
    أبيض: {
      image: "/products/posters/poster-white.jpg",
    },
  },
};

export function getMockupImage(
  product: string,
  color: string
): string | null {
  if (!product) return null;

  const productMockups = mockups[product];

  if (!productMockups) return null;

  if (color && productMockups[color]) {
    return productMockups[color].image;
  }

  const firstMockup = Object.values(productMockups)[0];

  return firstMockup?.image ?? null;
}