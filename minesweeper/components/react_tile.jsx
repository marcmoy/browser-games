import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.updateGame(this.props.tile, e.altKey);
  }

  render() {

    let char, name;
    const { tile } = this.props;

    if (tile.explored) {
      if (tile.bombed) {
        char = '💣';
        name = "bomb";
      } else {
        char = tile.adjacentBombCount();
        name = "number";
      }
    } else {
      if (tile.flagged) {
        char = '🚩';
        name = "flag";
      } else {
        char = ' ';
        name = "closed";
      }
    }

    return(<div
      className={name}
      className="tile"
      onClick={this.handleClick}
      >{char}</div>);
  }
}

export default Tile;
