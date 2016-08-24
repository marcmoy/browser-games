/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SnakeView = __webpack_require__(1);
	
	$(function () {
	  var rootEl = $('.root');
	  new SnakeView(rootEl);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = __webpack_require__(2);
	
	var View = function () {
	  function View($el) {
	    _classCallCheck(this, View);
	
	    this.$el = $el;
	    this.setupGame();
	  }
	
	  _createClass(View, [{
	    key: "handleKeyEvent",
	    value: function handleKeyEvent(event) {
	      if (View.KEYS[event.keyCode]) {
	        this.board.snake.turn(View.KEYS[event.keyCode]);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.updateClasses(this.board.snake.segments, "snake");
	      this.updateClasses([this.board.apple.position], "apple");
	    }
	  }, {
	    key: "updateClasses",
	    value: function updateClasses(coords, className) {
	      var _this = this;
	
	      this.$li.filter("." + className).removeClass();
	
	      coords.forEach(function (coord) {
	        var flatCoord = coord.i * _this.board.dim + coord.j;
	        _this.$li.eq(flatCoord).addClass(className);
	      });
	    }
	  }, {
	    key: "setupGame",
	    value: function setupGame() {
	      this.$el.empty();
	      this.board = new Board(20);
	      var html = "";
	      for (var i = 0; i < this.board.dim; i++) {
	        html += "<ul>";
	        for (var j = 0; j < this.board.dim; j++) {
	          html += "<li></li>";
	        }
	        html += "</ul>";
	      }
	
	      this.$el.html(html);
	      this.$li = this.$el.find("li");
	
	      this.intervalId = window.setInterval(this.step.bind(this), View.STEP_MILLIS);
	
	      $(window).on("keydown", this.handleKeyEvent.bind(this));
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      if (this.board.snake.segments.length > 0) {
	        this.board.snake.move();
	        this.render();
	      } else {
	        alert("You lose!");
	        window.clearInterval(this.intervalId);
	        this.restartGame();
	      }
	    }
	  }, {
	    key: "restartGame",
	    value: function restartGame() {
	      var _this2 = this;
	
	      var $button = $('<button>');
	      $button.text('Play again?');
	      $button.on('click', function () {
	        _this2.setupGame();
	      });
	      this.$el.append($button);
	    }
	  }]);
	
	  return View;
	}();
	
	View.KEYS = {
	  38: "N",
	  39: "E",
	  40: "S",
	  37: "W"
	};
	
	View.STEP_MILLIS = 100;
	
	module.exports = View;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Snake = __webpack_require__(3);
	var Apple = __webpack_require__(5);
	
	var Board = function () {
	  function Board(dim) {
	    _classCallCheck(this, Board);
	
	    this.dim = dim;
	
	    this.snake = new Snake(this);
	    this.apple = new Apple(this);
	  }
	
	  _createClass(Board, [{
	    key: 'render',
	    value: function render() {
	      var grid = Board.blankGrid(this.dim);
	
	      this.snake.segments.forEach(function (segment) {
	        grid[segment.i][segment.j] = Snake.SYMBOL;
	      });
	
	      grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;
	
	      var rowStrs = [];
	      grid.map(function (row) {
	        return row.join("");
	      }).join("\n");
	    }
	  }, {
	    key: 'validPosition',
	    value: function validPosition(coord) {
	      return coord.i >= 0 && coord.i < this.dim && coord.j >= 0 && coord.j < this.dim;
	    }
	  }], [{
	    key: 'blankGrid',
	    value: function blankGrid(dim) {
	      var grid = [];
	
	      for (var i = 0; i < dim; i++) {
	        var row = [];
	        for (var j = 0; j < dim; j++) {
	          row.push(Board.BLANK_SYMBOL);
	        }
	        grid.push(row);
	      }
	
	      return grid;
	    }
	  }]);
	
	  return Board;
	}();
	
	Board.BLANK_SYMBOL = ".";
	
	module.exports = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Coord = __webpack_require__(4);
	
	var Snake = function () {
	  function Snake(board) {
	    _classCallCheck(this, Snake);
	
	    this.dir = "N";
	    this.turning = false;
	    this.board = board;
	
	    var center = new Coord(Math.floor(board.dim / 2), Math.floor(board.dim / 2));
	    this.segments = [center];
	
	    this.growTurns = 0;
	  }
	
	  _createClass(Snake, [{
	    key: "eatApple",
	    value: function eatApple() {
	      if (this.head().equals(this.board.apple.position)) {
	        this.growTurns += 3;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "isOccupying",
	    value: function isOccupying(array) {
	      var result = false;
	      this.segments.forEach(function (segment) {
	        if (segment.i === array[0] && segment.j === array[1]) {
	          result = true;
	          return result;
	        }
	      });
	      return result;
	    }
	  }, {
	    key: "head",
	    value: function head() {
	      return this.segments.slice(-1)[0];
	    }
	  }, {
	    key: "isValid",
	    value: function isValid() {
	      var head = this.head();
	
	      if (!this.board.validPosition(this.head())) {
	        return false;
	      }
	
	      for (var i = 0; i < this.segments.length - 1; i++) {
	        if (this.segments[i].equals(head)) {
	          return false;
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
	      this.turning = false;
	
	      if (this.eatApple()) {
	        this.board.apple.replace();
	      }
	
	      if (this.growTurns > 0) {
	        this.growTurns -= 1;
	      } else {
	        this.segments.shift();
	      }
	
	      if (!this.isValid()) {
	        this.segments = [];
	      }
	    }
	  }, {
	    key: "turn",
	    value: function turn(dir) {
	      if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) || this.turning) {
	        return;
	      } else {
	        this.turning = true;
	        this.dir = dir;
	      }
	    }
	  }]);
	
	  return Snake;
	}();
	
	Snake.DIFFS = {
	  "N": new Coord(-1, 0),
	  "E": new Coord(0, 1),
	  "S": new Coord(1, 0),
	  "W": new Coord(0, -1)
	};
	
	Snake.SYMBOL = "S";
	Snake.GROW_TURNS = 1;
	
	module.exports = Snake;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Coord = function () {
	  function Coord(i, j) {
	    _classCallCheck(this, Coord);
	
	    this.i = i;
	    this.j = j;
	  }
	
	  _createClass(Coord, [{
	    key: "equals",
	    value: function equals(coord2) {
	      return this.i == coord2.i && this.j == coord2.j;
	    }
	  }, {
	    key: "isOpposite",
	    value: function isOpposite(coord2) {
	      return this.i == -1 * coord2.i && this.j == -1 * coord2.j;
	    }
	  }, {
	    key: "plus",
	    value: function plus(coord2) {
	      return new Coord(this.i + coord2.i, this.j + coord2.j);
	    }
	  }]);
	
	  return Coord;
	}();
	
	module.exports = Coord;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Coord = __webpack_require__(4);
	
	var Apple = function () {
	  function Apple(board) {
	    _classCallCheck(this, Apple);
	
	    this.board = board;
	    this.replace();
	  }
	
	  _createClass(Apple, [{
	    key: "replace",
	    value: function replace() {
	      var x = Math.floor(Math.random() * this.board.dim);
	      var y = Math.floor(Math.random() * this.board.dim);
	
	      while (this.board.snake.isOccupying([x, y])) {
	        x = Math.floor(Math.random() * this.board.dim);
	        y = Math.floor(Math.random() * this.board.dim);
	      }
	
	      this.position = new Coord(x, y);
	    }
	  }]);
	
	  return Apple;
	}();
	
	module.exports = Apple;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map