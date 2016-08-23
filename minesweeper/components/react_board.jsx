import React from 'react';
import Tile from './react_tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let board = this.props.board.grid.map((row, i) => {

      let tiles = row.map((col,j) => {
        return (<Tile
          key={[i,j]}
          tile={this.props.board.grid[i][j]}
          updateGame={this.props.updateGame}/>
        );
      });

      return(
        <div key={i} className="row" className="group">
        {tiles}
        </div>
      );

    });

    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
