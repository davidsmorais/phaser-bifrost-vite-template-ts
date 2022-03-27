declare global {
  let DEBUG: boolean;
  let GAME_WIDTH: number;
  let GAME_HEIGHT: number;
  let donsole: any; // eslint-disable-line
  interface Window {
    GAME_WIDTH: number;
    GAME_HEIGHT: number;
    DEBUG: boolean;
    donsole: any; // eslint-disable-line
  }
}

export {};
