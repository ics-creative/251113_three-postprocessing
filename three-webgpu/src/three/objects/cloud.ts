import * as THREE from "three";
import { gui } from "../gui";

const createCloud = (): THREE.Group => {
  const cloud = new THREE.Group();
  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // 白
    roughness: 0.9,
  });

  // 複数のSphereGeometryを組み合わせて雲を作る
  const sphereGeometry1 = new THREE.SphereGeometry(0.6, 8, 8);
  const sphereGeometry2 = new THREE.SphereGeometry(0.5, 8, 8);
  const sphereGeometry3 = new THREE.SphereGeometry(0.7, 8, 8);
  const sphereGeometry4 = new THREE.SphereGeometry(0.4, 8, 8);

  const sphere1 = new THREE.Mesh(sphereGeometry1, cloudMaterial);
  sphere1.position.set(0, 0, 0);
  cloud.add(sphere1);

  const sphere2 = new THREE.Mesh(sphereGeometry2, cloudMaterial);
  sphere2.position.set(0.8, 0.1, 0);
  cloud.add(sphere2);

  const sphere3 = new THREE.Mesh(sphereGeometry3, cloudMaterial);
  sphere3.position.set(-0.7, 0.2, 0);
  cloud.add(sphere3);

  const sphere4 = new THREE.Mesh(sphereGeometry4, cloudMaterial);
  sphere4.position.set(0.3, 0.3, -0.2);
  cloud.add(sphere4);

  return cloud;
};

export const createClouds = (scene: THREE.Scene): THREE.Group[] => {
  const clouds: THREE.Group[] = [];

  const cloudPositions = [
    { x: -8, y: 8, z: -10, scale: 1.2 },
    { x: 5, y: 10, z: -15, scale: 1.0 },
    { x: -12, y: 9, z: -5, scale: 0.9 },
    { x: 10, y: 11, z: -8, scale: 1.1 },
    { x: 0, y: 12, z: -12, scale: 1.3 },
    { x: -15, y: 10, z: -20, scale: 1.0 },
  ];

  cloudPositions.forEach((position) => {
    const cloud = createCloud();
    cloud.position.set(position.x, position.y, position.z);
    cloud.scale.set(position.scale, position.scale, position.scale);
    clouds.push(cloud);
    scene.add(cloud);
  });

  // lil-guiでカラーコントロール追加
  const cloudsFolder = gui.addFolder("Clouds");
  const cloudsParams = { color: "#ffffff" };
  cloudsFolder.addColor(cloudsParams, "color").onChange((value: string) => {
    clouds.forEach((cloud) => {
      cloud.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.color.set(value);
      });
    });
  });

  return clouds;
};
