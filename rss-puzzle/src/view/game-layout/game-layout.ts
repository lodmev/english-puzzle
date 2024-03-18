import './game-layout.scss';
import { createElement } from '../../utils/dom_helpers';
import GameState from '../../controllers/game_state';
import loading from '../loading/loading';
import ResultBlock from './result-block';
import SourceBlock from './source-block';
import { RoundActions } from '../../controllers/actions';
import ActionButtons from './action-buttons';
import RoundState from '../../controllers/round-state';

const gameLayout = createElement({ tag: 'main', classList: ['game-layout'] });
const gameState = new GameState();
let sourceBlock: SourceBlock;
let roundState: RoundState;
let actions: RoundActions;
let actionButtons: ActionButtons;

function nextSentence() {
  const newSourceBlock = new SourceBlock(roundState);
  gameLayout.replaceChild(newSourceBlock.view, sourceBlock.view);
  sourceBlock = newSourceBlock;
  const newActionButtons = new ActionButtons();
  gameLayout.replaceChild(newActionButtons.view, actionButtons.view);
  actionButtons = newActionButtons;
  actions.sourceBlock = newSourceBlock;
  actions.actionButtons = newActionButtons;
  actions.addActionListeners();
}

function loadGame() {
  gameLayout.replaceChildren(loading);
  gameState
    .getRound()
    .then((gotRoundState) => {
      roundState = gotRoundState;
      const resultBlock = new ResultBlock(roundState);
      sourceBlock = new SourceBlock(roundState);
      actionButtons = new ActionButtons();
      actions = new RoundActions(
        roundState,
        sourceBlock,
        resultBlock,
        actionButtons,
        nextSentence
      );
      actions.addActionListeners();
      gameLayout.replaceChildren(
        resultBlock.view,
        sourceBlock.view,
        actionButtons.view
      );
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
