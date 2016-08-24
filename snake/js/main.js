const SnakeView = require('./snake-view');

$(() => {
  const rootEl = $('.root');
  new SnakeView(rootEl);
});
