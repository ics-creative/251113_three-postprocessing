import type { ShaderNodeObject } from "three/src/nodes/TSL.js";
import type { TextureNode } from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";

/**
 * Bloomエフェクトの作成
 * @param node
 */
export const createBloom = (node: ShaderNodeObject<TextureNode>) => {
  const bloomPass = bloom(node, 0.3, 0, 0);
  bloomPass.smoothWidth.value = 0.3;

  return bloomPass;
};
