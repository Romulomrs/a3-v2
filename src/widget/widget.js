import { getColorIterator } from "./utils/colors/color.js"
import { faces1 } from "./avatar/face/face1.js"
import { eyes as eyes1 } from "./avatar/eyes/eyes1.js"
import { eyes2 } from "./avatar/eyes/eyes2.js"
import { mouths as mouths1 } from "./avatar/mouth/mouth1.js"
import { mouths2 } from "./avatar/mouth/mouth2.js"
import { necks } from "./avatar/neck.js"
import { clothes1 } from "./avatar/clothes/clothes1.js"
import { clothes2 } from "./avatar/clothes/clothes2.js"
import { hairs as hairs1 } from "./avatar/hair/hair1.js"
import { hairs2 } from "./avatar/hair/hair2.js"
import { hairs3 } from "./avatar/hair/hair3.js" 
import { mouths3 } from "./avatar/mouth/mouth3.js"
import { clothes3 } from "./avatar/clothes/clothes3.js" 
import { hairs4 } from "./avatar/hair/hair4.js"
import { eyes3 } from "./avatar/eyes/eyes3.js"
import { mouths4 } from "./avatar/mouth/mouth4.js"
import { eyes4 } from "./avatar/eyes/eyes4.js"
import {clothes4} from "./avatar/clothes/clothes4.js"
import { hairs5 } from "./avatar/hair/hair5.js"
import {mouths5} from"./avatar/mouth/mouth5.js"
import { hairs6 } from "./avatar/hair/hair6.js"
import { clothes5 } from "./avatar/clothes/clothes5.js"
function widget(key, draw) {
  const nextColor = getColorIterator(key)

  // fundo baseado na key
  draw
    .rect()
    .size(500, 500)
    .move(250, 250)
    .fill(nextColor())

  const avatar = draw.group()

  // 1) layout (0,1,2) – TODAS as partes seguem esse índice
  const maxLayouts = Math.min(
    faces1.length,
    eyes1.length,
    mouths1.length,
    necks.length,
    hairs1.length,
    clothes1.length,
    clothes2.length,
 
  )

  const setIndex = 0

  const neckSvg = necks[setIndex]
  const faces1Svg = faces1[setIndex]

  // ROUPA – escolher estilo dentro do layout
  const clothesSets = [clothes1, clothes2,clothes3,clothes4,clothes5]
  const numClothesStyles = clothesSets.length
  const clothesStyleIndex =
    numClothesStyles > 0 ? key.next16() % numClothesStyles : 0
  const clothesSvg = clothesSets[clothesStyleIndex][setIndex]

  // CABELO – escolher estilo dentro do layout
  // CABELO – escolher estilo dentro do layout
  const hairSets = [hairs1, hairs2, hairs3,hairs4,hairs5,hairs6]   // ← adicionando o novo pack
  const numHairStyles = hairSets.length
  const hairStyleIndex =
    numHairStyles > 0 ? key.next16() % numHairStyles : 0
  const hairSvg = hairSets[hairStyleIndex][setIndex]


  // OLHOS – escolher estilo dentro do layout
  const eyeSets = [eyes1, eyes2,eyes3,eyes4]
  const numEyeStyles = eyeSets.length
  const eyeStyleIndex =
    numEyeStyles > 0 ? key.next16() % numEyeStyles : 0
  const eyesSvg = eyeSets[eyeStyleIndex][setIndex]

  // BOCA – escolher estilo dentro do layout (mouth1 x mouth2)
  const mouthSets = [mouths1, mouths2,mouths3,mouths4,mouths5]
  const numMouthStyles = mouthSets.length
  const mouthStyleIndex =
    numMouthStyles > 0 ? key.next16() % numMouthStyles : 0
  const mouthSvg = mouthSets[mouthStyleIndex][setIndex]

  // ordem de sobreposição
  avatar.svg(neckSvg)      // pescoço atrás
  avatar.svg(clothesSvg)   // roupa na frente do pescoço
  avatar.svg(faces1Svg)      // rosto
  avatar.svg(mouthSvg)     // boca
  avatar.svg(eyesSvg)      // olhos/óculos
  avatar.svg(hairSvg)      // cabelo por cima

const wrapper = draw.group()
wrapper.add(avatar)
wrapper.move(185, 75)
wrapper.scale(0.5)
  
}

export default widget



