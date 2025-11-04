import { createScene, handleResize } from "./scene";
import { createLights } from "./lights";
import { createGround } from "./objects/ground";
import { createTrees } from "./objects/tree";
import { createClouds } from "./objects/cloud";
import { createControls } from "./controls";
import { startAnimation } from "./animation";
import { createTrees2 } from "./objects/tree2";
import { createPostProcessing } from "./postprocess";

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
  createTrees2(scene);
  const clouds = createClouds(scene);

  // ポストプロセス
  const postprocessing = createPostProcessing(scene, camera, renderer);

  // リサイズイベントの登録
  window.addEventListener("resize", handleResize);

  // アニメーション開始
  startAnimation(postprocessing, controls, trees, clouds);
};
