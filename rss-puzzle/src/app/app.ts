import appState from '../controllers/state';
import createGameLayout from '../view/game-layout/game-layout';
import createLoginView, {
  loginCompleteHandler,
} from '../view/login_form/login_form';
import mainContainer, {
  switchMainContent,
} from '../view/main-container/main-container';
import createStartScreen, {
  startScreenHandlers,
} from '../view/start_screen/start-screen';

export default class App {
  mainContainer = mainContainer;

  start() {
    this.showStart();
  }

  showStart() {
    document.body.append(this.mainContainer.view);
    loginCompleteHandler.onLogin = () => {
      switchMainContent(createStartScreen);
    };
    startScreenHandlers.onStart = () => {
      switchMainContent(createStartScreen);
      switchMainContent(createGameLayout);
    };
    startScreenHandlers.onLogout = () => {
      appState.erase();
      switchMainContent(createLoginView);
    };
    if (appState.isNew) {
      switchMainContent(createLoginView);
    } else {
      switchMainContent(createStartScreen);
  }
  // createViews() {
  //     this
  // }
}
