const { Game } = require("./Game");
const { Steps } = require("./Steps");
const { Questions } = require("./Questions");
const { IsCorrectAnswer } = require("./IsCorrectAnswer");
const { common } = require("./common");

const game = new Game(Steps, Questions, IsCorrectAnswer, common);

(function main() {
  game.start();
})();
