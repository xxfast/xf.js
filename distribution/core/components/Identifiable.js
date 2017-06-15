'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identifiable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a identifiable components that defines a identifiable behavior
*/

var Identifiable = exports.Identifiable = function (_Component) {
  _inherits(Identifiable, _Component);

  function Identifiable(owner, id) {
    _classCallCheck(this, Identifiable);

    var _this = _possibleConstructorReturn(this, (Identifiable.__proto__ || Object.getPrototypeOf(Identifiable)).call(this, owner));

    _this.id = id;
    return _this;
  }

  /*
    * checks whether the given object is being identifed as the given id
    *   @returns {bool} amI?
  */


  _createClass(Identifiable, [{
    key: 'identify',
    value: function identify(id) {
      return this.id == id;
    }

    /*
      * generates a unique identifiable id for a gameobject
      *   @returns {String} uniqueString
    */

  }, {
    key: 'generate',
    value: function generate() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /*
      * initialise the state of the component
    */

  }, {
    key: 'initialise',
    value: function initialise() {
      if (!this.id) this.id = this.generate();
    }
  }]);

  return Identifiable;
}(_Component2.Component);