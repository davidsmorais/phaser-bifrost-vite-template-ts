export default class TitleScene extends Phaser.Scene {
  public init(): void {
    this.startGame();
  }

  public preload(): void {
    donsole.warning("Preloading placeholder");
  }

  public create(): void {
    this.cameras.main.flash(400, 0, 0, 0);

    const spaceKey = this.input.keyboard.addKey("SPACE");

    spaceKey.on("down", () => {
      this.startGame();
    });
    this.input.on("pointerdown", () => {
      this.startGame();
    });
  }

  private startGame(): void {
    this.scene.start("GameScene");
  }
}
