'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like move, translate etc.
*/
var Movable = exports.Movable = function (_Component) {
  _inherits(Movable, _Component);

  function Movable(owner) {
    _classCallCheck(this, Movable);

    var _this = _possibleConstructorReturn(this, (Movable.__proto__ || Object.getPrototypeOf(Movable)).call(this, owner));

    _this.position = { x: 0, y: 0 };
    _this.speed = { x: 0, y: 0 };
    _this.acceleration = { x: 0, y: 0 };
    return _this;
  }

  /**
    * translales the object to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
    *   @returns {}
  */


  _createClass(Movable, [{
    key: 'translate',
    value: function translate(x, y) {
      this.position = { x: x, y: y };
      return this;
    }

    /**
      * moves the object by the given amount
      * @param {int} x - x amount to move.
      * @param {int} y - y amount to move.
    */

  }, {
    key: 'move',
    value: function move(x, y) {
      this.position.x += x;
      this.position.y += y;
      return this;
    }

    /**
      * sets the velocity of the object
      *   @param {int} x - horizontal velocity component.
      *   @param {int} y- vertical velocity component.
      *   @returns {Sprite} itself
    */

  }, {
    key: 'velocity',
    value: function velocity(x, y) {
      this.speed = { x: x, y: y };
      return this;
    }

    /**
      * increases the acceleration of the  object
      *   @param {int} x - horizontal acceleration component.
      *   @param {int} y- vertical acceleration component.
      *   @returns {Sprite} itself
    */

  }, {
    key: 'accelerate',
    value: function accelerate(x, y) {
      this.acceleration.x += x;
      this.acceleration.y += y;
      return this;
    }

    /**
      * applies a force to the object
      *   @param {int} x - horizontal force component.
      *   @param {int} y- vertical force component.
      *   @returns {Sprite} itself
    */

  }, {
    key: 'force',
    value: function force(x, y) {
      this.acceleration.x += x / (this.mass || 1);
      this.acceleration.y += y / (this.mass || 1);
      return this;
    }

    /*
      * defines how the movable component change state on one update
    */

  }, {
    key: 'process',
    value: function process() {
      this.velocity(this.speed.x + this.acceleration.x, this.speed.y + this.acceleration.y);
      this.move(this.speed.x, this.speed.y);
    }
  }]);

  return Movable;
}(_Component2.Component);