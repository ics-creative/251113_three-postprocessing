import * as THREE from "three";
import { gui } from "../gui";

const createTree = (
  positionX: number,
  positionZ: number,
  scale = 1,
  trunkMaterial: THREE.MeshStandardMaterial,
  leavesMaterial: THREE.MeshStandardMaterial,
): THREE.Group => {
  const tree = new THREE.Group();

  // 幹の作成
  const trunkGeometry = new THREE.ConeGeometry(0.25 * scale, 3.0, 12);
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = 1.2;
  tree.add(trunk);

  const topMat = new THREE.DodecahedronGeometry(1.5 * scale, 0);
  const top = new THREE.Mesh(topMat, leavesMaterial);
  top.position.y = 2.5 * scale;
  top.rotation.y = (Math.PI / 2) * scale;
  tree.add(top);

  tree.position.set(positionX, 0, positionZ);

  return tree;
};

export const createTrees = (scene: THREE.Scene): THREE.Group[] => {
  const trees: THREE.Group[] = [];

  // 幹のマテリアル
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0xb38f75, // 茶色
    roughness: 0.9,
  });

  // 葉のマテリアル
  const leavesMaterial = new THREE.MeshStandardMaterial({
    color: 0x86b964, // 濃い緑色
    roughness: 0.8,
  });

  const treePositions = [
    { x: -4, z: -4, scale: 1.2 },
    { x: -2, z: 3, scale: 0.9 },
    { x: 2, z: -3, scale: 1.1 },
    { x: 4, z: 2, scale: 1.0 },
    { x: -5, z: 1, scale: 0.8 },
    { x: 5, z: -5, scale: 1.3 },
    { x: 0, z: -6, scale: 1.0 },
    { x: 3, z: 5, scale: 0.95 },
  ];

  treePositions.forEach((position) => {
    const tree = createTree(
      position.x,
      position.z,
      position.scale,
      trunkMaterial,
      leavesMaterial,
    );
    trees.push(tree);
    scene.add(tree);
  });

  // lil-guiでカラーコントロール追加
  const treesFolder = gui.addFolder("Trees");
  const treesParams = {
    trunkColor: "#8b4513",
    leavesColor: "#2d5016",
  };
  treesFolder
    .addColor(treesParams, "trunkColor")
    .name("Trunk Color")
    .onChange((value: string) => {
      trunkMaterial.color.set(value);
    });
  treesFolder
    .addColor(treesParams, "leavesColor")
    .name("Leaves Color")
    .onChange((value: string) => {
      leavesMaterial.color.set(value);
    });

  return trees;
};
