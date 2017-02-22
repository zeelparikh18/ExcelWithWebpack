import Cell from './Cell';
import Header from './Header';

function Grid( m, n ) {
  this.nRows = m;
  this.nCols = n;
  this.cells = [];
  this.colHeaders = [];
  this.rowHeaders = [];
}

Grid.prototype.createGrid = function () {
  var that = this,
    tableNode = document.createElement( 'table' );
  that.el = tableNode;
  tableNode.id = 'grid';
  tableNode.border = 1;
  document.body.appendChild( tableNode );
  createHeaders.call( that );
  createTable.call( that );
  addEventListeners.call( that );
}

Grid.prototype.updateGrid = function ( action, type, positionFrom ) {
  var headers = type === 'row' ? this.rowHeaders : this.colHeaders,
    updatedHeaders, newHeader, updateFrom = positionFrom,
    totalHeaders = headers.length,
    row, i, j;

  if ( action === 'insert' ) {
    //add new header
    headers.splice( positionFrom + 1, 0, newHeader = new Header( positionFrom + 1, type ) );
    updateFrom = positionFrom + 2;

    //add row if type row
    if ( type === 'row' ) {
      this.nRows += 1;

      //inserting in DOM
      row = document.createElement( 'tr' );
      this.el.insertBefore( row, this.el.childNodes[ positionFrom + 2 ] );
      row.appendChild( newHeader.node );

      //updating JS object
      this.cells.splice( positionFrom, 0, [] );
      for ( j = 0; j < this.nCols; j++ ) {
        this.cells[ positionFrom ][ j ] = new Cell( positionFrom + 1, j );
      }

      for ( i = positionFrom; i < this.nRows; i++ ) {
        for ( j = 0; j < this.nCols; j++ ) {
          this.cells[ i ][ j ].updatePosition( i + 1, j );
        }
      }

    } else {
      //colums
      this.nCols += 1;
      var colHeaderNode = document.getElementById( 'colHeader' );
      colHeaderNode.insertBefore( newHeader.node, colHeaderNode.childNodes[ positionFrom + 2 ] )

      for ( i = 0; i < this.nRows; i++ ) {
        this.cells[ i ].splice( positionFrom, 0, new Cell( i, positionFrom ) );
      }

      for ( j = positionFrom + 1; j < this.nCols; j++ ) {
        for ( i = 0; i < this.nRows; i++ ) {
          this.cells[ i ][ j ].updatePosition( i, j + 1 );
        }
      }
    }

  } else {
    headers.splice( positionFrom, 1 );

    if ( type === 'row' ) {
      this.nRows -= 1;

      //removing from DOM
      this.el.removeChild( this.el.getElementsByTagName( 'tr' )[ positionFrom + 1 ] );

      //removing from js object
      this.cells.splice( positionFrom, 1 );

      //updating the positions of the remaining cells.
      for ( i = positionFrom; i < this.nRows; i++ ) {
        for ( j = 0; j < this.nCols; j++ ) {
          this.cells[ i ][ j ].updatePosition( i - 1, j );
        }
      }

    } else {
      //columns
      this.nCols -= 1;
      var colHeaderNode = document.getElementById( 'colHeader' ),
        rowNodes = this.el.getElementsByTagName( 'tr' ),
        rowNode;

      //removing header from DOM
      colHeaderNode.removeChild( colHeaderNode.childNodes[ positionFrom + 1 ] )

      //removing cells from DOM
      for ( i = 1; i <= this.nRows; i++ ) {
        rowNode = rowNodes[ i ];
        rowNode.removeChild( rowNode.childNodes[ positionFrom + 1 ] );
      }

      //removing from js object
      for ( i = 0; i < this.nRows; i++ ) {
        this.cells[ i ].splice( positionFrom, 1 );
      }

      for ( j = positionFrom; j < this.nCols; j++ ) {
        for ( i = 0; i < this.nRows; i++ ) {
          this.cells[ i ][ j ].updatePosition( i, j - 1 );
        }
      }
    }
  }

  //update old headers (works for both row and column)
  for ( i = updateFrom; i < headers.length; i++ ) {
    headers[ i ].updateHeaderNumber( i );
  }
};

// function to create the row and column headers
function createHeaders() {
  var tableNode = this.el,
    columnHeader = document.createElement( 'tr' ),
    extra = document.createElement( 'th' ),
    row, column, rowHeader, i, j;

  columnHeader.id = 'colHeader';
  tableNode.appendChild( columnHeader );
  columnHeader.appendChild( extra ); // first cell is the extra cell
  extra.innerHTML = '\\';

  // adding column headers
  for ( i = 0; i < this.nCols; i++ ) {
    column = new Header( i, 'col' );
    columnHeader.appendChild( column.node );
    this.colHeaders[ i ] = column;
  }

  // inserting rows and their headers
  for ( i = 0; i < this.nRows; i++ ) {
    row = document.createElement( 'tr' );
    tableNode.appendChild( row );
    rowHeader = new Header( i, 'row' );
    row.appendChild( rowHeader.node );
    this.rowHeaders[ i ] = rowHeader;
  }

}

function createTable() {
  var tableNode = this.el,
    tableRows = tableNode.getElementsByTagName( 'tr' ),
    cell, i, j, row;

  for ( i = 0; i < this.nRows; i++ ) {
    this.cells[ i ] = row = [];
    for ( j = 0; j < this.nCols; j++ ) {
      row[ j ] = new Cell( i, j );
    }
  }
}

function addEventListeners() {
  var that = this;
  this.el.addEventListener( 'updateGrid', function ( ev ) {
    ev.stopPropagation();
    ev.preventDefault();
    var detail = ev.detail;
    that.updateGrid( detail.action, detail.type, detail.positionFrom );
  }, false );
};

export default Grid;
