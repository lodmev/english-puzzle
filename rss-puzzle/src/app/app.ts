import appState from '../controllers/state';
import loginView from '../view/login_form/login_form';
import mainView from '../view/main-container/main-container';

export default class App {
  appView = mainView;

  constructor() {
    document.body.append(this.appView.view);
  }

  start() {
    this.updateView();
  }

  updateView() {
    if (appState.isNew) {
      this.appView.append(loginView);
    }
  }
  // createViews() {
  //     this
  // }
}
