const Util = require('./util.js');

function Snake (dir, segments) {
  this.dir = dir;
  this.segments = segments;
  this.maxLength = 1;
}

Snake.prototype.move = function() {
  let headPos = this.segments[0];
  let newPos = Util.plus(headPos, this.dir);
  this.segments.unshift(newPos);
  if (!(this.segments.length <= this.maxLength)) {
    this.segments.pop();
  }
};

Snake.prototype.head = function () {
  return this.segments[0];
};

Snake.prototype.turn = function(newDir) {
  if (!Util.isOpposite(newDir, this.dir)) {
    this.dir = newDir;
  }
};

Snake.prototype.grow = function(){
  this.maxLength += 1;
};

module.exports = Snake;
