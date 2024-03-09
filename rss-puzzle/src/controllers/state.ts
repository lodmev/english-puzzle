type StateStorage = {
  firstName?: string;
  surName?: string;
} | null;
const APP_NAME = 'RSS-PUZZLE';
class State {
  private storage: StateStorage;

  constructor() {
    this.storage = JSON.parse(
      window.localStorage.getItem(APP_NAME) ?? 'null'
    ) as StateStorage;
  }

  get isNew() {
    return Boolean(!this.storage);
  }

  setValue(params: Partial<StateStorage>) {
    this.storage = { ...params, ...this.storage };
    window.localStorage.setItem(APP_NAME, JSON.stringify(params));
  }
}
export default new State();
