export type DesignPlacement = {
  top: string;
  left: string;
  width: string;
  height: string;
  rotate?: number;
  borderRadius?: string;
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten";
};

export const placements: Record<string, DesignPlacement> = {
  تيشيرت: {
    top: "48%",
    left: "50%",
    width: "24%",
    height: "28%",
    rotate: 0,
    mixBlendMode: "multiply",
  },

  هودي: {
    top: "49%",
    left: "50%",
    width: "22%",
    height: "24%",
    rotate: 0,
    mixBlendMode: "multiply",
  },

  كوب: {
    top: "51%",
    left: "56%",
    width: "25%",
    height: "31%",
    rotate: 0,
    borderRadius: "8px",
    mixBlendMode: "multiply",
  },

  "كفر موبايل": {
    top: "58%",
    left: "50%",
    width: "32%",
    height: "38%",
    rotate: 0,
    borderRadius: "14px",
    mixBlendMode: "normal",
  },

  بوستر: {
    top: "50%",
    left: "50%",
    width: "55%",
    height: "67%",
    rotate: 0,
    borderRadius: "4px",
    mixBlendMode: "normal",
  },
};

export function getDesignPlacement(
  product: string
): DesignPlacement {
  return (
    placements[product] ?? {
      top: "50%",
      left: "50%",
      width: "30%",
      height: "30%",
      rotate: 0,
      mixBlendMode: "normal",
    }
  );
}