type ElementParams<K extends keyof HTMLElementTagNameMap> = {
  tag: K;
  classList: string | string[];
  callback?: Parameters<HTMLElement['addEventListener']>;
};
export function createElement<K extends keyof HTMLElementTagNameMap>({
  tag,
  classList,
  callback,
}: ElementParams<K>) {
  const element = document.createElement(tag);
  if (typeof classList === 'string') {
    element.className = classList;
  } else {
    element.classList.add(...classList);
  }
  if (callback) {
    element.addEventListener(...callback);
  }
  return element;
}

export function cloneElement<El extends HTMLElement>(
  element: El,
  deep?: boolean
) {
  return element.cloneNode(deep) as typeof element;
}

export function copyElement<El extends HTMLElement>(
  element: El,
  count: number
) {
  const elements = Array<typeof element>(count);
  for (let i = 0; i < elements.length; i += 1) {
    elements[i] = cloneElement(element);
  }
  return elements;
}

export function setAttributes<El extends HTMLElement>(
  element: El,
  ...attributes: [string, string][]
) {
  attributes.forEach((attribute) => {
    const [qualifiedName, value] = attribute;
    element.setAttribute(qualifiedName, value);
  });
}
