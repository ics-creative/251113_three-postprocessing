import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";
import { gui } from "../gui/gui";

const sceneParams = {
  backgroundColor: "#87ceeb",
  fogColor: "#87ceeb",
  fogNear: 18,
  fogFar: 70,
};

export const createScene = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(sceneParams.backgroundColor);

  createLights(scene);
  createFog(scene);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 6, 30);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGPURenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  addGui(scene);

  return { scene, camera, renderer };
};

const createLights = (scene: THREE.Scene): void => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 15, 15);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
  );

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-5, 15, 10);
  const directionalLightHelper2 = new THREE.DirectionalLightHelper(
    directionalLight2,
  );

  scene.add(
    directionalLight,
    directionalLight2,
    directionalLightHelper,
    directionalLightHelper2,
  );
};

const createFog = (scene: THREE.Scene) => {
  const fog = new THREE.Fog(
    sceneParams.fogColor,
    sceneParams.fogNear,
    sceneParams.fogFar,
  );
  scene.fog = fog;
};

export const handleResize = (
  camera: THREE.PerspectiveCamera,
  renderer: WebGPURenderer,
) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const addGui = (scene: THREE.Scene) => {
  gui.addColor(sceneParams, "backgroundColor").onChange((value: string) => {
    scene.background = new THREE.Color(value);
  });

  gui.addColor(sceneParams, "fogColor").onChange((value: string) => {
    scene.fog = new THREE.Fog(value, sceneParams.fogNear, sceneParams.fogFar);
  });

  gui.add(sceneParams, "fogNear", 0, 100, 1).onChange((value: number) => {
    scene.fog = new THREE.Fog(sceneParams.fogColor, value, sceneParams.fogFar);
  });

  gui.add(sceneParams, "fogFar", 0, 100, 1).onChange((value: number) => {
    scene.fog = new THREE.Fog(sceneParams.fogColor, sceneParams.fogNear, value);
  });
};
