import Phaser from "phaser";

import AnimatedTiles from "phaser-animated-tiles/src/plugin/main.js";

import * as Assets from "@/assets";
import Knight from "Sprites/Knight";

export default class GameScene extends Phaser.Scene {
  walls: any;
  map: any;
  player: Knight;
  spheres?: number;
  gates: Array<{ sprite: Phaser.GameObjects.Sprite; obj: any }>;
  sfxAudioSprites:
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.HTML5AudioSound = null;
  origin: {
    x: number;
    y: number;
  };
  sys: any;

  public preload(): void {
    this.load.scenePlugin(
      "animatedTiles",
      AnimatedTiles,
      "animatedTiles",
      "animatedTiles"
    );
    this.load.image(
      Assets.ImagesHudHpFullLeft.getName(),
      Assets.ImagesHudHpFullLeft.getPNG()
    );

    this.load.image(
      Assets.ImagesHudHpFullRight.getName(),
      Assets.ImagesHudHpFullRight.getPNG()
    );

    this.load.image(
      Assets.ImagesHudHpFullMid.getName(),
      Assets.ImagesHudHpFullMid.getPNG()
    );
    this.load.image(
      Assets.ImagesHudHpLeft.getName(),
      Assets.ImagesHudHpLeft.getPNG()
    );

    this.load.image(
      Assets.ImagesHudHpRight.getName(),
      Assets.ImagesHudHpRight.getPNG()
    );

    this.load.image(
      Assets.ImagesHudHpMid.getName(),
      Assets.ImagesHudHpMid.getPNG()
    );
    this.load.aseprite(
      Assets.ImagesSpritesKnight.getName(),
      Assets.ImagesSpritesKnight.getPNG(),
      Assets.ImagesSpritesKnight.getJSON()
    );
    this.load.image(
      Assets.ImagesTilesTiles.getName(),
      Assets.ImagesTilesTiles.getPNG()
    );
    this.load.image(
      Assets.ImagesTilesBgCastle.getName(),
      Assets.ImagesTilesBgCastle.getPNG()
    );
    this.load.tilemapTiledJSON(
      Assets.ImagesTilesMap.getName(),
      Assets.ImagesTilesMap.getJSON()
    );
  }

  public create(): void {
    this.origin = { x: 16 * 24, y: 180 };

    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    ["tiles"].forEach((tileset) => {
      map.addTilesetImage(tileset, tileset);
    });

    this.add
      .image(0, 16, "bg_castle")
      .setOrigin(0, 0)
      .setScrollFactor(0.3, 0.5)
      .setScale(2.5, 1.5)
      .setPipeline("Light2D");
    const walls = this.map
      .createLayer("tiles", "tiles", 0, 0)
      .setPipeline("Light2D")
      .setCollisionByProperty({
        collides: true,
      });

    this.sys.animatedTiles.init(map);
    this.player = new Knight(this, this.origin.x, this.origin.y, "knight");
    this.physics.add.collider(this.player.sprite, walls);
    this.lights.enable().setAmbientColor(0x555);
    this.cameras.main.setZoom(7);
    this.cameras.main.fadeIn(1500);
    this.cameras.main.zoomTo(4);
    this.cameras.main.startFollow(this.player.sprite);
  }
}
