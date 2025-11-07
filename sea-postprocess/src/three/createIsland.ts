import * as THREE from "three";
import { gui } from "../gui/gui";

const islandParams = {
  islandColor: "#a59f83",
  houseColor: "#d98787",
  windowColor: "#ffffff",
  leavesColor: "#86b964",
  trunkColor: "#b38f75",
  bushesColor: "#558038",
  flower1Color: "#fd7c96",
  flower2Color: "#fff700",
};

let islandMat: THREE.MeshStandardMaterial | null = null;
// let houseMat: THREE.MeshStandardMaterial | null = null;
// let windowMat: THREE.MeshStandardMaterial | null = null;
const trunkMaterial = new THREE.MeshStandardMaterial({
  color: islandParams.trunkColor, // 茶色
  roughness: 0.9,
});
const leavesMaterial = new THREE.MeshStandardMaterial({
  color: islandParams.leavesColor, // 濃い緑色
  roughness: 0.8,
});

const bushesMaterial = new THREE.MeshStandardMaterial({
  color: islandParams.bushesColor, // 濃い緑色
  roughness: 0.8,
});
const flower1Material = new THREE.MeshStandardMaterial({
  color: islandParams.flower1Color,
  roughness: 0.8,
});
const flower2Material = new THREE.MeshStandardMaterial({
  color: islandParams.flower2Color,
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
  top.rotation.y = Math.PI / 6;
  tree.add(top);

  return tree;
};

const flowers1Pos = [
  { x: -2.8, y: 5, z: 2.3 },
  { x: -1, y: 4.3, z: 2.9 },
  { x: -1.5, y: 4.8, z: 2.8 },
  { x: 0, y: 5.2, z: 1.8 },
];

const flowers2Pos = [
  { x: 2.3, y: 3.5, z: 2 },
  { x: 3.5, y: 4, z: 1.5 },
  { x: 3.2, y: 4.2, z: 1.5 },
];

const createBush = () => {
  const bush = new THREE.Group();
  const bush1Geom = new THREE.SphereGeometry(2, 6, 6);
  const bush1 = new THREE.Mesh(bush1Geom, bushesMaterial);
  bush1.scale.set(1.4, 1, 1);
  bush1.position.set(-1.2, 4, 1);
  bush1.rotation.y = Math.PI / 6;
  bush.add(bush1);

  for (const pos of flowers1Pos) {
    const bush2Geom = new THREE.SphereGeometry(1, 6, 6);
    const bush2 = new THREE.Mesh(bush2Geom, flower1Material);
    bush2.scale.set(0.2, 0.2, 0.2);
    bush2.position.set(pos.x, pos.y, pos.z);
    bush.add(bush2);
  }

  for (const pos of flowers2Pos) {
    const bush2Geom = new THREE.SphereGeometry(1, 6, 6);
    const bush2 = new THREE.Mesh(bush2Geom, flower2Material);
    bush2.scale.set(0.12, 0.12, 0.12);
    bush2.position.set(pos.x, pos.y, pos.z);
    bush.add(bush2);
  }
  const bush2Geom = new THREE.SphereGeometry(1, 6, 6);
  const bush2 = new THREE.Mesh(bush2Geom, bushesMaterial);
  bush2.scale.set(1.4, 1, 1);
  bush2.position.set(3, 3.5, 1);
  bush2.rotation.y = Math.PI / 4;
  bush.add(bush2);
  return bush;
};

// const createHouse = () => {
// 	const house = new THREE.Group();

// 	const houseGeom = new THREE.BoxGeometry(3, 2.5, 3);
// 	const housePosition = houseGeom.getAttribute("position");

// 	// 右の面 0,1,2,3
// 	housePosition.setX(2, housePosition.getX(2) - 0.5)
// 	housePosition.setX(3, housePosition.getX(3) - 0.5)
// 	// 左の面 4,5,6,7
// 	housePosition.setX(6, housePosition.getX(6) + 0.5)
// 	housePosition.setX(7, housePosition.getX(7) + 0.5)
// 	// 上の面 8,9,10,11
// 	// 下の面 12,13,14,15
// 	housePosition.setX(12, housePosition.getX(12) + 0.5)
// 	housePosition.setX(13, housePosition.getX(13) - 0.5)
// 	housePosition.setX(14, housePosition.getX(14) + 0.5)
// 	housePosition.setX(15, housePosition.getX(15) - 0.5)
// 	// 正面の面 16,17,18,19
// 	housePosition.setX(18, housePosition.getX(18) + 0.5)
// 	housePosition.setX(19, housePosition.getX(19) - 0.5)
// 	// 奥の面 20,21,22,23
// 	housePosition.setX(22, housePosition.getX(22) -0.5)
// 	housePosition.setX(23, housePosition.getX(23) + 0.5)

// 	houseMat = new THREE.MeshStandardMaterial({
// 		color: islandParams.houseColor,
// 		roughness: 0.9,
// 		// wireframe: true,
// 	});
// 	const houseMesh = new THREE.Mesh(houseGeom, houseMat);
// 	house.add(houseMesh);

// 	// 屋根
// 	const roofGeom = new THREE.BoxGeometry(3.8, 1.6, 3);
// 	const roofPosition = roofGeom.getAttribute("position");
// 	// 右の面 0,1,2,3
// 	roofPosition.setX(0, roofPosition.getX(0) - 1.9)
// 	roofPosition.setX(1, roofPosition.getX(1) - 1.9)
// 	// 左の面 4,5,6,7
// 	roofPosition.setX(4, roofPosition.getX(4) + 1.9)
// 	roofPosition.setX(5, roofPosition.getX(5) + 1.9)
// 	// 上の面 8,9,10,11
// 	roofPosition.setX(8, roofPosition.getX(8) + 1.9)
// 	roofPosition.setX(9, roofPosition.getX(9) - 1.9)
// 	roofPosition.setX(10, roofPosition.getX(10) + 1.9)
// 	roofPosition.setX(11, roofPosition.getX(11) - 1.9)
// 	// 正面の面
// 	roofPosition.setX(16, roofPosition.getX(16) + 1.9)
// 	roofPosition.setX(17, roofPosition.getX(17) - 1.9)
// 	// 奥の面
// 	roofPosition.setX(20, roofPosition.getX(20) - 1.9)
// 	roofPosition.setX(21, roofPosition.getX(21) + 1.9)
// 	const roofMesh = new THREE.Mesh(roofGeom, houseMat);
// 	roofMesh.position.set(0, 2, 0);
// 	house.add(roofMesh);

// 	// 窓
// 	const windowGeom = new THREE.BoxGeometry(1, 1, 0.5);
// 	windowMat = new THREE.MeshStandardMaterial({
// 		color: islandParams.windowColor,
// 		roughness: 0.9,
// 	});
// 	const windowMesh = new THREE.Mesh(windowGeom, windowMat);
// 	windowMesh.position.set(0, 0.2, 1.4);
// 	house.add(windowMesh);

// 	return house;
// }

export const createIsland = () => {
  const island = new THREE.Group();

  const islandGeom = new THREE.DodecahedronGeometry(10, 0);
  islandMat = new THREE.MeshStandardMaterial({
    color: islandParams.islandColor,
    roughness: 0.9,
  });
  const islandMesh = new THREE.Mesh(islandGeom, islandMat);
  islandMesh.position.set(0, -5, 1);
  islandMesh.scale.set(1.4, 1, 1);
  islandMesh.rotation.x = Math.PI / 5;
  islandMesh.rotation.y = Math.PI;
  island.add(islandMesh);

  const tree = createTree();
  tree.position.set(1.6, -1.2, 1);
  island.add(tree);

  const bush = createBush();
  island.add(bush);

  addGui();

  return island;
};

const addGui = () => {
  const islandFolder = gui.addFolder("Island");
  islandFolder
    .addColor(islandParams, "islandColor")
    .onChange((value: string) => {
      islandMat?.color.set(value);
    });

  // islandFolder.addColor(islandParams, "houseColor").onChange((value: string) => {
  // 	houseMat?.color.set(value);
  // });

  // islandFolder.addColor(islandParams, "windowColor").onChange((value: string) => {
  // 	windowMat?.color.set(value);
  // });

  islandFolder
    .addColor(islandParams, "leavesColor")
    .onChange((value: string) => {
      leavesMaterial?.color.set(value);
    });

  islandFolder
    .addColor(islandParams, "trunkColor")
    .onChange((value: string) => {
      trunkMaterial?.color.set(value);
    });

  islandFolder
    .addColor(islandParams, "bushesColor")
    .onChange((value: string) => {
      bushesMaterial?.color.set(value);
    });

  islandFolder
    .addColor(islandParams, "flower1Color")
    .onChange((value: string) => {
      flower1Material?.color.set(value);
    });

  islandFolder
    .addColor(islandParams, "flower2Color")
    .onChange((value: string) => {
      flower2Material?.color.set(value);
    });
};
