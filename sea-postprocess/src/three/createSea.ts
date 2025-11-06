import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { gui } from "../gui/gui";

const noise2D = createNoise2D();

const seaParams = {
  color: "#52cbff",
  frequency: 0.1,
  amplitude: 0.7,
  waveSpeed: 0.2,
  waveAmplitude: 0.4,
};

let seaGeom: THREE.PlaneGeometry | null = null;
let originalZPositions: number[] = [];

const applyNoise = () => {
  if (!seaGeom) {
    return;
  }
  const positionAttribute = seaGeom.getAttribute("position");

  // 元のz座標を保存する配列をクリア
  originalZPositions = [];

  for (let index = 0; index < positionAttribute.count; index++) {
    const x = positionAttribute.getX(index);
    const y = positionAttribute.getY(index);

    const noiseValue = noise2D(
      x * seaParams.frequency,
      y * seaParams.frequency,
    );
    const height = noiseValue * seaParams.amplitude;

    positionAttribute.setZ(index, height);
    // 元のz座標を保存
    originalZPositions.push(height);
  }
  positionAttribute.needsUpdate = true;
  seaGeom.computeVertexNormals();
};

export const createSea = (): THREE.Mesh => {
  seaGeom = new THREE.PlaneGeometry(100, 60, 64, 64);
  const seaMat = new THREE.MeshStandardMaterial({
    color: seaParams.color,
    metalness: 1.0,
    // roughness: 0.8,
    // side: THREE.DoubleSide,
    // wireframe: true,
  });
  // 初期ノイズを適用
  applyNoise();
  // applyNoise(seaGeom, seaParams.frequency, seaParams.amplitude);

  const sea = new THREE.Mesh(seaGeom, seaMat);
  sea.rotation.x = -Math.PI / 2;
  sea.position.y = 0;
  sea.receiveShadow = true;

  addGui(seaMat);

  return sea;
};

export const animateSea = (elapsedTime: number) => {
  if (!seaGeom || originalZPositions.length === 0) {
    return;
  }
  const positionAttribute = seaGeom.getAttribute("position");
  const time = elapsedTime * seaParams.waveSpeed;

  for (let index = 0; index < positionAttribute.count; index++) {
    const x = positionAttribute.getX(index);
    const y = positionAttribute.getY(index);
    const originalZ = originalZPositions[index];

    // xとyの値からノイズを生成し、timeで変化させる
    const noiseValue = noise2D(
      x * seaParams.frequency + time,
      y * seaParams.frequency + time,
    );
    const waveHeight = noiseValue * seaParams.waveAmplitude;

    // 元のz座標を基準に波の高さを加算
    positionAttribute.setZ(index, originalZ + waveHeight);
  }
  positionAttribute.needsUpdate = true;
  seaGeom.computeVertexNormals();
};

const addGui = (seaMat: THREE.MeshStandardMaterial) => {
  const seaFolder = gui.addFolder("Sea");
  seaFolder.addColor(seaParams, "color").onChange((value: string) => {
    seaMat.color.set(value);
  });

  seaFolder.add(seaParams, "waveSpeed", 0.1, 2.0, 0.1).name("Wave Speed");
  seaFolder
    .add(seaParams, "waveAmplitude", 0, 10.0, 0.01)
    .name("Wave Amplitude");
};
