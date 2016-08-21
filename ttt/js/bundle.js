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
	
	var View = __webpack_require__(1);
	var Game = __webpack_require__(2);
	
	$(function () {
	  var root = $('.ttt');
	  var game = new Game();
	  var view = new View(game, root);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function () {
	  function View(game, $el) {
	    _classCallCheck(this, View);
	
	    this.game = game;
	    this.$el = $el;
	
	    this.setupBoard();
	    this.bindEvents();
	  }
	
	  _createClass(View, [{
	    key: "bindEvents",
	    value: function bindEvents() {
	      var _this = this;
	
	      // install a handler on the `li` elements inside the board.
	      this.$el.on("click", "li", function (event) {
	        var $square = $(event.currentTarget);
	        _this.makeMove($square);
	      });
	    }
	  }, {
	    key: "makeMove",
	    value: function makeMove($square) {
	      var pos = $square.data("pos");
	      var currentPlayer = this.game.currentPlayer;
	
	      try {
	        this.game.playMove(pos);
	      } catch (e) {
	        alert("Invalid move! Try again.");
	        return;
	      }
	
	      $square.addClass(currentPlayer);
	
	      if (this.game.isOver()) {
	        // cleanup click handlers.
	        this.$el.off("click");
	        this.$el.addClass("game-over");
	
	        var winner = this.game.winner();
	        var $figcaption = $("<figcaption>");
	
	        if (winner) {
	          this.$el.addClass("winner-" + winner);
	          $figcaption.html("You win, " + winner + "!");
	        } else {
	          $figcaption.html("It's a draw!");
	        }
	
	        this.$el.append($figcaption);
	      }
	    }
	  }, {
	    key: "setupBoard",
	    value: function setupBoard() {
	      var $ul = $("<ul>");
	      $ul.addClass("group");
	
	      for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
	        for (var colIdx = 0; colIdx < 3; colIdx++) {
	          var $li = $("<li>");
	          $li.data("pos", [rowIdx, colIdx]);
	
	          $ul.append($li);
	        }
	      }
	
	      this.$el.append($ul);
	    }
	  }]);
	
	  return View;
	}();
	
	module.exports = View;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = __webpack_require__(3);
	var MoveError = __webpack_require__(4);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.board = new Board();
	    this.currentPlayer = Board.marks[0];
	  }
	
	  _createClass(Game, [{
	    key: "isOver",
	    value: function isOver() {
	      return this.board.isOver();
	    }
	  }, {
	    key: "playMove",
	    value: function playMove(pos) {
	      this.board.placeMark(pos, this.currentPlayer);
	      this.swapTurn();
	    }
	  }, {
	    key: "promptMove",
	    value: function promptMove(reader, callback) {
	      var game = this;
	
	      this.board.print();
	      console.log("Current Turn: " + this.currentPlayer);
	
	      reader.question('Enter rowIdx: ', function (rowIdxStr) {
	        var rowIdx = parseInt(rowIdxStr);
	        reader.question('Enter colIdx: ', function (colIdxStr) {
	          var colIdx = parseInt(colIdxStr);
	          callback([rowIdx, colIdx]);
	        });
	      });
	    }
	  }, {
	    key: "run",
	    value: function run(reader, gameCompletionCallback) {
	      var _this = this;
	
	      this.promptMove(reader, function (move) {
	        try {
	          _this.playMove(move);
	        } catch (e) {
	          if (e instanceof MoveError) {
	            console.log(e.msg);
	          } else {
	            throw e;
	          }
	        }
	
	        if (_this.isOver()) {
	          _this.board.print();
	          if (_this.winner()) {
	            console.log(_this.winner() + " has won!");
	          } else {
	            console.log('NO ONE WINS!');
	          }
	          gameCompletionCallback();
	        } else {
	          // continue loop
	          _this.run(reader, gameCompletionCallback);
	        }
	      });
	    }
	  }, {
	    key: "swapTurn",
	    value: function swapTurn() {
	      if (this.currentPlayer === Board.marks[0]) {
	        this.currentPlayer = Board.marks[1];
	      } else {
	        this.currentPlayer = Board.marks[0];
	      }
	    }
	  }, {
	    key: "winner",
	    value: function winner() {
	      return this.board.winner();
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MoveError = __webpack_require__(4);
	
	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);
	
	    this.grid = Board.makeGrid();
	  }
	
	  _createClass(Board, [{
	    key: 'isEmptyPos',
	    value: function isEmptyPos(pos) {
	      if (!Board.isValidPos(pos)) {
	        throw new MoveError('Is not valid position!');
	      }
	
	      return this.grid[pos[0]][pos[1]] === null;
	    }
	  }, {
	    key: 'isOver',
	    value: function isOver() {
	      if (this.winner() != null) {
	        return true;
	      }
	
	      for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
	        for (var colIdx = 0; colIdx < 3; colIdx++) {
	          if (this.isEmptyPos([rowIdx, colIdx])) {
	            return false;
	          }
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: 'placeMark',
	    value: function placeMark(pos, mark) {
	      if (!this.isEmptyPos(pos)) {
	        throw new MoveError('Is not an empty position!');
	      }
	
	      this.grid[pos[0]][pos[1]] = mark;
	    }
	  }, {
	    key: 'print',
	    value: function print() {
	      var strs = [];
	      for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
	        var marks = [];
	        for (var colIdx = 0; colIdx < 3; colIdx++) {
	          marks.push(this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " ");
	        }
	        strs.push(marks.join('|') + '\n');
	      }
	
	      console.log(strs.join('-----\n'));
	    }
	  }, {
	    key: 'winner',
	    value: function winner() {
	      var posSeqs = [
	      // horizontals
	      [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
	      // verticals
	      [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
	      // diagonals
	      [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]];
	
	      for (var i = 0; i < posSeqs.length; i++) {
	        var winner = this.winnerHelper(posSeqs[i]);
	        if (winner != null) {
	          return winner;
	        }
	      }
	
	      return null;
	    }
	  }, {
	    key: 'winnerHelper',
	    value: function winnerHelper(posSeq) {
	      for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
	        var targetMark = Board.marks[markIdx];
	        var winner = true;
	        for (var posIdx = 0; posIdx < 3; posIdx++) {
	          var pos = posSeq[posIdx];
	          var mark = this.grid[pos[0]][pos[1]];
	
	          if (mark != targetMark) {
	            winner = false;
	          }
	        }
	
	        if (winner) {
	          return targetMark;
	        }
	      }
	
	      return null;
	    }
	  }], [{
	    key: 'isValidPos',
	    value: function isValidPos(pos) {
	      return 0 <= pos[0] && pos[0] < 3 && 0 <= pos[1] && pos[1] < 3;
	    }
	  }, {
	    key: 'makeGrid',
	    value: function makeGrid() {
	      var grid = [];
	
	      for (var i = 0; i < 3; i++) {
	        grid.push([]);
	        for (var j = 0; j < 3; j++) {
	          grid[i].push(null);
	        }
	      }
	
	      return grid;
	    }
	  }]);
	
	  return Board;
	}();
	
	Board.marks = ['x', 'o'];
	
	module.exports = Board;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var MoveError = function MoveError(msg) {
	  this.msg = msg;
	};
	
	// MoveError really should be a child class of the built in Error object provided
	// by Javascript, but since we haven't covered inheritance yet, we'll just
	// let it be a vanilla Object for now!
	
	module.exports = MoveError;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map