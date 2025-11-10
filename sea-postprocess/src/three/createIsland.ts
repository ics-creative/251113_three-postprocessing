import * as THREE from "three";
import { getParams } from "./getParams";
import type { Effect } from "./types";

const flower1Color = "#fd7c96";
const flower2Color = "#fff700";

let islandMat: THREE.MeshStandardMaterial | null = null;
const trunkMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.9,
});
const leavesMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
});
const bushesMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
});
const flower1Material = new THREE.MeshStandardMaterial({
  color: flower1Color,
  roughness: 0.8,
});
const flower2Material = new THREE.MeshStandardMaterial({
  color: flower2Color,
  roughness: 0.8,
});

const createTree = () => {
  const tree = new THREE.Group();

  // 幹の作成
  const trunkGeometry = new THREE.ConeGeometry(1, 8, 4);
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = 8;
  tree.add(trunk);

  const branchGeom = new THREE.ConeGeometry(0.3, 1.6, 4);
  const branch = new THREE.Mesh(branchGeom, trunkMaterial);
  branch.position.set(-0.9, 8, 0);
  branch.rotation.z = Math.PI / 4;
  tree.add(branch);

  const topMat = new THREE.DodecahedronGeometry(4, 0);
  const top = new THREE.Mesh(topMat, leavesMaterial);
  top.scale.set(1, 0.9, 1);
  top.position.y = 12;
  top.rotation.y = Math.PI / 12;
  tree.add(top);

  return tree;
};

const flowers1Pos = [
  { x: -2.6, y: 5, z: 2.2 },
  { x: -1, y: 4.3, z: 2.7 },
  { x: -1.5, y: 4.8, z: 2.7 },
  { x: 0, y: 5.2, z: 1.7 },
];

const flowers2Pos = [
  { x: 2.5, y: 3.5, z: 1.16 },
  { x: 3.5, y: 4, z: 1.75 },
  { x: 3.2, y: 4.2, z: 1.7 },
];

const createBush = () => {
  const bush = new THREE.Group();
  const bush1Geom = new THREE.DodecahedronGeometry(2, 0);
  const bush1 = new THREE.Mesh(bush1Geom, bushesMaterial);
  bush1.scale.set(1.4, 1, 1);
  bush1.position.set(-1.2, 4, 1);
  bush1.rotation.y = Math.PI / 6;
  bush.add(bush1);

  for (const pos of flowers1Pos) {
    const flower1Geom = new THREE.SphereGeometry(1, 6, 6);
    const flower1 = new THREE.Mesh(flower1Geom, flower1Material);
    flower1.scale.set(0.2, 0.2, 0.2);
    flower1.position.set(pos.x, pos.y, pos.z);
    bush.add(flower1);
  }

  const bush2Geom = new THREE.DodecahedronGeometry(1, 0);
  const bush2 = new THREE.Mesh(bush2Geom, bushesMaterial);
  bush2.scale.set(1.4, 1, 1);
  bush2.position.set(3.5, 3.5, 1);
  bush2.rotation.y = -Math.PI / 6;
  bush.add(bush2);

  for (const pos of flowers2Pos) {
    const flower2Geom = new THREE.SphereGeometry(1, 6, 6);
    const flower2 = new THREE.Mesh(flower2Geom, flower2Material);
    flower2.scale.set(0.12, 0.12, 0.12);
    flower2.position.set(pos.x, pos.y, pos.z);
    bush.add(flower2);
  }
  return bush;
};

/**
 * 島の作成
 */
export const createIsland = () => {
  const params = getParams("day");
  const island = new THREE.Group();

  const islandGeom = new THREE.DodecahedronGeometry(10, 0);
  islandMat = new THREE.MeshStandardMaterial({
    color: params.islandColor,
    roughness: 0.9,
  });
  const islandMesh = new THREE.Mesh(islandGeom, islandMat);
  islandMesh.position.set(0, -5, 1);
  islandMesh.scale.set(1.4, 1, 1);
  islandMesh.rotation.x = Math.PI / 5;
  islandMesh.rotation.y = Math.PI;
  island.add(islandMesh);

  // 初期色を設定
  trunkMaterial.color.set(params.trunkColor);
  leavesMaterial.color.set(params.leavesColor);
  bushesMaterial.color.set(params.bushesColor);

  const tree = createTree();
  tree.position.set(1.6, -1.2, 1);
  island.add(tree);

  const bush = createBush();
  island.add(bush);

  const onChangeEffectIsland = (effect: Effect) => {
    const mode = effect === "bloom" ? "night" : "day";
    const newParams = getParams(mode);
    islandMat?.color.set(newParams.islandColor);
    trunkMaterial.color.set(newParams.trunkColor);
    leavesMaterial.color.set(newParams.leavesColor);
    bushesMaterial.color.set(newParams.bushesColor);
  };

  return { island, onChangeEffectIsland };
};
