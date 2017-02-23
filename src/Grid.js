import Cell from './Cell';
import Header from './Header';
import tableHtml from './html/table.html';

function Grid(m, n) {
  var that = this,
    tableValues = JSON.parse(window.localStorage.getItem('table')|| '[]'),
    nRows = tableValues.length,
    nCols = nRows && (tableValues[0] || []).length;
  that.nRows = nRows || m;
  that.nCols = nCols || n;
  that.cells = [];
  that.colHeaders = [];
  that.rowHeaders = [];
  that.saveInLocalStorage = saveInLocalStorage.bind(that);
}

Grid.prototype.createGrid = function () {
  var that = this;
  document.body.insertAdjacentHTML('afterbegin', tableHtml);
  that.el = document.getElementById('grid');
  createHeaders.call(that);
  createTable.call(that);
  addEventListeners.call(that);
  setUpAutoSave.call(that);
};

Grid.prototype.updateGrid = function (action, type, positionFrom) {
  var that = this,
    headers = type === 'row' ? that.rowHeaders : that.colHeaders,
    newHeader, updateFrom = positionFrom,
    row, i, j;

  if (action === 'insert') {
    //add new header
    headers.splice(positionFrom + 1, 0, newHeader = new Header(positionFrom + 1, type));
    updateFrom = positionFrom + 2;

    //add row if type row
    if (type === 'row') {
      that.nRows += 1;

      //inserting in DOM
      row = document.createElement('tr');
      that.el.insertBefore(row, that.el.children[positionFrom + 2]);
      row.appendChild(newHeader.node);

      //updating JS object
      that.cells.splice(positionFrom, 0, []);
      for (j = 0; j < that.nCols; j++) {
        that.cells[positionFrom][j] = new Cell(positionFrom + 1, j);
      }

      for (i = positionFrom; i < that.nRows; i++) {
        for (j = 0; j < that.nCols; j++) {
          that.cells[i][j].updatePosition(i + 1, j);
        }
      }

    } else {
      //columns
      that.nCols += 1;
      var colHeaderNode = document.getElementById('colHeader');
      colHeaderNode.insertBefore(newHeader.node, colHeaderNode.children[positionFrom + 2])

      for (i = 0; i < that.nRows; i++) {
        that.cells[i].splice(positionFrom, 0, new Cell(i, positionFrom));
      }

      for (j = positionFrom + 1; j < that.nCols; j++) {
        for (i = 0; i < that.nRows; i++) {
          that.cells[i][j].updatePosition(i, j + 1);
        }
      }
    }

  } else {
    headers.splice(positionFrom, 1);

    if (type === 'row') {
      that.nRows -= 1;

      //removing from DOM
      that.el.removeChild(that.el.getElementsByTagName('tr')[positionFrom + 1]);

      //removing from js object
      that.cells.splice(positionFrom, 1);

      //updating the positions of the remaining cells.
      for (i = positionFrom; i < this.nRows; i++) {
        for (j = 0; j < that.nCols; j++) {
          that.cells[i][j].updatePosition(i - 1, j);
        }
      }

    } else {
      //columns
      that.nCols -= 1;
      var colHeaderNode = document.getElementById('colHeader'),
        rowNodes = that.el.getElementsByTagName('tr'),
        rowNode;

      //removing header from DOM
      colHeaderNode.removeChild(colHeaderNode.children[positionFrom + 1])

      //removing cells from DOM
      for (i = 1; i <= that.nRows; i++) {
        rowNode = rowNodes[i];
        rowNode.removeChild(rowNode.children[positionFrom + 1]);
      }

      //removing from js object
      for (i = 0; i < that.nRows; i++) {
        that.cells[i].splice(positionFrom, 1);
      }

      for (j = positionFrom; j < that.nCols; j++) {
        for (i = 0; i < this.nRows; i++) {
          that.cells[i][j].updatePosition(i, j - 1);
        }
      }
    }
  }

  //update old headers (works for both row and column)
  for (i = updateFrom; i < headers.length; i++) {
    headers[i].updateHeaderNumber(i);
  }
};

// function to create the row and column headers
function createHeaders() {
  var that = this,
    tableNode = that.el,
    columnHeader = document.getElementById('colHeader'),
    row, column, rowHeader, i, j;

  // adding column headers
  for (i = 0; i < this.nCols; i++) {
    column = new Header(i, 'col');
    columnHeader.appendChild(column.getNode());
    that.colHeaders[i] = column;
  }

  // inserting rows and their headers
  for (i = 0; i < that.nRows; i++) {
    row = document.createElement('tr');
    tableNode.appendChild(row);
    rowHeader = new Header(i, 'row');
    row.appendChild(rowHeader.getNode());
    that.rowHeaders[i] = rowHeader;
  }

}

function createTable() {
  var i, j, row,
    tableValues = JSON.parse(window.localStorage.getItem('table'));
  for (i = 0; i < this.nRows; i++) {
    this.cells[i] = row = [];
    for (j = 0; j < this.nCols; j++) {
      row[j] = new Cell(i, j, tableValues[i][j]);
    }
  }
}

function addEventListeners() {
  var that = this;
  that.el.addEventListener('updateGrid', function (ev) {
    ev.stopPropagation();
    var detail = ev.detail;
    that.updateGrid(detail.action, detail.type, detail.positionFrom);
  }, false);
}

function saveInLocalStorage() {
  var that = this,
    i, j, tableValues = new Array(that.nRows);
  for (j = 0; j < that.nRows; j++) {
    tableValues[j] = new Array(that.nCols);
  }
  for (i = 0; i < that.nRows; i++) {
    for (j = 0; j < that.nCols; j++) {
      tableValues[i][j] = that.cells[i][j].getValue();
    }
  }
  window.localStorage.setItem('table', JSON.stringify(tableValues));
}

function setUpAutoSave() {
  setInterval(this.saveInLocalStorage, 3000);
}

export default Grid;
