import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";

export const createScene = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  createLights(scene);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(8, 6, 8);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGPURenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};

const createLights = (scene: THREE.Scene): void => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);
};

export const handleResize = (camera: THREE.PerspectiveCamera, renderer: WebGPURenderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
