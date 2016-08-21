const View = require('./ttt-view');
const Game = require('./game-logic/game.js');

$( () => {
  const root = $('.ttt');
  let game = new Game();
  let view = new View(game, root);
});
