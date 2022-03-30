class Bifrost {
  config: RealmConfig;
  bus: Element;
  realmList: string[];
  state: any;

  constructor(config: RealmConfig) {
    this.config = config;
    const { realms } = config;
    const realmList = Object.keys(realms);
    this.bus = document.createElement("bifrost-bridge");
  }

  openRealm(name: string, { state, props }) {
    this.dispatchEvent("bifrost-open", { detail: { name, state, props } });
  }

  closeRealm(name: string) {
    this.dispatchEvent("bifrost-close", { detail: { name } });
  }

  /**
   * Add an event listener.
   */
  addEventListener(event, callback) {
    this.bus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event, callback) {
    this.bus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event, ...args) {
    this.bus.dispatchEvent(new CustomEvent(event, ...args));
  }
}

export default Bifrost;
