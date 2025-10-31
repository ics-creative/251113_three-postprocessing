import type * as THREE from "three";
import type { WebGPURenderer } from "three/webgpu";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const startAnimation = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: WebGPURenderer,
  controls: OrbitControls,
  _trees: THREE.Group[],
  _clouds: THREE.Group[],
): void => {
  let _time = 0;

  const animate = (): void => {
    requestAnimationFrame(animate);

    _time += 0.01;

    // OrbitControlsの更新
    controls.update();

    // カメラをゆっくり回転
    // camera.position.x = Math.sin(time * 0.2) * 10;
    // camera.position.z = Math.cos(time * 0.2) * 10;
    // camera.lookAt(0, 2, 0);

    // 木を微妙に揺らす
    // trees.forEach((tree, index) => {
    //   tree.rotation.z = Math.sin(time + index) * 0.02;
    // });

    // // 雲をゆっくり移動・回転させる
    // clouds.forEach((cloud, index) => {
    //   cloud.position.x += Math.sin(time * 0.1 + index) * 0.005;
    //   cloud.rotation.y += 0.001;
    // });

    // // 太陽のハロー効果を脈動させる
    // sunGlow.scale.set(
    //   1 + Math.sin(time * 0.5) * 0.1,
    //   1 + Math.sin(time * 0.5) * 0.1,
    //   1 + Math.sin(time * 0.5) * 0.1,
    // );

    renderer.render(scene, camera);
  };

  animate();
};
