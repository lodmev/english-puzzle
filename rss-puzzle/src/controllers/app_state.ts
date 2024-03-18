type StateStorage = {
  firstName: string;
  surName: string;
  savedRound: {
    level: number;
    round: number;
  };
};
const APP_NAME = 'RSS-PUZZLE';
class State {
  private storage: Partial<StateStorage> | null;

  constructor() {
    this.storage = JSON.parse(
      window.localStorage.getItem(APP_NAME) ?? 'null'
    ) as StateStorage;
  }

  getValue(key: keyof StateStorage) {
    return this.storage?.[key];
  }

  get isNew() {
    return Boolean(!this.storage);
  }

  setValue(params: Partial<StateStorage>) {
    if (this.storage != null) {
      Object.assign<Partial<StateStorage>, Partial<StateStorage>>(
        this.storage,
        params
      );
    } else {
      this.storage = params;
    }
    window.localStorage.setItem(APP_NAME, JSON.stringify(this.storage));
  }

  erase() {
    this.storage = null;
    window.localStorage.removeItem(APP_NAME);
  }
}
const appState = new State();
export default appState;
