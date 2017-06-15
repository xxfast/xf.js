"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a singular sprite with embedded physics.
 * @extends Object
*/
var Sprite = function (_GameObject) {
  _inherits(Sprite, _GameObject);

  /**
    * Create an Sprite.
    * @param {string} id - name of the Sprite.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  function Sprite(id, x, y, w, h) {
    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, id, x, y, w, h));

    _this.attach(new Rotatable(_this));
    _this.attach(new CollidableSprite(_this));
    _this.attach(new Animatable(_this));
    _this.attach(new RenderableSprite(_this));
    _this.attach(new Debuggable(_this));
    return _this;
  }

  /**
    *clones the object
    * @returns {Sprite} cloned
  */


  _createClass(Sprite, [{
    key: "clone",
    value: function clone() {
      var toReturn = new Sprite(this.id, this.position.x, this.position.y, this.scale.width, this.scale.height);
      toReturn.speed = { x: this.speed.x, y: this.speed.y };
      toReturn.acceleration = { x: this.acceleration.x, y: this.acceleration.y };
      toReturn.mass = this.mass;
      toReturn.debug = { drawCollisionMask: this.debug.drawCollisionMask };
      toReturn.states = this.states; //shallow
      toReturn.fpt = this.fpt;
      return toReturn;
    }
  }]);

  return Sprite;
}(GameObject);