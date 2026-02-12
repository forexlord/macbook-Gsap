import { create } from "zustand";

const useMacbookStore = create((set) => ({
  color: "#2e2c2e",
  scale: 0.08,
  texture: "/videos/feature-1.mp4",
  setColor: (color) => set({ color }),
  setScale: (scale) => set({ scale }),
  setTexture: (texture) => set({ texture }),
  reset: () =>
    set({ color: "#2e2c2e", scale: 0.08, texture: "/videos/feature-1.mp4" }),
}));

export default useMacbookStore;
