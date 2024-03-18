import ActionButtons from '../view/game-layout/action-buttons';
import ResultBlock from '../view/game-layout/result-block';
import SourceBlock, { SentencePieces } from '../view/game-layout/source-block';
import RoundState from './round-state';

export function checkSentence(
  correctSentence: SentencePieces,
  currentSentence: HTMLCollection
) {
  let allCorrect = false;
  Array.prototype.forEach.call(currentSentence, (value, index) => {
    if (value instanceof HTMLCanvasElement) {
      const puzzleElement = correctSentence.get(index);
      if (puzzleElement !== undefined) {
        if (puzzleElement.puzzlePiece === value) {
          puzzleElement.puzzlePiece.classList.remove('incorrect');
          allCorrect = true;
        } else {
          puzzleElement.puzzlePiece.classList.add('incorrect');
          allCorrect = false;
        }
      }
    }
  });
  return allCorrect;
}

export class RoundActions {
  roundState: RoundState;

  sourceBlock: SourceBlock;

  resultBlock: ResultBlock;

  actionButtons: ActionButtons;

  nextSentence: () => void;

  constructor(
    roundState: RoundState,
    sourceBlock: SourceBlock,
    resultBlock: ResultBlock,
    actionButtons: ActionButtons,
    nextSentence: () => void
  ) {
    this.roundState = roundState;
    this.sourceBlock = sourceBlock;
    this.resultBlock = resultBlock;
    this.actionButtons = actionButtons;
    this.nextSentence = nextSentence;
  }

  addActionListeners() {
    this.sourceBlock.moveListeners.push((element: HTMLCanvasElement) => {
      this.moveToResult(element);
    });
    this.sourceBlock.emptySourceListeners.push((sentence: SentencePieces) => {
      this.actionButtons.allowCheckButton(true);
      const currentSentence = this.resultBlock.getCurrentRowChildren();
      const allowContinue = () => this.actionButtons.allowContinue();
      const eventHandler = () => {
        if (checkSentence(sentence, currentSentence)) {
          allowContinue();
          this.sourceBlock.checkComplete = true;
          this.actionButtons.checkContinueButton.removeEventListener(
            'click',
            eventHandler
          );
          this.actionButtons.checkContinueButton.addEventListener(
            'click',
            () => {
              this.nextRow();
            }
          );
        }
      };
      this.actionButtons.checkContinueButton.addEventListener(
        'click',
        eventHandler
      );
    });
    this.sourceBlock.notEmptySourceListeners.push(() => {
      this.actionButtons.allowCheckButton(false);
    });
  }

  moveToResult(element: HTMLCanvasElement) {
    this.resultBlock.placeToRow(element);
  }

  nextRow() {
    if (this.roundState.currentRowIndex + 1 >= this.roundState.getRowsCount()) {
      this.resultBlock.showImage();
    } else {
      this.roundState.currentRowIndex += 1;
      this.nextSentence();
    }
  }
}
