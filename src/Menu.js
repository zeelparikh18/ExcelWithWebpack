// singleton Menu component, created once and just needs information of the target header for which it needs to be opened

import utils from './utils';
import menuHTML from './html/menu.html';

var Menu = (function () {

  function createMenu() {
    var menu = document.createElement( 'div' );
    menu.id = "menu";
    document.body.appendChild( menu );
    menu.innerHTML = menuHTML;
    return menu;
  }

  function addClickListeners( node ) {
    var that = this;
    this.menuNode.addEventListener( 'click', function ( ev ) {
      var action = ev.target.dataset.action;
      document.getElementById( 'grid' ).dispatchEvent( new CustomEvent( 'updateGrid',
        {
          detail: {
            action      : action,
            type        : that.hType,
            positionFrom: that.hNum
          }
        } ) );
      that.menuNode.style.display = 'none';
    } );
  }

  function setMenuPosition( target ) {
    var position = utils.getPosition( target ),
      menuNode = this.menuNode;
    menuNode.style.display = 'block';
    menuNode.style.left = position.x+"px";
    menuNode.style.top = position.y+"px";
  }

  function setMenuContext( options ) {
    this.hType = options.hType;
    this.hNum = options.hNum;
    setMenuPosition.call(this, options.target );
  }

  return {
    openMenu: function ( options ) {
      var options = options || {};
      if ( !this.menuNode ) {
        this.menuNode = createMenu.call( this );
        addClickListeners.call( this );
      }
      setMenuContext.call( this, options );
    },

  };

})();

export default Menu;
