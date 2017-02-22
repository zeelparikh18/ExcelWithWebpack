import Menu from './Menu';

function setEventListener(){
  var that = this;
  that.node.addEventListener('contextmenu', function(ev){
    ev.preventDefault();
    Menu.openMenu({
      target:ev.currentTarget,
      hType: that.headerType,
      hNum: that.headerNumber
    });
    return false;
  });
};

function Header(number,type){
    var that = this;
    that.headerType = type;
    that.headerNumber = number;
    that.setNode();
    setEventListener.call(that);
}

Header.prototype.setNode = function(){
  var headerNode = document.createElement('th');
  headerNode.innerHTML = this.headerNumber + 1;
  this.node = headerNode;
};

Header.prototype.getNode = function() {
  return this.node;
};

Header.prototype.updateHeaderNumber = function(headerNumber){
  this.headerNumber = headerNumber;
  this.node.innerHTML = headerNumber + 1;
};

export default Header;
