import { PostProcessing, WebGPURenderer } from "three/webgpu";
import * as THREE from "three";
import { pass } from "three/tsl";
import { dotScreen } from "three/examples/jsm/tsl/display/DotScreenNode.js";

const init = async () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) {
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new WebGPURenderer({ antialias: true });
  await renderer.init();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  app.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // ポストプロセス
  const postProcessing = new PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode();
  const dotScreenPass = dotScreen(scenePassColor);
  postProcessing.outputNode = dotScreenPass;

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);

  // アニメーションループ
  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x = cube.rotation.x + 0.01;
    cube.rotation.y = cube.rotation.y + 0.01;

    postProcessing.render();
  };

  animate();
};

document.addEventListener("DOMContentLoaded", init);
