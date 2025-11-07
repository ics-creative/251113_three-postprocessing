import type * as THREE from "three";
import {
  PostProcessing,
  type Node,
  type TextureNode,
  type WebGPURenderer,
} from "three/webgpu";
import { pass, type ShaderNodeObject } from "three/tsl";
import { createChromatic } from "./chromatic";
import { gui } from "../../gui/gui";
import { createBloom } from "./bloom";

type Effect = "none" | "chromatic" | "bloom";

const params = {
  effect: "none",
};

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

  addGui(scenePassColor, viewZ, postprocessing);

  return postprocessing;
};

const addGui = (
  scenePassColor: ShaderNodeObject<TextureNode>,
  viewZ: ShaderNodeObject<Node>,
  postprocessing: PostProcessing,
) => {
  const postprocessingFolder = gui.addFolder("Postprocessing");

  postprocessingFolder
    .add(params, "effect", ["none", "chromatic", "bloom"])
    .name("Effect")
    .onChange((value: Effect) => {
      if (value === "none") {
        postprocessing.outputNode = scenePassColor;
      } else if (value === "chromatic") {
        postprocessing.outputNode = createChromatic(scenePassColor, viewZ);
      } else if (value === "bloom") {
        postprocessing.outputNode = createBloom(scenePassColor);
      }
      postprocessing.needsUpdate = true;
    });
};
