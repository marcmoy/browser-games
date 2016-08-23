import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './react_board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { board: new Minesweeper.Board(10, 10) };
    this.updateGame = this.updateGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  }

  restartGame() {
    this.setState( {board: new Minesweeper.Board(10,10)});
  }

  render() {

    let box;
    let resetButton = <button onClick={this.restartGame}>Restart?</button>;

    if (this.state.board.won()) {
      box = <div className='box-modal'>
              <span>You won!</span>
              {resetButton}
            </div>;
    } else if (this.state.board.lost()) {
      box = <div className='box-modal'>
              <span>You won!</span>
              {resetButton}
            </div>;
    }

    return(
      <div className="board">
        <Board board={this.state.board} updateGame={this.updateGame} />
        {box}
      </div>
    );
  }
}

export default Game;
