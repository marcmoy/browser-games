class View {
  constructor(game, $el) {
    this.game;
    this.$el = $el;
    this.setupBoard();
  }

  bindEvents() {

  }

  makeMove($square) {

  }

  setupBoard() {
    let $ul = $('<ul>');
    let $li = $('<li>');
    $ul.append($li);
    this.$el.append($ul);
  }
}

module.exports = View;
