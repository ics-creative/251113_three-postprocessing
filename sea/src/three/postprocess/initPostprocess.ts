import type * as THREE from "three";
import { PostProcessing, type WebGPURenderer } from "three/webgpu";
import { pass } from "three/tsl";
import { createChromatic } from "./chromatic";
import { createBloom } from "./bloom";
import type { Effect } from "../types";
import { createPixelation } from "./pixelation";
import { createSepia } from "./sepia";

/**
 * ポストプロセスの初期化
 * @param scene - シーン
 * @param camera - カメラ
 * @param renderer - レンダラー
 */
export const initPostprocess = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: WebGPURenderer) => {
  const postProcessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();
  const viewZ = scenePass.getViewZNode();

  postProcessing.outputNode = createChromatic(scenePassColor, viewZ);

  // ポストプロセスのエフェクトを変更する
  const changePostprocess = (effect: Effect) => {
    switch (effect) {
      case "none":
        postProcessing.outputNode = scenePassColor;
        break;
      case "chromatic":
        postProcessing.outputNode = createChromatic(scenePassColor, viewZ);
        break;
      case "bloom":
        postProcessing.outputNode = createBloom(scenePassColor);
        break;
      case "pixelation":
        postProcessing.outputNode = createPixelation(scene, camera);
        break;
      case "sepia":
        postProcessing.outputNode = createSepia(scenePassColor);
        break;
      default:
        postProcessing.outputNode = scenePassColor;
        break;
    }
    postProcessing.needsUpdate = true;
  };

  return { postProcessing, changePostprocess };
};
