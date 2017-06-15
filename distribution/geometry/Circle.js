"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an Circle shape
*/
var Circle = function (_Polygon) {
  _inherits(Circle, _Polygon);

  function Circle() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fill: false, stroke: false };
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, pathFromCircle(x, y, r, step), color));
  }

  return Circle;
}(Polygon);

function pathFromCircle(x, y, r, step) {
  var path = [];
  var theta = 1;
  while (theta < 360) {
    path.push({ x: x + r * Math.cos(theta * Math.PI / 180),
      y: y + r * Math.sin(theta * Math.PI / 180) });
    theta += step;
  }
  return path;
}