/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	console.log('hey');

	var grid = new Grid(5, 6);
	grid.createGrid();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Cell = __webpack_require__(2);

	var _Cell2 = _interopRequireDefault(_Cell);

	var _Header = __webpack_require__(3);

	var _Header2 = _interopRequireDefault(_Header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Grid(m, n) {
	  this.nRows = m;
	  this.nCols = n;
	  this.cells = [];
	  this.colHeaders = [];
	  this.rowHeaders = [];
	}

	Grid.prototype.createGrid = function () {
	  var tableNode = document.createElement('table');
	  tableNode.id = 'grid';
	  tableNode.border = 1;
	  document.body.appendChild(tableNode);
	  createHeaders.call(this);
	  createTable.call(this);
	};

	// function to create the row and column headers
	function createHeaders() {
	  var tableNode = document.getElementById('grid'),
	      columnHeader = document.createElement('tr'),
	      extra = document.createElement('th'),
	      row,
	      column,
	      rowHeader,
	      i,
	      j;

	  tableNode.appendChild(columnHeader);
	  columnHeader.appendChild(extra); // first cell is the extra cell
	  extra.innerHTML = '\\';

	  // adding column headers
	  for (i = 0; i < this.nCols; i++) {
	    column = new _Header2.default(i, 'col');
	    columnHeader.appendChild(column.node);
	    this.colHeaders[i] = column;
	  }

	  // inserting rows and their headers
	  for (i = 0; i < this.nRows; i++) {
	    row = document.createElement('tr');
	    tableNode.appendChild(row);
	    rowHeader = new _Header2.default(i, 'row');
	    row.appendChild(rowHeader.node);
	    this.rowHeaders[i] = rowHeader;
	  }
	}

	function createTable() {
	  var tableNode = document.getElementById('grid'),
	      tableRows = tableNode.getElementsByTagName('tr'),
	      cell,
	      i,
	      j,
	      row;

	  for (i = 0; i < this.nRows; i++) {
	    this.cells[i] = row = [];
	    for (j = 0; j < this.nCols; j++) {
	      row[j] = new _Cell2.default(i, j);
	    }
	  }
	}

	function setEventListeners() {
	  var tableHeaders = document.getElementsByTagName('th'),
	      i;
	  for (i = 0; i < tableHeaders.length; i++) {
	    var tableHeader = tableHeaders[i];
	    tableHeader.addEventListener('contextmenu', function (ev) {
	      ev.preventDefault();
	      openOptionsMenu(utils.getPosition(ev.currentTarget));
	      return false;
	    });
	  }
	}

	exports.default = Grid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Cell(i, j) {
	  this.rowNumber = i;
	  this.colNumber = j;
	  this.setNode();
	}

	Cell.prototype.getValue = function () {
	  return this.value;
	};

	Cell.prototype.setNode = function () {
	  var rowNode = document.getElementsByTagName('tr')[this.rowNumber + 1],
	      cellNode = document.createElement('td'),
	      inputNode = document.createElement('input');
	  rowNode.appendChild(cellNode);
	  cellNode.appendChild(inputNode);
	  inputNode.value = this.rowNumber + 1 + ',' + (this.colNumber + 1);
	  this.node = cellNode;
	};

	exports.default = Cell;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _menu = __webpack_require__(4);

	var _menu2 = _interopRequireDefault(_menu);

	var _utils = __webpack_require__(5);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Header(number, type) {
	  this.type = type;
	  this.number = number;
	  this.setNode();
	  this.setEventListener();
	}

	Header.prototype.setNode = function () {
	  var headerNode = document.createElement('th');
	  headerNode.innerHTML = this.number + 1;
	  this.node = headerNode;
	};

	Header.prototype.setEventListener = function () {
	  this.node.addEventListener('contextmenu', function (ev) {
	    ev.preventDefault();
	    openOptionsMenu(_utils2.default.getPosition(ev.currentTarget));
	    return false;
	  });
	};

	function openOptionsMenu(position) {
	  var menu = document.getElementById('menu') || createMenu();
	  menu.style.left = position.x;
	  menu.style.top = position.y;
	}

	function createMenu() {
	  var menu = document.createElement('div');
	  menu.id = "menu";
	  document.body.appendChild(menu);
	  menu.innerHTML = _menu2.default;
	  return menu;
	}

	exports.default = Header;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n<ul>\n  <li class=\"insert\">Insert Row</li>\n  <li class=\"delete\">Delete Row</li>\n<ul>\n";

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nodeToClone,
	    utils = {

	  cloneCellNode: function cloneCellNode() {
	    if (!nodeToClone) {
	      var inputNode = document.createElement('input');
	      nodeToClone = document.createElement('td');
	      nodeToClone.appendChild(inputNode);
	      return nodeToClone;
	    }

	    return nodeToClone.cloneNode(true); // deep clone to clone td as well as input
	  },

	  //helper function to get the absolute position of the place where mouse was clicked, to display the contextual menu.
	  getPosition: function getPosition(el) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while (el) {
	      if (el.tagName == "BODY") {
	        // deal with browser quirks with body/window/document and page scroll
	        var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
	        var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

	        xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
	        yPosition += el.offsetTop - yScrollPos + el.clientTop;
	      } else {
	        xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
	        yPosition += el.offsetTop - el.scrollTop + el.clientTop;
	      }

	      el = el.offsetParent;
	    }
	    return {
	      x: xPosition,
	      y: yPosition
	    };
	  }
	};
	exports.default = utils;

/***/ }
/******/ ]);