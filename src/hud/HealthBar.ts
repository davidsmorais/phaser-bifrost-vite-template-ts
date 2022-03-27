import Phaser from "phaser";

import * as Assets from "@/assets";
import Dimensions from "Utils/Dimensions";

class HealthBar extends Phaser.GameObjects.Graphics {
  bar: Phaser.GameObjects.Graphics;
  text: Phaser.GameObjects.Text;
  player: any;
  middle: any;
  rightCap: any;
  leftCap: any;
  leftShadowCap: any;
  rightShadowCap: any;
  middleShadowCap: any;
  value: number;
  max: number;
  p: number;
  fullWidth: number;

  constructor(scene) {
    super(scene);
    const { HUD } = Dimensions;
    const { left, top } = HUD;

    this.x = left;
    this.y = top - 8;
    this.value = 100;
    this.fullWidth = GAME_WIDTH * 0.125;
    // background shadow
    this.draw(this.fullWidth);
  }

  updateText(hp: string, max: string): void {
    this.text.setText(`${hp}/${max}`);
  }

  draw(fullWidth): void {
    this.leftShadowCap = this.scene.add
      .image(this.x, this.y, Assets.ImagesHudHpLeft.getName())
      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.middleShadowCap = this.scene.add
      .image(
        this.leftShadowCap.x + this.leftShadowCap.width,
        this.y,
        Assets.ImagesHudHpMid.getName()
      )

      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.middleShadowCap.displayWidth = fullWidth;

    this.rightShadowCap = this.scene.add
      .image(
        this.middleShadowCap.x + this.middleShadowCap.displayWidth,
        this.y,
        Assets.ImagesHudHpRight.getName()
      )

      .setOrigin(0, 0.5)
      .setScrollFactor(0);
    this.leftCap = this.scene.add
      .image(this.x, this.y, Assets.ImagesHudHpFullLeft.getName())
      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.leftCap.fixedToCamera = true;
    this.middle = this.scene.add
      .image(
        this.leftCap.x + this.leftCap.width,
        this.y,
        Assets.ImagesHudHpFullMid.getName()
      )
      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.rightCap = this.scene.add
      .image(
        this.middle.x + this.middle.displayWidth,
        this.y,
        Assets.ImagesHudHpFullRight.getName()
      )
      .setOrigin(0, 0.5)
      .setScrollFactor(0);
    this.text = this.scene.add
      .text(this.x + 8, this.y - 4, "", {
        fontFamily: "OldWizard",
      })
      .setScale(0.25)
      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.setMeterPercentage(1);
  }

  setMeterPercentage(percent = 1): void {
    const width = this.fullWidth * percent;

    this.scene.tweens.add({
      targets: this.middle,

      displayWidth: width,

      ease: Phaser.Math.Easing.Sine.Out,

      onUpdate: () => {
        this.rightCap.x = this.middle.x + this.middle.displayWidth;
        this.leftCap.visible = this.middle.displayWidth > 0;

        this.middle.visible = this.middle.displayWidth > 0;

        this.rightCap.visible = this.middle.displayWidth > 0;
      },
    });
  }

  decrease(amount: number): void {
    if (this.value > 0) {
      this.value -= Number(amount.toFixed());

      if (this.value < 0) {
        this.value = 0;
      }
      this.setMeterPercentage(this.value / 100);
    }
  }

  increase(amount: number): void {
    this.value += Number(amount.toFixed());

    if (this.value > 0) {
      if (this.value < 0) {
        this.value = 0;
      }
      this.setMeterPercentage(this.value / 100);
    }
  }

  increaseBar(percentage: number): void {
    if (this.value > 0) {
      this.setMeterPercentage(percentage / 100);
      this.value = percentage;
    }
  }
}

export default HealthBar;
