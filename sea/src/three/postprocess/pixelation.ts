import { uniform } from "three/tsl";
import type * as THREE from "three";
import { pixelationPass } from "three/examples/jsm/tsl/display/PixelationPassNode.js";

/**
 * pixelationエフェクトの作成
 * @param node
 */
export const createPixelation = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  const size = uniform(5);
  const normalStrength = uniform(0.5);
  const edgeSharpness = uniform(1);
  const pixelation = pixelationPass(scene, camera, size, normalStrength, edgeSharpness);
  return pixelation;
};
