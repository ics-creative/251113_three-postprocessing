import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";

export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: WebGPURenderer;

export const createScene = (container: HTMLDivElement) => {
  // シーンの初期化
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // 空色の背景

  // カメラの初期化
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(8, 6, 8);
  camera.lookAt(0, 0, 0);

  // WebGPURendererの初期化
  renderer = new WebGPURenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};

export const handleResize = (): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
