import { createElement } from '../../utils/dom_helpers';
import './action-buttons.scss';

export default class ActionButtons {
  buttonsRow = createElement({ tag: 'section', classList: 'buttons-row' });

  notKnowButton = createElement({
    tag: 'button',
    classList: ['button', 'not-know-button'],
  });

  checkContinueButton = createElement({
    tag: 'button',
    classList: ['button', 'check-continue-button'],
  });

  constructor() {
    this.buttonsRow.append(this.notKnowButton, this.checkContinueButton);
    this.notKnowButton.innerText = `I don't know`;
    this.checkContinueButton.innerText = `Check`;
    this.checkContinueButton.setAttribute('disabled', '');
  }

  get view() {
    return this.buttonsRow;
  }

  allowCheckButton(allow: boolean) {
    if (allow) {
      this.checkContinueButton.removeAttribute('disabled');
    } else {
      this.checkContinueButton.setAttribute('disabled', '');
    }
  }

  allowContinue() {
    this.checkContinueButton.innerText = 'Continue';
  }
}
