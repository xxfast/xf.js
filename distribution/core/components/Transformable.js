'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author - Isuru Kusumal Rajapakse (xxfast)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description - Represents a component that defines a behaviors like transform, center etc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var Transformable = exports.Transformable = function (_Component) {
  _inherits(Transformable, _Component);

  function Transformable(owner) {
    _classCallCheck(this, Transformable);

    var _this = _possibleConstructorReturn(this, (Transformable.__proto__ || Object.getPrototypeOf(Transformable)).call(this, owner));

    _this.origin = { x: 0, y: 0 };
    _this.scale = { width: 0, height: 0 };
    return _this;
  }

  /**
    * transform the  object to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */


  _createClass(Transformable, [{
    key: 'transform',
    value: function transform(width, height) {
      this.scale = { width: width, height: height };
      return this;
    }

    /**
      * transform the object to the given scale
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
      * sets the origin of the object to the given position
      * if called without parameters, it defaults to center of the object
      * @param {int} [x=width/2] - anchor in the x position.
      * @param {int} [y=height/2] - anchor in the y position.
    */

  }, {
    key: 'center',
    value: function center() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.scale.width / 2;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.scale.height / 2;

      this.origin = { x: x, y: y };
      return this;
    }
  }]);

  return Transformable;
}(_Component2.Component);