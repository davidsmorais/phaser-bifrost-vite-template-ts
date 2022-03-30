declare global {
  let DEBUG: boolean;
  let GAME_WIDTH: number;
  let GAME_HEIGHT: number;
  let donsole: any;
  interface Window {
    GAME_WIDTH: number;
    GAME_HEIGHT: number;
    DEBUG: boolean;
    donsole: any;
    Bifrost: any;
  }
}

export {};
