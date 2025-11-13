import type { ShaderNodeObject } from "three/src/nodes/TSL.js";
import type { Node, TextureNode } from "three/webgpu";
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { dof } from "three/addons/tsl/display/DepthOfFieldNode.js";
import * as THREE from "three";
import { float, uniform } from "three/tsl";

/**
 * Chromatic Aberration + Depth of Fieldエフェクトの作成
 * @param node
 * @param viewZ
 */
export const createChromatic = (node: ShaderNodeObject<TextureNode>, viewZ: ShaderNodeObject<Node>) => {
  const centerVector = new THREE.Vector2(0.4, 0.4);
  const centerNode = uniform(centerVector);
  // 色収差
  const chromaticPass = chromaticAberration(node, float(0.2), centerNode);
  // 被写界深度
  // 焦点をカメラの近くに固定し、遠くなるほどボケさせる
  const dofPass = dof(chromaticPass, viewZ, 1);
  return dofPass;
};
