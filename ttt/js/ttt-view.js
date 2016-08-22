const Game = require('./game-logic/game.js');

class View {
  constructor($el) {
    this.game = new Game();
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", e => {
      const $square = $(e.currentTarget);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Invalid move! Try again.");
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}!`);
      } else {
        $figcaption.html("It's a draw!");
      }

      this.$el.append($figcaption);
      this.resetBoard();
    }
  }

  setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("group");

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let $li = $("<li>");
        $li.data("pos", [row, col]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }

  resetBoard() {
    const $button = $("<button>");
    $button.html("Play again?");
    $button.addClass("reset-button");
    this.$el.append($button);

    this.$el.on("click", "button", e => {
      e.preventDefault();
      this.$el.empty();

      let winner = this.game.winner();
      this.$el.removeClass(`game-over winner-${winner}`);

      this.game = new Game();
      this.setupBoard();
      this.bindEvents();
    });
  }
}

module.exports = View;
