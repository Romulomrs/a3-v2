// draw-emulator.mjs
class Element {
  constructor(tag, selfClosing = false) {
    this.tag = tag;
    this.attrs = {};
    this.children = [];
    this.selfClosing = selfClosing;
    this.inner = "";
    this.transform = [];
  }
  setAttr(k, v) { this.attrs[k] = String(v); return this; }
  addChild(el) { this.children.push(el); return this; }
  toString() {
    const attrText = Object.entries(this.attrs)
      .map(([k,v]) => `${k}="${v}"`).join(" ");
    const transformText = this.transform.length ? ` transform="${this.transform.join(' ')}"` : "";
    if (this.inner || this.children.length) {
      return `<${this.tag}${attrText?` ${attrText}`:""}${transformText}>${this.inner}${this.children.map(c=>c.toString()).join('')}</${this.tag}>`;
    }
    return `<${this.tag}${attrText?` ${attrText}`:""}${transformText} />`;
  }
}

export class Draw {
  constructor(width=500, height=500) {
    this.width = width;
    this.height = height;
    this.root = new Element('g');
  }

  rect() {
    const el = new Element('rect', true);
    const builder = {
      size: (w,h)=>{ el.setAttr('width', w).setAttr('height', h); return builder; },
      move: (x,y)=>{ el.setAttr('x', x).setAttr('y', y); return builder; },
      fill: (c)=>{ el.setAttr('fill', c); return builder; },
      done: ()=>{ this.root.addChild(el); return el; }
    };
    builder.done();
    return builder;
  }

  group() {
    const g = new Element('g');
    g.svg = (rawSvg) => {
      const wrapper = new Element('g');
      wrapper.inner = rawSvg;
      g.addChild(wrapper);
      return g;
    };
    g.add = (item) => {
      if (typeof item === 'string') {
        const wrapper = new Element('g');
        wrapper.inner = item;
        g.addChild(wrapper);
      } else if (item && typeof item.toString === 'function') {
        g.addChild(item);
      }
      return g;
    };
    g.move = (x,y) => { g.transform.push(`translate(${x} ${y})`); return g; };
    g.scale = (s) => { g.transform.push(`scale(${s})`); return g; };
    this.root.addChild(g);
    return g;
  }

  toString() {
    const svgOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.width} ${this.height}">`;
    const body = this.root.toString();
    return `${svgOpen}${body}</svg>`;
  }
}
