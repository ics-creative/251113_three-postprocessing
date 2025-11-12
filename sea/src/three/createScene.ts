import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getParams } from "./getParams";
import type { DayMode, Effect } from "./types";

const sceneParams = {
  fogNear: 18,
  fogFar: 70,
};

// ライティングの作成
const createLights = (scene: THREE.Scene) => {
  const params = getParams("day");

  const ambientLight = new THREE.AmbientLight(0xffffff, params.ambientLightIntensity);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, params.dirLight1Intensity);
  directionalLight1.position.set(5, 15, 15);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, params.dirLight2Intensity);
  directionalLight2.position.set(-5, 15, 10);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, params.dirLight3Intensity);
  directionalLight3.position.set(0, 15, 10);
  directionalLight3.lookAt(0, 0, 10);

  return {
    ambientLight,
    directionalLight1,
    directionalLight2,
    directionalLight3,
  };
};

// fogの作成
const createFog = (mode: DayMode) => {
  const params = getParams(mode);
  const fog = new THREE.Fog(params.backgroundColor, sceneParams.fogNear, sceneParams.fogFar);
  return { fog };
};

/**
 * シーンの作成
 * @param container
 */
export const createScene = async (container: HTMLDivElement) => {
  const params = getParams("day");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(params.backgroundColor);

  const { ambientLight, directionalLight1, directionalLight2, directionalLight3 } = createLights(scene);
  scene.add(ambientLight, directionalLight1, directionalLight2, directionalLight3);
  const { fog } = createFog("day");
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 8, 30);

  const renderer = new WebGPURenderer({ antialias: true });
  await renderer.init();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 4, 0);
  controls.update();

  // シーンのエフェクトを変更する
  const onChangeEffectScene = (effect: Effect) => {
    const mode = effect === "bloom" ? "night" : "day";
    const params = getParams(mode);

    const { fog } = createFog(mode);
    scene.fog = fog;
    scene.background = new THREE.Color(params.backgroundColor);

    ambientLight.intensity = params.ambientLightIntensity;
    directionalLight1.intensity = params.dirLight1Intensity;
    directionalLight2.intensity = params.dirLight2Intensity;
    directionalLight3.intensity = params.dirLight3Intensity;
  };

  return { scene, camera, renderer, onChangeEffectScene };
};

/**
 * ウィンドウサイズが変更された時の処理
 * @param camera
 * @param renderer
 */
export const handleResize = (camera: THREE.PerspectiveCamera, renderer: WebGPURenderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
