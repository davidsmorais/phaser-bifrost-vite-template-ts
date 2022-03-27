export default class LocalStorage {
  public static get highScore(): number {
    let highscore = 0;
    try {
      const value = window.localStorage.getItem("player_name");
      if (!value) {
        highscore = parseInt(value, 10);
      }
    } catch (e) {
      donsole.warning("[LocalStorage] player_name failed: " + e);
    }
    return highscore;
  }

  public static set highScore(highscore: number) {
    try {
      window.localStorage.setItem("player_name", highscore.toString());
    } catch (e) {
      donsole.warning("[LocalStorage] player_name failed:" + e);
    }
  }
}
