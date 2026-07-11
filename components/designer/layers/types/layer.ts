export type LayerType =
  | "image"
  | "text"
  | "svg"
  | "qr";

export type Layer = {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
};