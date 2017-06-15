'use strict';

var _GameObject2 = require('.../core/GameObject');

var _Collidable = require('./components/Collidable');

var _Transformable = require('./components/Transformable');

var _Rotatable = require('./components/Rotatable');

var _Renderable = require('./components/Renderable');

var _Debuggable = require('.../core/components/Debuggable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an abstract polygon with n number of sides
*/
var Polygon = function (_GameObject) {
  _inherits(Polygon, _GameObject);

  /**
    * Create an polygon with specified vertices
    * @param {[cordinates]]} points - array of sets of coordinates formated as {x:x,y;y}.
    */
  function Polygon() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{ x: 0, y: 0 }];
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { fill: false, stroke: false };

    _classCallCheck(this, Polygon);

    var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

    _this.points = points;
    _this.color = color;
    _this.attach(new _Transformable.TransformablePolygon(_this));
    _this.attach(new _Collidable.CollidablePolygon(_this));
    _this.attach(new _Rotatable.RotatablePolygon(_this));
    _this.attach(new _Renderable.RenderablePolygon(_this));
    _this.attach(new _Debuggable.Debuggable(_this));
    //debug
    _this.bounderies = _this.bounds();
    return _this;
  }

  return Polygon;
}(_GameObject2.GameObject);