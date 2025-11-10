import type * as THREE from "three";
import { PostProcessing, type WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
import { createChromatic } from "./chromatic";
import { createBloom } from "./bloom";
import type { Effect } from "../types";

/**
 * ポストプロセスの初期化
 * @param scene - シーン
 * @param camera - カメラ
 * @param renderer - レンダラー
 */
export const initPostprocess = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: WebGPURenderer) => {
  const postprocessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();
  const viewZ = scenePass.getViewZNode();

  postprocessing.outputNode = createChromatic(scenePassColor, viewZ);

  // ポストプロセスのエフェクトを変更する
  const changePostprocess = (effect: Effect) => {
    switch (effect) {
      case "none":
        postprocessing.outputNode = scenePassColor;
        break;
      case "chromatic":
        postprocessing.outputNode = createChromatic(scenePassColor, viewZ);
        break;
      case "bloom":
        postprocessing.outputNode = createBloom(scenePassColor);
        break;
      default:
        postprocessing.outputNode = scenePassColor;
        break;
    }
    postprocessing.needsUpdate = true;
  };

  return { postprocessing, changePostprocess };
};
