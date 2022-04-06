class Bifrost {
  config: RealmConfig;
  bus: Element;
  realmList: string[];
  language: string;
  locales: string[];
  locale: string;
  state: any;

  constructor(config: RealmConfig) {
    this.config = config;
    const { realms, locales } = config;
    this.locales = Object.keys(locales);
    this.bus = document.createElement("bifrost-bridge");
    this.setLocale(this.locales[0]);
  }

  setLocale(locale: string) {
    if (this.config.locales[locale]) {
      this.locale = locale;
    } else {
      console.error("❗Bifrost Error❗ Locale not found 👉", locale);
      console.info("⚠️ Available locales 👉", this.locales);
    }
  }

  openRealm(name: string, { state, props }) {
    this.dispatchEvent("bifrost-open", { detail: { name, state, props } });
  }

  updateRealm(name: string, { props }) {
    this.dispatchEvent("bifrost-update", { detail: { name, props } });
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

  translate(scene: string, key: string): string {
    return this.config.locales[this.locale][scene][key];
  }
}

export default Bifrost;
