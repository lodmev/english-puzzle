import './start-screen.scss';
import appState from '../../controllers/state';
import View from '../view';

const startScreenHandlers = {
  onStart: () => {},
  onLogout: () => {},
};
function greeter() {
  const greeterElement = new View({ tag: 'section', classList: ['greeter'] });
  return greeterElement;
}
const startScreen = new View({ tag: 'div', classList: ['start-screen'] });
const greeterElement = greeter();
function logout() {
  const logoutElement = new View({ tag: 'div', classList: ['logout'] });
  const logoutButton = new View({
    tag: 'i',
    classList: ['button', 'fa-solid', 'fa-arrow-right-from-bracket'],
    callback: [
      'click',
      () => {
        startScreenHandlers.onLogout();
      },
    ],
  });
  logoutButton.setAttributes(['title', 'Logout']);
  logoutElement.append(logoutButton);
  return logoutElement;
}

function header() {
  const headerElement = new View({
    tag: 'header',
    classList: ['start-screen__header'],
  });

  const gameName = new View({
    tag: 'h1',
    classList: ['game-name'],
  });

  gameName.view.append('ENGLISH PUZZLE');
  headerElement.append(gameName);
  return headerElement;
}

function description() {
  const descriptionElement = new View({
    tag: 'section',
    classList: ['description'],
  });
  const gameDescriptions = new View({
    tag: 'div',
    classList: ['game-description'],
  }).cloneSelf(2);
  gameDescriptions[0].view.append('Click on words, collect phrases.');
  gameDescriptions[1].view.append('Select tooltips in the menu.');
  descriptionElement.append(...gameDescriptions);
  return descriptionElement;
}

function startButton() {
  const button = new View({ tag: 'button', classList: ['start-button'] });
  button.view.addEventListener('click', () => startScreenHandlers.onStart());
  button.view.append('Start');
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
  greeterElement.view.innerText = `Hello, ${appState.getValue('firstName') ?? ''} ${appState.getValue('surName') ?? ''}!`;
  return startScreen;
}
export default createStartScreen;
export { startScreenHandlers };
