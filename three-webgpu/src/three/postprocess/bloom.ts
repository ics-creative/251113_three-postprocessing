import type { ShaderNodeObject } from "three/src/nodes/TSL.js";
import type { TextureNode } from "three/webgpu";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { gui } from "../gui";

export const createBloom = (node: ShaderNodeObject<TextureNode>) => {
  const bloomPass = bloom(node);

  const bloomFolder = gui.addFolder("Bloom");
  const bloomParams = {
    strength: bloomPass.strength.value,
    radius: bloomPass.radius.value,
    threshold: bloomPass.threshold.value,
    smoothWidth: bloomPass.smoothWidth.value,
  };

  bloomFolder
    .add(bloomParams, "strength", 0, 3, 0.01)
    .name("Strength")
    .onChange((value: number) => {
      bloomPass.strength.value = value;
    });

  bloomFolder
    .add(bloomParams, "radius", 0, 1, 0.01)
    .name("Radius")
    .onChange((value: number) => {
      bloomPass.radius.value = value;
    });

  return bloomPass;
};
