type ViewParams = {
  tag: keyof HTMLElementTagNameMap;
  classList: string[];
  callback?: Parameters<HTMLElement['addEventListener']>;
};

export default class View<T extends HTMLElement = HTMLElement> {
  element: T;

  constructor(params: ViewParams | T) {
    if (params instanceof HTMLElement) {
      this.element = params;
    } else {
      this.element = View.createView<T>(params);
    }
  }

  get view() {
    return this.element;
  }

  append(...nodes: View[]) {
    this.element.append(...nodes.map((node) => node.view));
  }

  cloneSelf(count: number, deep?: boolean): View<T>[] {
    const result = Array<View<T>>(count);
    for (let i = 0; i < count; i += 1) {
      result[i] = new View(this.element.cloneNode(deep) as T);
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

  static createView<T extends HTMLElement = HTMLElement>(
    params: ViewParams
  ): T {
    const el = document.createElement(params.tag) as T;
    el.classList.add(...params.classList);
    if (params.callback) {
      el.addEventListener(...params.callback);
    }
    return el;
  }
}
