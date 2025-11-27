import fs from 'fs';
import { createSVGWindow } from 'svgdom';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import keygen from '../src/keygen.js';
import { getColorIterator } from '../src/widget/utils/colors/color.js';
import { faces1 } from '../src/widget/avatar/face/face1.js';
import { eyes as eyes1 } from '../src/widget/avatar/eyes/eyes1.js';
import { eyes2 } from '../src/widget/avatar/eyes/eyes2.js';
import { mouths as mouths1 } from '../src/widget/avatar/mouth/mouth1.js';
import { mouths2 } from '../src/widget/avatar/mouth/mouth2.js';
import { necks } from '../src/widget/avatar/neck.js';
import { clothes1 } from '../src/widget/avatar/clothes/clothes1.js';
import { clothes2 } from '../src/widget/avatar/clothes/clothes2.js';
import { hairs as hairs1 } from '../src/widget/avatar/hair/hair1.js';
import { hairs2 } from '../src/widget/avatar/hair/hair2.js';
import { hairs3 } from '../src/widget/avatar/hair/hair3.js';
import { mouths3 } from '../src/widget/avatar/mouth/mouth3.js';
import { clothes3 } from '../src/widget/avatar/clothes/clothes3.js';
import { hairs4 } from '../src/widget/avatar/hair/hair4.js';
import { eyes3 } from '../src/widget/avatar/eyes/eyes3.js';
import { mouths4 } from '../src/widget/avatar/mouth/mouth4.js';
import { eyes4 } from '../src/widget/avatar/eyes/eyes4.js';
import { clothes4 } from '../src/widget/avatar/clothes/clothes4.js';
import { hairs5 } from '../src/widget/avatar/hair/hair5.js';
import { mouths5 } from '../src/widget/avatar/mouth/mouth5.js';
import { hairs6 } from '../src/widget/avatar/hair/hair6.js';
import { clothes5 } from '../src/widget/avatar/clothes/clothes5.js';

// criar janela SVG e registrar
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

// instanciar SVG
const draw = SVG(document.documentElement).size(500, 500);

function widget(key) {
  const nextColor = getColorIterator(key);

  // fundo baseado na key
  draw.rect().size(500, 500).fill(nextColor());

  const avatar = draw.group();

  const maxLayouts = Math.min(
    faces1.length,
    eyes1.length,
    mouths1.length,
    necks.length,
    hairs1.length,
    clothes1.length,
    clothes2.length,
  );

  const setIndex = 0;

  const neckSvg = necks[setIndex];
  const faces1Svg = faces1[setIndex];

  const clothesSets = [clothes1, clothes2, clothes3, clothes4, clothes5];
  const clothesStyleIndex = clothesSets.length > 0 ? key.next16() % clothesSets.length : 0;
  const clothesSvg = clothesSets[clothesStyleIndex][setIndex];

  const hairSets = [hairs1, hairs2, hairs3, hairs4, hairs5, hairs6];
  const hairStyleIndex = hairSets.length > 0 ? key.next16() % hairSets.length : 0;
  const hairSvg = hairSets[hairStyleIndex][setIndex];

  const eyeSets = [eyes1, eyes2, eyes3, eyes4];
  const eyeStyleIndex = eyeSets.length > 0 ? key.next16() % eyeSets.length : 0;
  const eyesSvg = eyeSets[eyeStyleIndex][setIndex];

  const mouthSets = [mouths1, mouths2, mouths3, mouths4, mouths5];
  const mouthStyleIndex = mouthSets.length > 0 ? key.next16() % mouthSets.length : 0;
  const mouthSvg = mouthSets[mouthStyleIndex][setIndex];

  // ordem de sobreposição
  avatar.svg(neckSvg);
  avatar.svg(clothesSvg);
  avatar.svg(faces1Svg);
  avatar.svg(mouthSvg);
  avatar.svg(eyesSvg);
  avatar.svg(hairSvg);

  const wrapper = draw.group();
  wrapper.add(avatar);
  wrapper.move(185, 75).scale(0.5);

  return draw.svg(); // retorna conteúdo SVG como string
}

// gerar key
const key = keygen.getKeyParams('Rômulo');

// gerar avatar e salvar
const svgContent = widget(key);
fs.writeFileSync('avatar.svg', svgContent, 'utf8');
console.log('Arquivo avatar.svg criado com sucesso!');
