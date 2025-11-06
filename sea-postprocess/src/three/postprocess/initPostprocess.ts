import type * as THREE from "three";
import { PostProcessing, type WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
import { createChromatic } from "./chromatic";

export const initPostprocess = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: WebGPURenderer,
) => {
  const postprocessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();
  const viewZ = scenePass.getViewZNode();

  postprocessing.outputNode = createChromatic(scenePassColor, viewZ);

  return postprocessing;
};
