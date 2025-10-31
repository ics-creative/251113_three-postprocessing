import "./style.css";
import { init } from "./three";

const appElement = document.querySelector<HTMLDivElement>("#app");

if (appElement) {
  init(appElement);
}
