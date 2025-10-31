import type * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const createControls = (
  camera: THREE.PerspectiveCamera,
  domElement: HTMLCanvasElement,
): OrbitControls => {
  const controls = new OrbitControls(camera, domElement);

  // OrbitControlsの基本設定
  controls.enableDamping = true; // 滑らかな動きを有効化
  controls.dampingFactor = 0.05; // 減衰係数
  controls.minDistance = 5; // カメラの最小距離
  controls.maxDistance = 50; // カメラの最大距離
  controls.maxPolarAngle = Math.PI / 2; // 下から見上げる角度を制限

  return controls;
};
