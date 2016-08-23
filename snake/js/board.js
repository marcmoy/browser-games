const Snake = require('./snake.js');
const Util = require('./util.js');

function Board() {
  this.snake = new Snake("E", [[10, 9]]);
  this.apple = this.makeNewApple();
}

Board.prototype.hitSelf = function(){
  let headPos = this.snake.segments[0];
  let bodyPos = this.snake.segments.slice(1);
  return Util.arrayIncludes(bodyPos, headPos);
};

Board.prototype.outOfBounds = function() {
  let headPos = this.snake.segments[0];
  if (headPos[0] < 0 || headPos[0] >= 20) return true;
  if (headPos[1] < 0 || headPos[1] >= 20) return true;
  return false;
};

Board.prototype.gameOver = function () {
  return this.hitSelf() || this.outOfBounds();
};

Board.prototype.makeNewApple = function() {
  let x = Math.floor(Math.random() * 20);
  let y = Math.floor(Math.random() * 20);
  return [y, x];
};

Board.prototype.hitApple = function () {
  if (Util.equals(this.snake.head(), this.apple)) {
    this.snake.grow();
    this.apple = this.makeNewApple();
  }
};

module.exports = Board;
