const SnakeView = require('./snake-view.js');

$( () => {
  const rootEl = $('.snakegame');
  new SnakeView(rootEl);
});
