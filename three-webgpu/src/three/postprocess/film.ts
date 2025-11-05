import type { ShaderNodeObject } from "three/src/nodes/TSL.js";
import type { Node, TextureNode } from "three/webgpu";
import { chromaticAberration } from "three/addons/tsl/display/ChromaticAberrationNode.js";
import { dof } from "three/addons/tsl/display/DepthOfFieldNode.js";
import * as THREE from "three";
import { float, uniform } from "three/tsl";
import { gui } from "../gui";
import { film } from "three/addons/tsl/display/FilmNode.js";

export const createFilm = (
  node: ShaderNodeObject<TextureNode>,
  viewZ: ShaderNodeObject<Node>,
) => {
  const chromaticFolder = gui.addFolder("Chromatic / DOF");
  const chromaticParams = {
    centerX: 0.4,
    centerY: 0.4,
  };

  const centerVector = new THREE.Vector2(
    chromaticParams.centerX,
    chromaticParams.centerY,
  );
  const centerNode = uniform(centerVector);
  const chromaticPass = film(node, float(0.2), centerNode);

  // const dofPass = dof(chromaticPass, viewZ);

  // chromaticFolder
  //   .add(chromaticParams, "centerX", 0, 1, 0.01)
  //   .name("Center X")
  //   .onChange((value: number) => {
  //     centerVector.x = value;
  //     centerNode.value.x = value;
  //   });

  // chromaticFolder
  //   .add(chromaticParams, "centerY", 0, 1, 0.01)
  //   .name("Center Y")
  //   .onChange((value: number) => {
  //     centerVector.y = value;
  //     centerNode.value.y = value;
  //   });

  return chromaticPass;
};
