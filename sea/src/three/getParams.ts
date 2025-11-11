/**
 * パラメータの取得
 * @param mode 昼/夜モード
 */
export const getParams = (mode: "day" | "night") => {
  if (mode === "day") {
    return {
      backgroundColor: "#87ceeb",
      ambientLightIntensity: 1,
      dirLight1Intensity: 1,
      dirLight2Intensity: 1,
      dirLight3Intensity: 1,
      cloudColor: "#ffffff",
      islandColor: "#a59f83",
      leavesColor: "#86b964",
      trunkColor: "#b38f75",
      bushesColor: "#558038",
    };
  } else {
    return {
      backgroundColor: "#10465b",
      ambientLightIntensity: 0.2,
      dirLight1Intensity: 0.5,
      dirLight2Intensity: 0.5,
      dirLight3Intensity: 0.5,
      cloudColor: "#545454",
      islandColor: "#565243",
      leavesColor: "#3c542b",
      trunkColor: "#6a5444",
      bushesColor: "#344d23",
    };
  }
};
