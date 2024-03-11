import appState from '../controllers/state';
import gameLayout from '../view/game-layout/game-layout';
import loginView, { loginCompleteHandler } from '../view/login_form/login_form';
import mainContainer, {
  switchMainContent,
} from '../view/main-container/main-container';
import startScreen, {
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
      switchMainContent(startScreen.view);
    };
    startScreenHandlers.onStart = () => {
      switchMainContent(startScreen.view);
      switchMainContent(gameLayout.view);
    };
    startScreenHandlers.onLogout = () => {
      appState.erase();
      switchMainContent(loginView.view);
    };
    if (appState.isNew) {
      switchMainContent(loginView.view);
    } else {
      switchMainContent(startScreen.view);
    }
  }
  // createViews() {
  //     this
  // }
}
