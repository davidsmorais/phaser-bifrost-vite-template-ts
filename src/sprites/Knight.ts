import GameScene from "@/scenes/GameScene";
import { Direction } from "@/types/direction";

type PlayerStateKeys = keyof PlayerState;
export default class Knight extends Phaser.GameObjects.Sprite {
  spriteName: string;
  declare scene: GameScene;
  sprite: Phaser.Physics.Arcade.Sprite;
  light: Phaser.GameObjects.Light;
  keys: {
    arrowLeft: Phaser.Input.Keyboard.Key;
    arrowRight: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
  };
  direction: Direction;
  stats: PlayerStats;
  STATE: PlayerState;

  public updateState(key: PlayerStateKeys, value: boolean): void {
    if (key) {
      this.STATE = {
        ...this.STATE,
        [key]: value,
      };
    }
  }

  constructor(
    scene,
    x,
    y,
    spriteName: "knight",
    stats = {
      hp: 100,
      maxHp: 100,
      baseSpeed: 200,
    }
  ) {
    super(scene, x, y, spriteName);
    this.spriteName = spriteName;
    const INITIAL_STATE = {
      isJumping: false,
    };

    this.STATE = INITIAL_STATE;
    this.stats = JSON.parse(JSON.stringify(stats)); // deep clone stats object
    this.scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
    this.sprite = scene.physics.add.sprite(x, y, spriteName);

    scene.anims.createFromAseprite(spriteName);
    this.sprite.setPipeline("Light2D");
    this.light = scene.lights.addLight(x, y, 32 * 4).setIntensity(1);

    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.allowDrag = false;
    body.setSize(24, 30).setOffset(42, 44);

    this.sprite.play({
      key: "run",
      repeat: 0,
    });

    this.keys = {
      space: this.scene.input.keyboard.addKey("SPACE"),
      arrowLeft: this.scene.input.keyboard.addKey("LEFT"),
      arrowRight: this.scene.input.keyboard.addKey("RIGHT"),
    };
  }

  preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
  public update(time, delta): void {
    super.update(time, delta);
    this.light.x = this.sprite.x;
    this.light.y = this.sprite.y;

    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    if (this.stats.hp > 0 && body) {
      if (body?.velocity?.x > 0) {
        this.sprite.setFlipX(false);
        this.direction = Direction.RIGHT;
        body.setOffset(42, 44);
      } else if (body?.velocity?.x < 0) {
        this.sprite.setFlipX(true);
        this.direction = Direction.LEFT;
        body.setOffset(50, 44);
      }
      if (this.keys.space.isDown && body.onFloor()) {
        this.jump();
      }
      if (this.keys.arrowLeft.isDown) {
        this.sprite.setVelocityX(-this.stats.baseSpeed);
        this.sprite.play(body.onFloor() ? "run" : "land", true);
      }
      if (this.keys.arrowRight.isDown) {
        this.sprite.play(body.onFloor() ? "run" : "land", true);
        this.sprite.setVelocityX(this.stats.baseSpeed);
      }
    }
  }

  private jump(): void {
    this.sprite.setVelocityY(-300);
    this.sprite.play({
      key: "jump",
      startFrame: 2,
    });
  }
}
