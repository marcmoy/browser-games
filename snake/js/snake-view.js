const Snake = require('./snake.js');
const Util = require('./util.js');
const Board = require('./board.js');
const Key = require('../keymaster.js');

function SnakeView($el) {
  this.board = new Board();
  this.$el = $el;
  this.setupInterface();
  this.setupBoard();
  // this.bindEvents();
  this.interval = setInterval(() => {
    this.step();
  }, 100);
}

SnakeView.prototype.step = function() {
  if (this.board.gameOver()) {
    alert("Game Over!");
    this.addPlayAgain();
    clearInterval(this.interval);
  }
  this.board.snake.move();
  this.board.hitApple();
  this.render();
};

SnakeView.prototype.render = function() {
  this.renderSnake();
  this.renderApple();
  this.updateScore();
};

SnakeView.prototype.renderSnake = function() {
  let snake = this.board.snake;
  let snakePos = snake.segments;
  $('.square').each((idx, sq) => {
    const $sq = $(sq);
    let sqPos = $sq.attr("data-pos").split(",");
    sqPos = sqPos.map((el) => parseInt(el));

    if (Util.arrayIncludes(snakePos, sqPos)) {
      $sq.addClass('snake');
    } else {
      $sq.removeClass('snake');
    }
  });
};

SnakeView.prototype.renderApple = function () {
  let apple = this.board.apple;
  $('.square').each((idx, sq) => {
    const $sq = $(sq);
    let sqPos = $sq.attr("data-pos").split(",");
    sqPos = sqPos.map((el) => parseInt(el));

    if (Util.equals(apple, sqPos)) {
      $sq.addClass('apple');
    } else {
      $sq.removeClass('apple');
    }
  });
};

SnakeView.prototype.setupInterface = function () {
  const $scoreboard = $('<section>').addClass('scoreboard');
  $scoreboard.text(`SCORE: ${this.board.snake.maxLength - 1}`);
  this.$el.append($scoreboard);
};


SnakeView.prototype.setupBoard = function() {
  const $board = $('<section>').addClass('board');
  this.$el.append($board);
  for (let i = 0; i < 20; i++) {
    const $row = $("<ul>").addClass('row').addClass('group');
    for (let j = 0; j < 20; j++) {
      const $sq = $("<li>").addClass('square').attr('data-pos',[i,j]);
      $row.append($sq);
    }
    $board.append($row);
  }

  this.bindKeyHandlers();
};

SnakeView.prototype.bindKeyHandlers = function() {
  Key.key("up", () => this.board.snake.turn("N"));
  Key.key("down", () => this.board.snake.turn("S"));
  Key.key("left", () => this.board.snake.turn("W"));
  Key.key("right", () => this.board.snake.turn("E"));
};

SnakeView.prototype.updateScore = function() {
  $('.scoreboard').text(`SCORE: ${this.board.snake.maxLength - 1}`);
};

SnakeView.prototype.resetBoard = function() {
  this.board = new Board();
  $('.board').remove();
  this.setupBoard();
  this.interval = setInterval(() => {
    this.step();
  }, 100);
};

SnakeView.prototype.addPlayAgain = function() {
  const $button = $('<div>').addClass('playagain');
  $button.text('Play again?'.trim());
  $button.on('click', event => {
    $button.remove();
    this.resetBoard();
  });
  $('.board').append($button);
};

module.exports = SnakeView;
