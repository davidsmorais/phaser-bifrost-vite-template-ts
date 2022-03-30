class Bifrost {
  config: RealmConfig;
  bus: Element;
  realmList: string[];

  constructor(config: RealmConfig) {
    this.config = config;
    const { realms } = config;
    const realmList = Object.keys(realms);
    this.bus = document.createElement("bifrost");
  }

  openRealm(name: string, callback) {
    this.addEventListener(`bifrost-${name}`, callback);
  }

  closeRealm(name: string) {
    this.removeEventListener(`bifrost-${name}`, () =>
      donsole.log("Closed Realm ", name)
    );
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
