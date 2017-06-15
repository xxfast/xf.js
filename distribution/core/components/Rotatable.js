"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotate etc.
*/
var Rotatable = function (_Component) {
  _inherits(Rotatable, _Component);

  function Rotatable(owner) {
    _classCallCheck(this, Rotatable);

    var _this = _possibleConstructorReturn(this, (Rotatable.__proto__ || Object.getPrototypeOf(Rotatable)).call(this, owner));

    _this.rotation = 0;
    _this.rotationVelocity = 0;
    return _this;
  }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */


  _createClass(Rotatable, [{
    key: "torque",
    value: function torque() {
      var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.rotationVelocity = degree;
      return this;
    }

    /**
      * rotates the  object by given amount of degrees
      * @param {int} degree - amount of degrees to move.
    */

  }, {
    key: "rotate",
    value: function rotate() {
      var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.rotation = !this.rotation ? degree : this.rotation + degree;
      if (this.bounds) this.bounderies = this.bounds();
      return this;
    }
  }, {
    key: "process",
    value: function process() {
      this.rotate(this.rotationVelocity);
    }
  }]);

  return Rotatable;
}(Component);