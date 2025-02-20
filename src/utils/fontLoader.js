import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export const loadFont = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    loader.load(
      path,
      (font) => resolve(font),
      undefined,
      (error) => reject(error)
    );
  });
};
