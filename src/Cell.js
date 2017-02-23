function Cell(i, j, value) {
  this.rowNumber = i;
  this.colNumber = j;
  this.value = value;
  this.setNode();
}

Cell.prototype.setNode = function () {
  var rowNode = document.getElementsByTagName('tr')[this.rowNumber + 1],
    cellNode = document.createElement('td'),
    inputNode = document.createElement('input'),
    rowChildNodes = rowNode.childNodes;

  if (this.colNumber < rowChildNodes.length) {
    rowNode.insertBefore(cellNode, rowChildNodes[this.colNumber + 2]);
  } else {
    rowNode.appendChild(cellNode);
  }
  cellNode.appendChild(inputNode);
  inputNode.value = this.value;
  this.node = cellNode;
  addEventListeners.call(this);
};

Cell.prototype.getValue = function () {
  return this.value;
};

//update cell position when when rows/columns are inserted/deleted
Cell.prototype.updatePosition = function (rowNumber, colNumber) {
  this.rowNumber = rowNumber;
  this.colNumber = colNumber;
};

function addEventListeners() {
  var that = this;
  this.node.getElementsByTagName('input')[0].onkeyup = function (ev) {
    ev.stopPropagation();
    var currentValue = ev.target.value;
    if (currentValue !== that.value) {
      that.value = currentValue;
    }
  };
}

export default Cell;
