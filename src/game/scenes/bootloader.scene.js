import Phaser from "phaser";
import vue from "../assets/vue.png";
import react from "../assets/react.png";
import angular from "../assets/angular.png";
import javascript from "../assets/javascript.png";
import java from "../assets/java.png";
import csharp from "../assets/csharp.png";
import python from "../assets/python.png";
import nodejs from "../assets/nodejs.png";
import finish from "../assets/finish.png";
import background from "../assets/background.png";

export default class BootloaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootloaderScene"
    });
  }

  preload() {

    this.load.image("vue", vue);
    this.load.image("angular", angular);
    this.load.image("react", react);
    this.load.image("javascript", javascript);
    this.load.image("nodejs", nodejs);
    this.load.image("csharp", csharp);
    this.load.image("python", python);
    this.load.image("java", java);
    this.load.image("finish", finish);
    this.load.image("background", background);

    this.load.on("complete", () => {
      this.scene.start("MainScene");
    });

  }
}