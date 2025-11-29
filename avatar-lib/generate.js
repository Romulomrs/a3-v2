// avatar-lib/generate.js
import keygen from './keygen.js';
import { getColorIterator } from './src/widget/utils/colors/color.js';

import { faces1 } from './src/widget/avatar/face/face1.js';

import { eyes as eyes1 } from './src/widget/avatar/eyes/eyes1.js';
import { eyes2 } from './src/widget/avatar/eyes/eyes2.js';
import { eyes3 } from './src/widget/avatar/eyes/eyes3.js';
import { eyes4 } from './src/widget/avatar/eyes/eyes4.js';

import { mouths as mouths1 } from './src/widget/avatar/mouth/mouth1.js';
import { mouths2 } from './src/widget/avatar/mouth/mouth2.js';
import { mouths3 } from './src/widget/avatar/mouth/mouth3.js';
import { mouths4 } from './src/widget/avatar/mouth/mouth4.js';
import { mouths5 } from './src/widget/avatar/mouth/mouth5.js';

import { hairs as hairs1 } from './src/widget/avatar/hair/hair1.js';
import { hairs2 } from './src/widget/avatar/hair/hair2.js';
import { hairs3 } from './src/widget/avatar/hair/hair3.js';
import { hairs4 } from './src/widget/avatar/hair/hair4.js';
import { hairs5 } from './src/widget/avatar/hair/hair5.js';
import { hairs6 } from './src/widget/avatar/hair/hair6.js';

import { necks } from './src/widget/avatar/neck.js';

import { clothes1 } from './src/widget/avatar/clothes/clothes1.js';
import { clothes2 } from './src/widget/avatar/clothes/clothes2.js';
import { clothes3 } from './src/widget/avatar/clothes/clothes3.js';
import { clothes4 } from './src/widget/avatar/clothes/clothes4.js';
import { clothes5 } from './src/widget/avatar/clothes/clothes5.js';

// --- remove <svg> wrapper ---
function stripSVGWrapper(svgString) {
  return svgString.replace(/<svg[^>]*>/, '').replace('</svg>', '');
}

// --- gerador principal ---
export default function generateAvatar(seed = "default") {
  const key = keygen.getKeyParams(seed);

  // *** AQUI ESTAVA O ERRO ***
  // getColorIterator() precisa do key (que possui next256),
  // não da string seed.
  const nextColor = getColorIterator(key);

  // fundo baseado na seed
  const backgroundColor = nextColor();

  const allFaces = [...faces1];
  const allEyes = [...eyes1, ...eyes2, ...eyes3, ...eyes4];
  const allMouths = [...mouths1, ...mouths2, ...mouths3, ...mouths4, ...mouths5];
  const allHair = [...hairs1, ...hairs2, ...hairs3, ...hairs4, ...hairs5, ...hairs6];
  const allClothes = [...clothes1, ...clothes2, ...clothes3, ...clothes4, ...clothes5];
  const allNecks = [...necks];

  function pick(arr) {
    return arr[key.next16() % arr.length];
  }

  const clothesSvg = `<g>${stripSVGWrapper(pick(allClothes))}</g>`;
  const neckSvg = `<g>${stripSVGWrapper(pick(allNecks))}</g>`;

  // rosto com posição padrão
  const faceSvg = `
    <g transform="translate(15,15)">
      <circle cx="100" cy="100" r="63.75" fill="#f6f6f6" />
    </g>
  `;

  const hairSvg = `<g>${stripSVGWrapper(pick(allHair))}</g>`;
  const eyesSvg = `<g>${stripSVGWrapper(pick(allEyes))}</g>`;
  const mouthSvg = `<g>${stripSVGWrapper(pick(allMouths))}</g>`;

  const avatarParts = `
    ${neckSvg}
    ${clothesSvg}
    ${faceSvg}
    ${mouthSvg}
    ${hairSvg}
    ${eyesSvg}
    
  `;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-60 0 300 300">
    <rect width="300" height="250" fill="${backgroundColor}" />
    ${avatarParts}
  </svg>`;
}
