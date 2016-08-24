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

    let char;
    let className = 'tile';
    const { tile } = this.props;

    if (tile.explored) {
      if (tile.bombed) {
        char = '💣';
        className += ' bomb';
      } else {
        char = tile.adjacentBombCount().toString();
        if (char === '0') char = '';
        className += ` number${char}`;
      }
    } else {
      if (tile.flagged) {
        char = '🚩';
        className += ' flag';
      } else {
        char = ' ';
        className += ' closed';
      }
    }

    return(
      <div
      className={className}
      onClick={this.handleClick}>
        {char}
      </div>);
  }
}

export default Tile;
