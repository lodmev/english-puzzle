import './result-block.scss';
import { cloneElement, createElement } from '../../utils/dom_helpers';
import RoundState from '../../controllers/round-state';

type ResultRow = ReturnType<typeof getResultRow>;

function getResultRow() {
  const element = createElement({ tag: 'div', classList: 'result-row' });
  return element;
}

export default class ResultBlock {
  private element = createElement({ tag: 'div', classList: ['result-block'] });

  private bgImage: HTMLImageElement;

  private rows: ResultRow[];

  private roundState: RoundState;

  moveListeners: Array<(element: HTMLCanvasElement) => void> = [];

  constructor(roundState: RoundState) {
    this.roundState = roundState;
    this.bgImage = roundState.getImage();
    this.rows = Array<ResultRow>(roundState.getRowsCount());
    this.rows[0] = getResultRow();
    for (let i = 1; i < this.rows.length; i += 1) {
      this.rows[i] = cloneElement(this.rows[0]);
    }
    this.element.append(this.bgImage, ...this.rows);
    this.resize(roundState.resultWidth, roundState.resultHeight);
  }

  resize(width: number, height: number) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  get view() {
    return this.element;
  }

  placeToRow(element: HTMLElement) {
    this.rows[this.roundState.currentRowIndex].append(element);
  }
}
