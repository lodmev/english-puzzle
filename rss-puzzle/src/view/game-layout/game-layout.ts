import { createElement } from '../../utils/dom_helpers';

const gameLayout = createElement({ tag: 'main', classList: ['game-layout'] });
function createGameLayout() {
  return gameLayout;
}
export default createGameLayout;
