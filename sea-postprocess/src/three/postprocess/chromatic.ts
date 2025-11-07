import type { ShaderNodeObject } from "three/src/nodes/TSL.js";
import type { Node, TextureNode } from "three/webgpu";
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { dof } from "three/addons/tsl/display/DepthOfFieldNode.js";
import * as THREE from "three";
import { float, uniform } from "three/tsl";
// import { gui } from "../../gui/gui";

const chromaticParams = {
  centerX: 0.4,
  centerY: 0.4,
};

export const createChromatic = (
  node: ShaderNodeObject<TextureNode>,
  viewZ: ShaderNodeObject<Node>,
) => {
  const centerVector = new THREE.Vector2(
    chromaticParams.centerX,
    chromaticParams.centerY,
  );
  const centerNode = uniform(centerVector);
  const chromaticPass = chromaticAberration(node, float(0.2), centerNode);

  const dofPass = dof(chromaticPass, viewZ);

  return dofPass;
};
