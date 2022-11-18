import Phaser from "phaser";

export default class FinishScene extends Phaser.Scene {
  constructor() {
    super({
      key: "FinishScene"
    });
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.createKeys();
    this.createRandom();
  }

  update() {
    this.checkKeys();
  }

  createRandom() {
    this.finished = false;
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    this.userText = this.add.text(x, y, "", {
      fontSize: 72
    }).setOrigin(0.5);
    this.users = Object.values(this.data);

    this.userTimer = setInterval(() => {
      const index = Phaser.Math.Between(0, this.users.length - 1);
      const user = this.users[index];
      this.userText.setText(`${user.name}\n(${user.key})`);
    }, 50);
  }

  createKeys() {
    this.stop = this.input.keyboard.addKey("s");
    this.restart = this.input.keyboard.addKey("r");
  }

  checkKeys() {
    if (this.stop.isDown) {
      if (!this.finished) {
        this.finished = true;
        clearInterval(this.userTimer);
      }
    }
    if (this.restart.isDown) {
      if (this.finished) {
        this.finished = false;
        this.userTimer = setInterval(() => {
          const index = Phaser.Math.Between(0, this.users.length - 1);
          const user = this.users[index];
          this.userText.setText(`${user.name}\n(${user.key})`);
        }, 50);
      }
    }
  }

}