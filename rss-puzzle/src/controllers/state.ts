type StateStorage = {
  firstName?: string;
  surName?: string;
};
const APP_NAME = 'RSS-PUZZLE';
class State {
  private storage: StateStorage | null;

  constructor() {
    this.storage = JSON.parse(
      window.localStorage.getItem(APP_NAME) ?? 'null'
    ) as StateStorage;
  }

  getValue(key: keyof StateStorage) {
    return this.storage?.[key] ?? null;
  }

  get isNew() {
    return Boolean(!this.storage);
  }

  setValue(params: Partial<StateStorage>) {
    this.storage = { ...params, ...this.storage };
    window.localStorage.setItem(APP_NAME, JSON.stringify(this.storage));
  }

  erase() {
    this.storage = null;
    window.localStorage.removeItem(APP_NAME);
  }
}
export default new State();
