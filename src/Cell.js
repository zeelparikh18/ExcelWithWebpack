function Cell( i, j ) {
  this.rowNumber = i;
  this.colNumber = j;
  this.setNode();
}

Cell.prototype.setNode = function () {
  var rowNode = document.getElementsByTagName( 'tr' )[ this.rowNumber + 1 ],
    cellNode = document.createElement( 'td' ),
    inputNode = document.createElement( 'input' ),
    rowChildNodes = rowNode.childNodes;

  if ( this.colNumber < rowChildNodes.length ) {
    rowNode.insertBefore( cellNode, rowChildNodes[ this.colNumber + 2 ] );
  } else {
    rowNode.appendChild( cellNode );
  }
  cellNode.appendChild( inputNode );
  inputNode.value = (this.rowNumber + 1) + ',' + (this.colNumber + 1);
  this.node = cellNode;
};

//update cell position when when rows/columns are inserted/deleted
Cell.prototype.updatePosition = function ( rowNumber, colNumber ) {
  this.rowNumber = rowNumber;
  this.colNumber = colNumber;
};

export default Cell;
