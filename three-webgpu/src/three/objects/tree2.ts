import * as THREE from "three";
import { gui } from "../gui";

const defaultTrunkMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b5a2b,
  roughness: 0.9,
});

const defaultLeavesMaterial = new THREE.MeshStandardMaterial({
  color: 0xffbb00,
  roughness: 0.7,
});

const foliageLayers = [
  { radius: 0.8, height: 1.4 },
  { radius: 0.6, height: 1.2 },
  { radius: 0.4, height: 1 },
];

export const createStackedConeTree = (
  positionX: number,
  positionZ: number,
  scale = 1,
  trunkMaterial: THREE.MeshStandardMaterial = defaultTrunkMaterial,
  leavesMaterial: THREE.MeshStandardMaterial = defaultLeavesMaterial,
): THREE.Group => {
  const tree = new THREE.Group();

  const trunkHeight = 1.4 * scale;
  const trunkGeometry = new THREE.ConeGeometry(0.25 * scale, 3.0, 12);
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = trunkHeight / 2;
  tree.add(trunk);

  // 3つのConeGeometryを積み重ねた葉の層を作成
  let heightOffset = trunkHeight;
  foliageLayers.forEach(({ radius, height }, index) => {
    const scaledHeight = height * scale;
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(radius * scale, scaledHeight, 6),
      leavesMaterial,
    );

    heightOffset += scaledHeight / 3;
    cone.position.y = heightOffset;
    heightOffset += scaledHeight / 3;

    cone.rotation.y = (Math.PI / 8) * index;
    tree.add(cone);
  });

  tree.position.set(positionX, 0, positionZ);

  return tree;
};

export const createTrees2 = (scene: THREE.Scene): THREE.Group[] => {
  const trees: THREE.Group[] = [];

  const trunkMaterial = defaultTrunkMaterial.clone();
  const leavesMaterial = defaultLeavesMaterial.clone();

  const treePositions = [
    { x: -6, z: -2, scale: 1.5 },
    { x: -3, z: 4, scale: 1.2 },
    { x: 1, z: -5, scale: 1.2 },
    { x: 5, z: 3, scale: 1.4 },
    { x: 6, z: -4, scale: 1.6 },
  ];

  treePositions.forEach((position) => {
    const tree = createStackedConeTree(
      position.x,
      position.z,
      position.scale,
      trunkMaterial,
      leavesMaterial,
    );

    trees.push(tree);
    scene.add(tree);
  });

  const coneTreesFolder = gui.addFolder("Cone Trees");
  const coneTreesParams = {
    trunkColor: "#6a3c1f",
    leavesColor: "#ffbb00",
  };

  coneTreesFolder
    .addColor(coneTreesParams, "trunkColor")
    .name("Trunk Color")
    .onChange((value: string) => {
      trunkMaterial.color.set(value);
    });

  coneTreesFolder
    .addColor(coneTreesParams, "leavesColor")
    .name("Leaves Color")
    .onChange((value: string) => {
      leavesMaterial.color.set(value);
    });

  return trees;
};
