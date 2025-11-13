import type { ShaderNodeObject } from "three/tsl";
import { sepia as sepiaPass } from "three/examples/jsm/tsl/display/Sepia.js";
import type { TextureNode } from "three/webgpu";
import { film as filmPass } from "three/examples/jsm/tsl/display/FilmNode.js";
import { gaussianBlur as gaussianBlurPass } from "three/examples/jsm/tsl/display/GaussianBlurNode.js";

/**
 *  Sepia + Film + Gaussian Blurエフェクトの作成
 * @param node
 */
export const createSepia = (node: ShaderNodeObject<TextureNode>) => {
  const sepia = sepiaPass(node);
  const blur = gaussianBlurPass(sepia, 0.5);
  const film = filmPass(blur);
  return film;
};
