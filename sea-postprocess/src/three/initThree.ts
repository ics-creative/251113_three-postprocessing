import { createScene, handleResize } from "./createScene";
import { animateSea, createSea } from "./createSea";
import * as THREE from "three";
import { initPostprocess } from "./postprocess/initPostprocess";
import { animateClouds, createClouds } from "./createClouds";

export const initThree = (app: HTMLDivElement) => {
  const { scene, camera, renderer } = createScene(app);

  const sea = createSea();
  scene.add(sea);

  const clouds = createClouds();
  scene.add(clouds);

  const postprocessing = initPostprocess(scene, camera, renderer);

  const clock = new THREE.Clock();

  const tick = () => {
    postprocessing.render();
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime)
    animateSea(elapsedTime);
    animateClouds(elapsedTime);
    requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener("resize", () => handleResize(camera, renderer));
};
