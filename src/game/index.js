import Phaser from "phaser";
import BootloaderScene from "./scenes/bootloader.scene"
import FinishScene from "./scenes/finish.scene";
import MainScene from "./scenes/main.scene"

export default class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      parent: "divGame",
      width: 1280,
      height: 720,
      scene: [
        BootloaderScene,
        MainScene,
        FinishScene
      ]
    });
  }
}

const game = new Game();