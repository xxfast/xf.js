'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollidablePolygon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../core/components/Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a collidable behaviors like collideon, bounds for Polygons etc.
*/
var CollidablePolygon = exports.CollidablePolygon = function (_Component) {
  _inherits(CollidablePolygon, _Component);

  function CollidablePolygon(owner) {
    _classCallCheck(this, CollidablePolygon);

    var _this = _possibleConstructorReturn(this, (CollidablePolygon.__proto__ || Object.getPrototypeOf(CollidablePolygon)).call(this, owner));

    _this.vertices = [];
    _this.bounderies = {};
    _this.collider = null;
    _this.mass = 1;
    return _this;
  }

  /**
    * @override
    * calculate the bounds object of the this polygon
    * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
  */


  _createClass(CollidablePolygon, [{
    key: 'bounds',
    value: function bounds() {
      this.vertices = [{ x: 0, y: 0 }, { x: +this.scale.width, y: 0 }, { x: +this.scale.width, y: +this.scale.height }, { x: 0, y: 0 + this.scale.height }];
      var rads = -(this.rotation * Math.PI) / 180;
      for (var i = 0; i < this.vertices.length; i++) {
        var dx = this.vertices[i].x - this.origin.x;
        var dy = this.vertices[i].y - this.origin.y;
        // TODO : fix this shit
        this.vertices[i].x -= dx;
        this.vertices[i].y -= dy;
      }
      var minx = this.points[0].x,
          miny = this.points[0].y;
      var maxx = this.points[0].x,
          maxy = this.points[0].y;
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].x < minx) minx = this.points[i].x;
        if (this.points[i].y < miny) miny = this.points[i].y;
        if (this.points[i].x > maxx) maxx = this.points[i].x;
        if (this.points[i].y > maxy) maxy = this.points[i].y;
      }
      return { top: miny, right: maxx, down: maxy, left: minx };
    }

    /**
      * Sees if one game object is within another sprite
      * @param {GameObject} obj - GameObject to see if this is within.
    */

  }, {
    key: 'within',
    value: function within(obj) {
      if (this.rotation == 0 && obj.rotation == 0) {
        if (this.position.x > obj.position.x + obj.scale.width || obj.position.x > this.position.x + this.scale.width) return false;
        if (this.position.y > obj.position.y + obj.scale.height || obj.position.y > this.position.y + this.scale.height) return false;
      }
      return true;
    }
  }]);

  return CollidablePolygon;
}(_Component2.Component);