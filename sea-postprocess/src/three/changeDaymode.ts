/**
 * 昼/夜モードを変更する
 * @param mode day:昼、night:夜
 */
export const setDayMode = (mode: "day" | "night", callbacks: ((mode: "day" | "night") => void)[]) => {
  // 昼/夜モード変更時のコールバックを呼び出す
  for (const callback of callbacks) {
    callback(mode);
  }
};
