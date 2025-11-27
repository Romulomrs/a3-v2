import { faces1 } from "../src/widget/avatar/face/face1.js";
import { eyes as eyes1 } from "../src/widget/avatar/eyes/eyes1.js";
import { mouths as mouths1 } from "../src/widget/avatar/mouth/mouth1.js";
import { necks } from "../src/widget/avatar/neck.js";
import { clothes1 } from "../src/widget/avatar/clothes/clothes1.js";
import { hairs as hairs1 } from "../src/widget/avatar/hair/hair1.js";
import { getColorIterator } from "../src/widget/utils/colors/color.js";

function widgetTest(key) {
  const nextColor = getColorIterator(key);

  const setIndex = 0;

  // Fundo
  const bg = `<rect width="500" height="500" fill="${nextColor()}" />`;

  // Escolher partes do avatar
  const neckSvg = necks[setIndex] || "";
  const faceSvg = faces1[setIndex] || "";
  const eyesSvg = eyes1[setIndex] || "";
  const mouthSvg = mouths1[setIndex] || "";
  const hairSvg = hairs1[setIndex] || "";
  const clothesSvg = clothes1[setIndex] || "";

  // Combinar tudo
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    ${bg}
    ${neckSvg}
    ${clothesSvg}
    ${faceSvg}
    ${mouthSvg}
    ${eyesSvg}
    ${hairSvg}
  </svg>`;

  return svg;
}

export default widgetTest;
