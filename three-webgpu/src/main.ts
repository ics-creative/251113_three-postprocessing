import "./style.css";
import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";

// シーンとカメラの初期化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// WebGPURendererの初期化
const renderer = new WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const appElement = document.querySelector<HTMLDivElement>("#app");
if (appElement) {
  appElement.appendChild(renderer.domElement);
}

// 四角（BoxGeometry）の作成
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// アニメーションループ
const animate = () => {
  requestAnimationFrame(animate);

  // 四角を回転させる
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

// ウィンドウリサイズ対応
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーション開始
animate();
