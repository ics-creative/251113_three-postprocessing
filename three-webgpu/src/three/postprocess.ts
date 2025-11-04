import * as THREE from "three";
import { PostProcessing, WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { gui } from "./gui";

export const createPostProcessing = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: WebGPURenderer,
): PostProcessing => {
  const postprocessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();

  const bloomPass = bloom(scenePassColor);
  postprocessing.outputNode = bloomPass;

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

  return postprocessing;
};
