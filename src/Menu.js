// singleton Menu component, created once and just needs information of the target header for which it needs to be opened

import utils from './utils/utils';
import menuHTML from './html/menu.html';

var Menu = (function () {

  /**
   * inserts the html in the DOM
   * @returns {Element}
   */
  function createMenu() {
    //inserting in the DOM
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    return document.getElementById('menu');
  }

  function addClickListener() {
    var that = this;
    that.menuNode.addEventListener('click', function (ev) {
      var action = ev.target.dataset.action,
        tableNode = document.getElementById('grid');
      tableNode.dispatchEvent(new CustomEvent('updateGrid',
        {
          detail: {
            action: action,
            type: that.hType,
            positionFrom: that.hNum
          }
        }));
      that.menuNode.style.display = 'none';
    });
  }

  /**
   * absolutely position the menu in context of the target
   * @param target
   */
  function setMenuPosition(target) {
    var position = utils.getPosition(target),
      menuNode = this.menuNode;
    menuNode.style.display = 'block';
    menuNode.style.left = position.x + "px";
    menuNode.style.top = position.y + "px";
  }

  /**
   * sets the header type(row or column) and the header number from which the menu was opened.
   * @param options
   */
  function setMenuContext(options) {
    this.hType = options.hType;
    this.hNum = options.hNum;
    setMenuPosition.call(this, options.target);
  }

  return {
    openMenu: function (options) {
      var that = this,
        _options = options || {};
      if (!this.menuNode) {
        this.menuNode = createMenu();
        addClickListener.call(that);
      }
      setMenuContext.call(that, _options);
    },

  };

})();

export default Menu;
