'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('../../core/components/Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center for Polygons etc.
*/
var TransformablePolygon = function (_Component) {
  _inherits(TransformablePolygon, _Component);

  function TransformablePolygon(owner) {
    _classCallCheck(this, TransformablePolygon);

    var _this = _possibleConstructorReturn(this, (TransformablePolygon.__proto__ || Object.getPrototypeOf(TransformablePolygon)).call(this, owner));

    _this.bounderies = {};
    _this.origin = { x: 0, y: 0 };
    function width() {
      var max = owner.points[0].x,
          min = owner.points[0].x;
      for (var i = 0; i < owner.points.length; i++) {
        if (owner.points[i].x > max) max = owner.points[i].x;
        if (owner.points[i].x < min) min = owner.points[i].x;
      }
      return max - min;
    }

    function height() {
      var max = owner.points[0].y,
          min = owner.points[0].y;
      for (var i = 0; i < owner.points.length; i++) {
        if (owner.points[i].y > max) max = owner.points[i].y;
        if (owner.points[i].y < min) min = owner.points[i].y;
      }
      return max - min;
    }
    _this.scale = { width: width(), height: height() };
    return _this;
  }
  /**
    * get the width as defined by points of the polygon
    * @return {int} width - width as defined by the polygon
    */

  /**
    * get the height as defined by points of the polygon
    * @return {int} height - height as defined by the polygon
    */

  /**
    * @override
    * transform the  polygon to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */


  _createClass(TransformablePolygon, [{
    key: 'transform',
    value: function transform(width, height) {
      for (var i = 0; i < this.points.length; i++) {
        this.points[i].x = this.points[i].x / this.scale.width * width;
        this.points[i].y = this.points[i].y / this.scale.height * height;
      }
      var newxc = this.origin.x / this.scale.width * width;
      var newyc = this.origin.y / this.scale.height * height;
      this.position.x -= newxc - this.origin.x;
      this.position.y -= newyc - this.origin.y;
      this.center(newxc, newyc);
      //this.position.y -= (this.origin.y/this.scale.height)*height;
      this.bounderies = this.bounds();
      this.scale = { width: width, height: height };
      return this;
    }

    /**
      * transform the polygon to the given scale
      * @param {int} byX - increse/decrease in width.
      * @param {int} byY - increse/decrease in height.
    */

  }, {
    key: 'resize',
    value: function resize(byX, byY) {
      this.transform(this.scale.width + byX, this.scale.height + byY);
      return this;
    }

    /**
      * @override
      * sets the origin of the polygon to the given position
      * if called without parameters, it defaults to center of the object
      * @param {int} [x=width/2] - desired center in the x-cordinate.
      * @param {int} [y=height/2] - desired center in the y-cordinate.
    */

  }, {
    key: 'center',
    value: function center() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (this.bounderies.left + this.bounderies.right) / 2;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (this.bounderies.top + this.bounderies.down) / 2;

      this.origin = { x: x, y: y };
      return this;
    }

    /*
      * initialise the state of the Transformable component
    */

  }, {
    key: 'initialise',
    value: function initialise() {}
  }]);

  return TransformablePolygon;
}(_Component2.Component);