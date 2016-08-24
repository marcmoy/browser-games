import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './react_board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { board: new Minesweeper.Board(10,10) };
    this.updateGame = this.updateGame.bind(this);
    this.board = this.state.board;
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({ board: this.board });
  }

  render() {

    return(
      <div className="board">
        <Board board={this.board} updateGame={this.updateGame} />
      </div>
    );
  }
}

export default Game;
