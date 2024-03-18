import './start-screen.scss';
import appState from '../../controllers/app_state';
import { cloneElement, createElement } from '../../utils/dom_helpers';

const startScreenHandlers = {
  onStart: () => {},
  onLogout: () => {},
};
function greeter() {
  const greeterElement = createElement({
    tag: 'section',
    classList: ['greeter'],
  });
  return greeterElement;
}
const startScreen = createElement({ tag: 'div', classList: ['start-screen'] });
const greeterElement = greeter();
function logout() {
  const logoutElement = createElement({ tag: 'div', classList: ['logout'] });
  const logoutButton = createElement({
    tag: 'i',
    classList: ['button', 'fa-solid', 'fa-arrow-right-from-bracket'],
    callback: [
      'click',
      () => {
        startScreenHandlers.onLogout();
      },
    ],
  });
  logoutButton.setAttribute('title', 'Logout');
  logoutElement.append(logoutButton);
  return logoutElement;
}

function header() {
  const headerElement = createElement({
    tag: 'header',
    classList: ['start-screen__header'],
  });

  const gameName = createElement({
    tag: 'h1',
    classList: ['game-name'],
  });

  gameName.append('ENGLISH PUZZLE');
  headerElement.append(gameName);
  return headerElement;
}

function description() {
  const descriptionElement = createElement({
    tag: 'section',
    classList: ['description'],
  });
  const gameDescription1 = createElement({
    tag: 'div',
    classList: ['game-description'],
  });
  const gameDescription2 = cloneElement(gameDescription1);
  gameDescription1.append('Click on words, collect phrases.');
  gameDescription2.append('Select tooltips in the menu.');
  descriptionElement.append(gameDescription1, gameDescription2);
  return descriptionElement;
}

function startButton() {
  const button = createElement({ tag: 'button', classList: ['start-button'] });
  button.addEventListener('click', () => startScreenHandlers.onStart());
  button.append('Start');
  return button;
}

startScreen.append(
  logout(),
  header(),
  description(),
  greeterElement,
  startButton()
);
function createStartScreen() {
  const firstName = appState.getValue('firstName');
  const surName = appState.getValue('surName');
  if (typeof firstName === 'string' && typeof surName === 'string') {
    greeterElement.innerText = `Hello, ${firstName} ${surName}!`;
  }
  return startScreen;
}
export default createStartScreen;
export { startScreenHandlers };
