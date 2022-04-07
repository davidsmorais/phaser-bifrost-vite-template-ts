import * as Phaser from "phaser";

import BootScene from "@/scenes/BootScene";
import GameScene from "@/scenes/GameScene";
import TitleScene from "@/scenes/TitleScene";

export default class App extends Phaser.Game {
  public static start(): App {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      render: {
        pixelArt: true,
      },
      physics: {
        default: "arcade",
        arcade: {
          // debug: DEBUG,
          gravity: { y: 600 },
        },
      },
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        autoRound: true,
      },
      parent: "",
    };
    return new App(gameConfig);
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.scene.add("BootScene", BootScene);
    this.scene.add("TitleScene", TitleScene);
    this.scene.add("GameScene", GameScene);
    this.scene.start("BootScene");
  }
}
