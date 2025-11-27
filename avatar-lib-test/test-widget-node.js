import keygen from "./keygen.js";
import { getColorIterator } from "../src/widget/utils/colors/color.js";
import widget from "../src/widget/widget.js";

// Mini implementação de draw para Node.js
function createDraw() {
  const elements = [];
  return {
    rect() { return this; },
    size() { return this; },
    move() { return this; },
    fill(color) { elements.push(`<rect fill="${color}" />`); return this; },
    group() { 
      const g = createDraw();
      elements.push(g);
      return g;
    },
    svg(svgString) { elements.push(svgString); return this; },
    add(el) { elements.push(el); return this; },
    scale() { return this; },
    toString() {
      return elements.map(el => typeof el === 'string' ? el : el.toString()).join("\n");
    },
    svg() { return `<svg xmlns="http://www.w3.org/2000/svg">${this.toString()}</svg>`; }
  };
}

// Inicializa key
keygen.getKeyParams("ana123");

// Inicializa draw
const draw = createDraw();

// Chama widget
widget(keygen, draw);

// Mostra SVG final
console.log(draw.svg());
