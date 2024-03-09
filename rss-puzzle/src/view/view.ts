type ViewParams = {
  tag: string;
  classList: string[];
  callback?: Parameters<HTMLElement['addEventListener']>;
};
export default class View {
  element: HTMLElement;

  constructor(params: ViewParams | HTMLElement) {
    if (params instanceof HTMLElement) {
      this.element = params;
    } else {
      this.element = View.createView(params);
    }
  }

  get view() {
    return this.element;
  }

  append(...nodes: View[]) {
    this.element.append(...nodes.map((node) => node.view));
  }

  cloneSelf(count: number, deep?: boolean): View[] {
    const result = Array<View>(count);
    for (let i = 0; i < count; i += 1) {
      result[i] = new View(this.element.cloneNode(deep) as HTMLElement);
    }
    return result;
  }

  setAttributes(...attributes: [string, string][]) {
    for (let i = 0; i < attributes.length; i += 1) {
      const [attr, value] = attributes[i];
      this.element.setAttribute(attr, value);
    }
  }

  addClass(...className: string[]) {
    this.element.classList.add(...className);
  }

  removeClass(...className: string[]) {
    this.element.classList.remove(...className);
  }

  toggleClass(className: string) {
    this.element.classList.toggle(className);
  }

  static createView(params: ViewParams) {
    const el = document.createElement(params.tag);
    el.classList.add(...params.classList);
    if (params.callback) {
      el.addEventListener(...params.callback);
    }
    return el;
  }
}
