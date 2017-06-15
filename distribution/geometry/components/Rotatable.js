'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotatablePolygon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../core/components/Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotation for Polygons etc.
*/
var RotatablePolygon = exports.RotatablePolygon = function (_Component) {
  _inherits(RotatablePolygon, _Component);

  function RotatablePolygon(owner) {
    _classCallCheck(this, RotatablePolygon);

    var _this = _possibleConstructorReturn(this, (RotatablePolygon.__proto__ || Object.getPrototypeOf(RotatablePolygon)).call(this, owner));

    _this.rotation = 0;
    return _this;
  }

  /**
    * @override
    * rotates the points of the polygon around it's center by given amount of degrees
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @returns {Polygon} this - the object itself.
  */


  _createClass(RotatablePolygon, [{
    key: 'rotate',
    value: function rotate() {
      var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      //super.rotate(degree);
      this.rotation = !this.rotation ? degree : this.rotation + degree;
      var rads = -(degree * Math.PI) / 180;
      for (var i = 0; i < this.points.length; i++) {
        var dx = this.points[i].x - this.origin.x;
        var dy = this.points[i].y - this.origin.y;
        this.points[i].x = dx * Math.cos(rads) - dy * Math.sin(rads) + this.origin.x;
        this.points[i].y = dx * Math.sin(rads) + dy * Math.cos(rads) + this.origin.y;
      }
      if (this.bounds) this.bounderies = this.bounds();
      this.scale = { width: this.bounderies.right - this.bounderies.left, height: this.bounderies.down - this.bounderies.top };
      return this;
    }
  }]);

  return RotatablePolygon;
}(_Component2.Component);