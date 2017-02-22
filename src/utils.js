var nodeToClone,

  utils = {

    cloneCellNode: function () {
      if (!nodeToClone) {
        var inputNode = document.createElement('input');
        nodeToClone = document.createElement('td');
        nodeToClone.appendChild(inputNode);
        return nodeToClone;
      }

      return nodeToClone.cloneNode(true); // deep clone to clone td as well as input

    },

    //helper function to get the absolute position of the place where mouse was clicked, to display the contextual menu.
    getPosition: function (el) {
      var xPosition = 0;
      var yPosition = 0;

      while (el) {
        if (el.tagName == "BODY") {
          // deal with browser quirks with body/window/document and page scroll
          var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
          var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

          xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
          yPosition += (el.offsetTop - yScrollPos + el.clientTop);
        } else {
          xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
          yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
      }
      return {
        x: xPosition,
        y: yPosition
      };
    }
  };

export default utils;
