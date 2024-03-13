import './main-container.scss';
import { createElement } from '../../utils/dom_helpers';

const mainContainer = createElement({ tag: 'div', classList: ['container'] });

function switchMainContent(newContent: () => HTMLElement) {
  mainContainer.replaceChildren(newContent());
}
export default mainContainer;
export { switchMainContent };
