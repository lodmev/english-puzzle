import './main-container.scss';
import View from '../view';

const mainContainer = new View({ tag: 'div', classList: ['container'] });

function switchMainContent(newContent: () => View) {
  mainContainer.view.replaceChildren(newContent().view);
}
export default mainContainer;
export { switchMainContent };
