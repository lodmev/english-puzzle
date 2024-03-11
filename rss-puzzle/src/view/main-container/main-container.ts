import './main-container.scss';
import View from '../view';

const mainContainer = new View({ tag: 'div', classList: ['container'] });
function switchMainContent(...newContent: (string | Node)[]) {
  mainContainer.view.replaceChildren(...newContent);
}
export default mainContainer;
export { switchMainContent };
