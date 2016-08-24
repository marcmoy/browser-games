import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './react_board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { board: new Minesweeper.Board(10,10) };
    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({ board: this.state.board });
  }

  createResetButton() {
    this.state.board.revealTiles();
    return <button onClick={this.resetGame.bind(this)}>Play again?</button>;
  }

  resetGame() {
    this.setState({board: new Minesweeper.Board(10,10) });
  }

  render() {

    let resetButton;
    if (this.state.board.over()) {
      resetButton = this.createResetButton();
    }

    return(
      <div className="board">
        <Board board={this.state.board} updateGame={this.updateGame} />
        {resetButton}
      </div>
    );
  }
}

export default Game;
