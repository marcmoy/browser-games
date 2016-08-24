import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './react_board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { board: new Minesweeper.Board(10,10) };
    this.updateGame = this.updateGame.bind(this);
    this.createResetMessage = this.createResetMessage.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({ board: this.state.board });
  }

  createResetMessage() {
    let button = <button onClick={this.resetGame.bind(this)}>
                    Play again?
                  </button>;
    let message;
    if (this.state.board.won()) message = 'You win!';
    if (this.state.board.lost()) message = 'You lost.';

    return (
      <div className='reset-message'>
        <h3>{message}</h3>
        {button}
      </div>
    );
  }

  resetGame() {
    this.state.board.revealTiles();
    this.setState({board: new Minesweeper.Board(10,10) });
  }

  render() {

    let resetMessage;

    if (this.state.board.over()) {
      resetMessage = this.createResetMessage();
    }

    return(
      <div className="board">
        <Board board={this.state.board} updateGame={this.updateGame} />
        {resetMessage}
      </div>
    );
  }
}

export default Game;
