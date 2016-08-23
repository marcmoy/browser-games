const Util = {

  plus (currPos, newDir){
    let y = currPos[0];
    let x = currPos[1];

    if (newDir === 'N') y -= 1;
    if (newDir === 'S') y += 1;
    if (newDir === 'W') x -= 1;
    if (newDir === 'E') x += 1;

    return [y, x];
  },

  equals(arr1, arr2){
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
    return false;
  },

  isOpposite(newDir, currDir){
    if (currDir === 'N' && newDir ==='S') return true;
    if (currDir === 'S' && newDir ==='N') return true;
    if (currDir === 'W' && newDir ==='E') return true;
    if (currDir === 'E' && newDir ==='W') return true;
    return false;
  },

  arrayIncludes(nestedArr, arr) {
    for (let i = 0; i < nestedArr.length; i++) {
      if (this.equals(nestedArr[i], arr)) return true;
    }
    return false;
  }
};

module.exports = Util;
