import { createScene, handleResize } from "./createScene";
import { animateSea, createSea } from "./createSea";
import * as THREE from "three";

export const initThree = (app: HTMLDivElement) => {
  const { scene, camera, renderer } = createScene(app);

  const sea = createSea();
  scene.add(sea);

  const clock = new THREE.Clock();

  const tick = () => {
    renderer.render(scene, camera);
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime)
    animateSea(elapsedTime);
    requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener("resize", () => handleResize(camera, renderer));
};
