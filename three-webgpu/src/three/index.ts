import { createScene, handleResize } from "./scene";
import { createLights } from "./lights";
import { createGround } from "./objects/ground";
import { createTrees } from "./objects/tree";
import { createClouds } from "./objects/cloud";
import { createControls } from "./controls";
import { startAnimation } from "./animation";

export const init = (container: HTMLDivElement): void => {
  // シーン、カメラ、レンダラーの初期化
  const { scene, camera, renderer } = createScene(container);

  // OrbitControlsの初期化
  const controls = createControls(camera, renderer.domElement);

  // ライティングの追加
  createLights(scene);

  // オブジェクトの作成
  createGround(scene);
  const trees = createTrees(scene);
  const clouds = createClouds(scene);

  // リサイズイベントの登録
  window.addEventListener("resize", handleResize);

  // アニメーション開始
  startAnimation(scene, camera, renderer, controls, trees, clouds);
};
