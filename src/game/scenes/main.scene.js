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
    if (hashtags.includes("machinelearning")) this.checkTweet("python", tweet);
    if (hashtags.includes("angular")) this.checkTweet("angular", tweet);
    if (hashtags.includes("react")) this.checkTweet("react", tweet);
  }

  createStarters() {
    this.vue = this.add.image(150, 150, "vue").setScale(0.3);
    this.angular = this.add.image(150, 350, "angular").setScale(0.3);
    this.react = this.add.image(150, 550, "react").setScale(0.3);
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
      case "python": this.vue.x += 50; break;
      case "js": this.angular.x += 50; break;
      case "react": this.react.x += 50; break;
      default:
        break;
    }
    this.addUser(tweet);
    console.log(this.users);
  }

  addUser(tweet) {
    const key = tweet.tweet.username;
    const name = tweet.tweet.displayName;
    this.users[key] = {
      key,
      name
    }
  }



  checkFinish() {
    if (this.vue.x >= 950 || this.react.x >= 950 || this.angular >= 950) {
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