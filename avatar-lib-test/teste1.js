import keygen from "../src/keygen.js";
import widgetTest from "./widgetTest.js";

const key = keygen.getKeyParams("ana123");
const svg = widgetTest(key);

console.log(svg);
