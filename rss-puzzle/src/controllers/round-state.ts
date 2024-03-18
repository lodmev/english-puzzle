import { Round } from '../models/models';
import { IMAGES_URL, IMAGE_RATIO } from '../constants';
import { createElement } from '../utils/dom_helpers';

export default class RoundState {
  private round: Round;

  private roundImage = createElement({ tag: 'img', classList: 'round-image' });

  private scale = IMAGE_RATIO;

  currentRowIndex = 0;

  rowHeight = 20;

  resultWidth = 0;

  resultHeight = 0;

  constructor(round: Round) {
    this.round = round;
  }

  getImage() {
    return this.roundImage;
  }

  getRowsCount() {
    return this.round.words.length;
  }

  private loadImage() {
    return new Promise<void>((resolve, reject) => {
      this.roundImage.addEventListener('load', () => {
        resolve();
      });
      this.roundImage.addEventListener('error', (e) => {
        reject(e);
      });
      this.roundImage.src = `${IMAGES_URL}${this.round.levelData.imageSrc}`;
    });
  }

  calculateSizes() {
    const screenWidth = parseInt(
      window.getComputedStyle(document.documentElement).width,
      10
    );
    if (screenWidth <= this.roundImage.width) {
      this.scale = (screenWidth / this.roundImage.width) * IMAGE_RATIO;
    }
    this.resultWidth = this.roundImage.width * this.getScale();
    this.resultHeight = this.roundImage.height * this.getScale();
    this.rowHeight = this.resultHeight / this.round.words.length;
  }

  getScale() {
    return this.scale;
  }

  getRowsData() {
    return this.round.words[this.currentRowIndex];
  }

  async getReady() {
    await this.loadImage();
    this.calculateSizes();
  }
}
