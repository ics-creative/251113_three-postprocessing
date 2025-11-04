import type * as THREE from "three";
import { PostProcessing, type WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
// import { createBloom } from "./postprocess/bloom";
import { createChromatic } from "./postprocess/chromatic";

export const createPostProcessing = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: WebGPURenderer,
): PostProcessing => {
  const postprocessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();
  const viewZ = scenePass.getViewZNode();

  // const bloomPass = createBloom(scenePassColor);
  // postprocessing.outputNode = bloomPass;

  const chromaticPass = createChromatic(scenePassColor, viewZ);
  postprocessing.outputNode = chromaticPass;

  return postprocessing;
};
