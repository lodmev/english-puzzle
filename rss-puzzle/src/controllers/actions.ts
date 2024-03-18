import ResultBlock from '../view/game-layout/result-block';
import SourceBlock from '../view/game-layout/source-block';
import RoundState from './round-state';

export default class RoundActions {
  roundState: RoundState;

  sourceBlock: SourceBlock;

  resultBlock: ResultBlock;

  constructor(
    roundState: RoundState,
    sourceBlock: SourceBlock,
    resultBlock: ResultBlock
  ) {
    this.roundState = roundState;
    this.sourceBlock = sourceBlock;
    this.resultBlock = resultBlock;
  }

  addMoveListeners() {
    this.sourceBlock.moveListeners.push((element: HTMLCanvasElement) => {
      this.moveToResult(element);
    });
  }

  moveToResult(element: HTMLCanvasElement) {
    this.resultBlock.placeToRow(element);
  }
}
