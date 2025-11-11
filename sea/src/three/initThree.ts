import { createScene, handleResize } from "./createScene";
import { animateSea, createSea } from "./createSea";
import * as THREE from "three";
import { initPostprocess } from "./postprocess/initPostprocess";
import { animateClouds, createClouds } from "./createClouds";
import { createIsland } from "./createIsland";
import { gui } from "../gui/gui";
import type { Effect } from "./types";

const effects: Effect[] = ["none", "chromatic", "bloom", "pixelation", "sepia"] as const;

/**
 * Three.jsの初期化
 * @param app
 */
export const initThree = (app: HTMLDivElement) => {
  const { scene, camera, renderer, onChangeEffectScene } = createScene(app);

  const sea = createSea();
  scene.add(sea);

  const { clouds, onChangeEffectClouds } = createClouds();
  scene.add(clouds);

  const { island, onChangeEffectIsland } = createIsland();
  scene.add(island);

  const { postprocessing, changePostprocess } = initPostprocess(scene, camera, renderer);

  addGui([changePostprocess, onChangeEffectScene, onChangeEffectIsland, onChangeEffectClouds]);

  const clock = new THREE.Clock();

  const tick = async () => {
    await postprocessing.renderAsync();
    const elapsedTime = clock.getElapsedTime();
    animateSea(elapsedTime);
    animateClouds(elapsedTime);
    requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener("resize", () => handleResize(camera, renderer));
};

// GUIの追加
const addGui = (callbacks: ((effect: Effect) => void)[]) => {
  const postprocessingFolder = gui.addFolder("Postprocessing");

  postprocessingFolder
    .add({ effect: "chromatic" }, "effect", effects)
    .name("Effect")
    .onChange((value: Effect) => {
      for (const callback of callbacks) {
        callback(value);
      }
    });
};
