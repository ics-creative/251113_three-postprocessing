import * as THREE from "three";
const cloudMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1,
});

const cloud1 = [
  {
    radius: 0.6,
    position: { x: 0, y: 0, z: 0 },
  },
  {
    radius: 0.5,
    position: { x: 0.8, y: 0.1, z: 0 },
  },
  {
    radius: 0.7,
    position: { x: -0.7, y: 0.2, z: 0 },
  },
  {
    radius: 0.4,
    position: { x: 0.3, y: 0.3, z: -0.2 },
  },
];

const cloud2 = [
  {
    radius: 1,
    position: { x: 0, y: 0, z: 0 },
  },
  {
    radius: 1.2,
    position: { x: 1.4, y: 0.1, z: 0 },
  },
  {
    radius: 0.5,
    position: { x: -0.7, y: 0.2, z: 0 },
  },
  {
    radius: 0.6,
    position: { x: -0.8, y: 0.3, z: -0.2 },
  },
];

let cloud1Group: THREE.Group | null = null;
let cloud2Group: THREE.Group | null = null;
let cloud3Group: THREE.Group | null = null;
const createCloud = (cloudData: typeof cloud1 | typeof cloud2) => {
  const cloud = new THREE.Group();

  // 複数のSphereGeometryを組み合わせて雲を作る

  cloudData.forEach((item) => {
    const sphereGeometry = new THREE.SphereGeometry(item.radius, 12, 12);
    const sphere = new THREE.Mesh(sphereGeometry, cloudMaterial);
    sphere.position.set(item.position.x, item.position.y, item.position.z);
    cloud.add(sphere);
  });

  return cloud;
};

export const createClouds = () => {
  const clouds = new THREE.Group();
  cloud1Group = createCloud(cloud1);
  cloud1Group.position.set(0, 24, -32);
  cloud1Group.scale.set(15, 10, 10);
  clouds.add(cloud1Group);

  cloud2Group = createCloud(cloud2);
  cloud2Group.position.set(50, 20, -35);
  cloud2Group.scale.set(10, 7, 7);
  clouds.add(cloud2Group);

  cloud3Group = createCloud(cloud1);
  cloud3Group.position.set(-40, 20, -40);
  cloud3Group.scale.set(20, 17, 17);
  cloud3Group.rotation.y = -Math.PI / 15;
  clouds.add(cloud3Group);

  return clouds;
};

export const animateClouds = (elapsedTime: number) => {
  if (!cloud1Group || !cloud2Group || !cloud3Group) {
    return;
  }
  const time = elapsedTime;
  cloud1Group.position.y += Math.sin(time + Math.PI / 2) * 0.009;
  cloud2Group.position.y += Math.sin(time + Math.PI) * 0.005;
  cloud3Group.position.y += Math.sin(time) * 0.008;
};
