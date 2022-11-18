const GameServer = require("./core/game.server");

// 1. create game server
const gameServer = new GameServer();

// 2. define hashtags to stream
gameServer.createTweetListener({
  key: "webconf",
  filter: ["#webconf", "#webconflatam", "@webconflatam"],
  callback: (t) => {
    console.log("webconf!, " + t.id);
  }
});


gameServer.start();