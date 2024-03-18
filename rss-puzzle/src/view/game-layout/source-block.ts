import './source-block.scss';
import RoundState from '../../controllers/round-state';
import { createElement } from '../../utils/dom_helpers';
import { BORDER_WIDTH, MIN_WORD_SIDE_PADDING } from '../../constants';
import getRandomOrder from '../../utils/utils';

type PuzzlePiece = {
  puzzlePiece: HTMLCanvasElement;
  word: string;
};
export type SentencePieces = Map<number, PuzzlePiece>;

export default class SourceBlock {
  private roundState: RoundState;

  private element = createElement({ tag: 'div', classList: 'source-block' });

  private sentencePieces: Map<number, PuzzlePiece> = new Map<
    number,
    PuzzlePiece
  >();

  private movedAway = new Map<HTMLCanvasElement, HTMLElement>();

  private fontSize: number;

  checkComplete = false;

  moveListeners: Array<(element: HTMLCanvasElement) => void> = [];

  emptySourceListeners: Array<(sentence: SentencePieces) => void> = [];

  notEmptySourceListeners: Array<() => void> = [];

  constructor(roundState: RoundState) {
    this.roundState = roundState;
    this.element.style.font = window.getComputedStyle(
      document.documentElement
    ).font;
    this.fontSize = parseInt(this.element.style.fontSize, 10);
    this.fontSize += 15;
    this.element.style.fontSize = `${this.fontSize}px`;
    this.element.style.width = `${this.roundState.resultWidth + 30}px`;
    const words = this.roundState.getRowsData().textExample.split(' ');
    const additionalSpace = this.calculateAdditionalSpace(words);
    const pieces = this.createPieces(words);
    this.sizePieces(pieces, additionalSpace);
    this.processPieces();
    this.addPieces();
  }

  get view() {
    return this.element;
  }

  getTextWidth(word: string) {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx != null) {
      ctx.font = this.element.style.font;
      return ctx.measureText(word).width;
    }
    return 0;
  }

  getFreeSpace(
    wordsCount: number,
    textWidth: number,
    minSidePadding: number,
    borderWidth: number
  ) {
    const availableWidth = this.roundState.resultWidth;
    const wholePadding = minSidePadding * 2 * wordsCount;
    const wholeBorders = borderWidth * 2 * wordsCount;
    return availableWidth - (wholePadding + textWidth + wholeBorders);
  }

  calculateAdditionalSpace(words: string[]): number {
    const wholeFreeSpace = this.getFreeSpace(
      words.length,
      this.getTextWidth(words.join('')),
      MIN_WORD_SIDE_PADDING,
      BORDER_WIDTH
    );
    if (wholeFreeSpace < 0 && this.fontSize > 14) {
      this.element.style.fontSize = `${(this.fontSize -= 2)}px`;
      return this.calculateAdditionalSpace(words);
    }
    return wholeFreeSpace;
  }

  sizePieces(puzzlePieces: PuzzlePiece[], additionalSpace: number) {
    let firstSmallCount = 0;
    let remindAdditionalSpace = additionalSpace;
    const averageSmallCount = 4;
    const smallAddSpace = (additionalSpace * 0.7) / averageSmallCount; // 70% for small pieces
    const bigAddSpace =
      (additionalSpace - additionalSpace * 0.7) /
      (puzzlePieces.length - averageSmallCount);
    const sortedPuzzlePieces = puzzlePieces.sort(
      (pzA, pzB) => pzA.word.length - pzB.word.length
    );
    sortedPuzzlePieces.forEach((piece) => {
      const pzPiece = piece;
      const pieceAddSpace =
        firstSmallCount < averageSmallCount ? smallAddSpace : bigAddSpace;
      const pieceWidth =
        this.getTextWidth(piece.word) +
        2 * MIN_WORD_SIDE_PADDING +
        pieceAddSpace;
      remindAdditionalSpace -= pieceAddSpace;
      const pieceHeight = this.roundState.rowHeight - BORDER_WIDTH * 2;
      pzPiece.puzzlePiece.width = pieceWidth;
      pzPiece.puzzlePiece.height = pieceHeight;
      firstSmallCount += 1;
    });
    if (remindAdditionalSpace > 0) {
      sortedPuzzlePieces[0].puzzlePiece.width += remindAdditionalSpace;
    }
  }

  createPieces(words: string[]) {
    const pieces = Array<PuzzlePiece>(words.length);
    words.forEach((word, index) => {
      const puzzlePiece = createElement({
        tag: 'canvas',
        classList: 'row-piece',
      });
      pieces[index] = { puzzlePiece, word };
      this.sentencePieces.set(index, { puzzlePiece, word });
    });
    return pieces;
  }

  drawOnPuzzle(
    puzzlePiece: PuzzlePiece,
    { offsetX, offsetY }: { offsetX: number; offsetY: number }
  ) {
    const ctx = puzzlePiece.puzzlePiece.getContext('2d');
    if (!ctx) throw new Error(`can't get piece canvas context`);
    ctx.font = this.element.style.font;
    ctx.fillStyle = '#fff';
    const { width } = puzzlePiece.puzzlePiece;
    const { height } = puzzlePiece.puzzlePiece;
    const scale = this.roundState.getScale();
    ctx.drawImage(
      this.roundState.getImage(),
      offsetX / scale,
      offsetY,
      width / scale,
      height / scale,
      0,
      0,
      width,
      height
    );
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(puzzlePiece.word, width / 2, height / 2);
    ctx.fillStyle = '#bbb';
    ctx.strokeText(puzzlePiece.word, width / 2, height / 2);
  }

  processPieces() {
    let offsetX = 0;
    const offsetY = this.roundState.rowHeight * this.roundState.currentRowIndex;
    this.sentencePieces.forEach((piece) => {
      this.drawOnPuzzle(piece, { offsetX, offsetY });
      piece.puzzlePiece.addEventListener('click', () => {
        this.movePiece(piece.puzzlePiece);
      });
      offsetX += piece.puzzlePiece.width;
    });
  }

  addPieces() {
    const order = getRandomOrder(this.sentencePieces.size);
    for (let i = 0; i < order.length; i += 1) {
      const puzzlePiece = this.sentencePieces.get(order[i])?.puzzlePiece;
      if (puzzlePiece !== undefined) {
        const puzzleWrapper = createElement({ tag: 'div', classList: '' });
        puzzleWrapper.style.width = `${puzzlePiece.width}px`;
        puzzleWrapper.style.height = `${puzzlePiece.height}px`;
        puzzleWrapper.append(puzzlePiece);
        this.element.append(puzzleWrapper);
      } else {
        window.console.error('got wrong index map');
      }
    }
  }

  movePiece(puzzlePiece: HTMLCanvasElement) {
    let puzzleWrapper = this.movedAway.get(puzzlePiece);
    if (puzzleWrapper !== undefined) {
      // return back
      if (this.checkComplete) {
        return;
      }
      puzzlePiece.classList.remove('incorrect');
      puzzleWrapper.append(puzzlePiece);
      this.movedAway.delete(puzzlePiece);
      this.notEmptySourceListeners.forEach((fn) => fn());
    } else {
      // move to result
      puzzleWrapper = puzzlePiece.parentElement!;
      this.movedAway.set(puzzlePiece, puzzleWrapper);
      this.moveListeners.forEach((moveFunc) => {
        moveFunc(puzzlePiece);
      });
      if (this.movedAway.size === this.sentencePieces.size) {
        this.emptySourceListeners.forEach((fn) => fn(this.sentencePieces));
      }
    }
  }
}
