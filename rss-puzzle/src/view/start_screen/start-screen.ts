import './start-screen.scss';
import View from '../view';

const startScreenHandlers = {
  onStart: () => {},
  onLogout: () => {},
};
const startScreen = new View({ tag: 'div', classList: ['start-screen'] });

function createLogout() {
  const logout = new View({ tag: 'div', classList: ['logout'] });
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
  logout.append(logoutButton);
  return logout;
}

function createHeader() {
  const header = new View({
    tag: 'header',
    classList: ['start-screen__header'],
  });

  const gameName = new View({
    tag: 'h1',
    classList: ['game-name'],
  });

  gameName.view.append('ENGLISH PUZZLE');
  header.append(gameName);
  return header;
}

function description() {
  const descriptionSection = new View({
    tag: 'section',
    classList: ['description'],
  });
  const gameDescriptions = new View({
    tag: 'div',
    classList: ['game-description'],
  }).cloneSelf(2);
  gameDescriptions[0].view.append('Click on words, collect phrases.');
  gameDescriptions[1].view.append('Select tooltips in the menu');
  descriptionSection.append(...gameDescriptions);
  return descriptionSection;
}

function startButton() {
  const button = new View({ tag: 'button', classList: ['start-button'] });
  button.view.addEventListener('click', () => startScreenHandlers.onStart());
  button.view.append('Start');
  return button;
}

function createContent() {
  startScreen.append(
    createLogout(),
    createHeader(),
    description(),
    startButton()
  );
}
createContent();
export default startScreen;
export { startScreenHandlers };
