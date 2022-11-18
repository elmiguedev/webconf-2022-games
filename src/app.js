const GameServer = require("./core/game.server");

// 1. create game server
const gameServer = new GameServer();

// 2. define hashtags to stream
gameServer.createTweetListener({
  key: "webconf",
  filter: ["#javascript", "#python"],
  callback: (t) => {
    console.log("JS!, " + t.id);
  }
});
gameServer.createTweetListener({
  key: "py2",
  filter: ["#python"],
  callback: (t) => {
    console.log("PY!, " + t.id);
  }
});


gameServer.start();