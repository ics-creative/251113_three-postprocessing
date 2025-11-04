import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { gui } from "../gui";

const noise2D = createNoise2D();

export const createGround = (scene: THREE.Scene): void => {
  const groundGeometry = new THREE.PlaneGeometry(30, 30, 24, 24);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xbeeca2, // 草の緑色
    roughness: 0.8,
    side: THREE.DoubleSide,
    // wireframe: true,
  });

  // ノイズで地形を生成する関数
  const applyNoise = (frequency: number): void => {
    const positionAttribute = groundGeometry.getAttribute("position");

    for (let index = 0; index < positionAttribute.count; index++) {
      const x = positionAttribute.getX(index);
      const y = positionAttribute.getY(index);

      // simplex-noiseで高さを計算（回転前のz座標を変更）
      const noiseValue = noise2D(x * frequency, y * frequency);
      const height = noiseValue * 0.5;

      positionAttribute.setZ(index, height);
    }

    positionAttribute.needsUpdate = true;
    groundGeometry.computeVertexNormals(); // 法線を再計算して正しいライティングを適用
  };

  // 初期ノイズを適用
  applyNoise(0.2);

  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  // lil-guiでパラメータコントロール追加
  const groundFolder = gui.addFolder("Ground");
  const groundParams = {
    color: "#beeca2",
    frequency: 0.2,
    amplitude: 0.8,
  };

  groundFolder.addColor(groundParams, "color").onChange((value: string) => {
    groundMaterial.color.set(value);
  });

  groundFolder
    .add(groundParams, "frequency", 0.01, 0.5, 0.01)
    .name("Noise Frequency")
    .onChange((value: number) => {
      applyNoise(value);
    });

  groundFolder
    .add(groundParams, "amplitude", 0, 10, 0.1)
    .name("Noise Amplitude")
    .onChange((value: number) => {
      const positionAttribute = groundGeometry.getAttribute("position");

      for (let index = 0; index < positionAttribute.count; index++) {
        const x = positionAttribute.getX(index);
        const y = positionAttribute.getY(index);

        const noiseValue = noise2D(
          x * groundParams.frequency,
          y * groundParams.frequency,
        );
        const height = noiseValue * value;

        positionAttribute.setZ(index, height);
      }

      positionAttribute.needsUpdate = true;
      groundGeometry.computeVertexNormals();
    });
};
