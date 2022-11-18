import Phaser from "phaser";
import ServerManager from "../core/server.manager";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene"
    });
  }

  // creation methods
  // ----------------------------

  /**
   * creates io listener for tweets, through ServerManager instance
   */
  createTwitterListener() {
    this.serverManager = new ServerManager();
    this.serverManager.onTweet((data) => {
      console.log(data);
      this.checkTweetContent(data);
    });
  }

  checkTweetContent(data) {
    const hashtags = data.tweet.hashtags;
    if (hashtags.includes("csharp")) this.checkTweet("csharp", data.tweet);
    if (hashtags.includes("python")) this.checkTweet("python", data.tweet);
    if (hashtags.includes("nodejs")) this.checkTweet("nodejs", data.tweet);
    if (hashtags.includes("java")) this.checkTweet("java", data.tweet);
  }

  createStarters() {
    this.csharp = this.add.image(150, 150, "csharp").setScale(0.2);
    this.python = this.add.image(150, 300, "python").setScale(0.2);
    this.nodejs = this.add.image(150, 450, "nodejs").setScale(0.2);
    this.java = this.add.image(150, 600, "java").setScale(0.2);
  }

  createFinish() {
    this.finish_up = this.add.image(950, 100, "finish").setScale(0.3);
    this.finish_down = this.add.image(950, 600, "finish").setScale(0.3);
  }

  createBackground() {
    this.add.image(0, 0, "background").setOrigin(0);
  }

  createKeys() {
    this.keys = this.input.keyboard.createCursorKeys();
  }

  createUsers() {
    this.users = {};
  }

  // check methods
  // --------------------------

  checkKeys() {
    if (this.keys.right.isDown) {
      this.vue.x += 50;
    }
  }

  checkTweet(key, tweet) {
    switch (key) {
      case "csharp": this.csharp.x += 50; break;
      case "python": this.python.x += 50; break;
      case "nodejs": this.nodejs.x += 50; break;
      case "java": this.java.x += 50; break;
      default:
        break;
    }
    this.addUser(tweet);
  }

  addUser(tweet) {
    const key = tweet.username;
    const name = tweet.displayName;
    this.users[key] = {
      key,
      name
    }
  }



  checkFinish() {
    if (this.nodejs.x >= 950 || this.python.x >= 950 || this.csharp >= 950 || this.java >= 950) {
      this.scene.start("FinishScene", this.users);
    }
  }

  // main loop methods
  // ----------------------------

  init() {
    this.createUsers();
    this.createKeys();
    this.createBackground();
    this.createTwitterListener();
    this.createStarters();
    this.createFinish();
  }

  update() {
    this.checkKeys();
    this.checkFinish();
  }
}