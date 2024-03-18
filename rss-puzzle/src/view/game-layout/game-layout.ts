import './game-layout.scss';
import { createElement } from '../../utils/dom_helpers';
import GameState from '../../controllers/game_state';
import loading from '../loading/loading';
import ResultBlock from './result-block';
import SourceBlock from './source-block';
import RoundActions from '../../controllers/actions';

const gameLayout = createElement({ tag: 'main', classList: ['game-layout'] });
const gameState = new GameState();

function loadGame() {
  gameLayout.replaceChildren(loading);
  gameState
    .getRound()
    .then((roundState) => {
      const resultBlock = new ResultBlock(roundState);
      const sourceBlock = new SourceBlock(roundState);
      const actions = new RoundActions(roundState, sourceBlock, resultBlock);
      actions.addMoveListeners();
      gameLayout.replaceChildren(resultBlock.view, sourceBlock.view);
    })
    .catch((err) => {
      window.console.log(err);
    });
}
loadGame();
function createGameLayout() {
  return gameLayout;
}
export default createGameLayout;
