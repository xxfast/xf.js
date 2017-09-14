'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = require('../core/GameObject');

var _Rotatable = require('../core/components/Rotatable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a camera that captures a scene.
*/
var Camera = exports.Camera = function (_GameObject) {
  _inherits(Camera, _GameObject);

  /**
    * Create an Camera.
    * @param {string} [id] - name of the Camera.
    * @param {Scene} target - the scene the camera targted at.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  function Camera(id, scene, x, y, w, h) {
    _classCallCheck(this, Camera);

    var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, id, x, y, w, h));

    _this.attach(new _Rotatable.Rotatable(_this));
    _this.target = { scene: scene, object: false };
    _this.options = { contained: true };
    return _this;
  }

  /**
    * targets the camera at the given scene
    * @param {Scene} target - the scene the camera targted at.
    *   @returns {Camera} itself
    */


  _createClass(Camera, [{
    key: 'targets',
    value: function targets(scene) {
      this.target.scene = scene;
      return this;
    }

    /**
      * camera tracks the given object
      * @param {GameObject} object - the object the camera starts tracking.
      *   @returns {Camera} itself
      */

  }, {
    key: 'tracks',
    value: function tracks(object) {
      this.target.object = object;
      return this;
    }

    /**
      * camera zooms in to, and keeps the constain ratio if enabled
      * @param {int} amount - amount to zoom in on.
      * @param {bool} keepRatio - should the camera keep constent ratio while zooming.
      *   @returns {Camera} itself
      */

  }, {
    key: 'zoom',
    value: function zoom(amount) {
      var keepRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var owidth = this.scale.width,
          oheight = this.scale.height;
      var ratio = this.scale.width / this.scale.height;
      for (var i = 0; i < Math.abs(amount); i++) {
        this.scale.width = this.scale.width - Math.sign(amount) * Math.abs(amount);
        this.scale.height = keepRatio ? this.scale.width / ratio : this.scale.height - Math.sign(amount);
      }
      //recentering the origin ? shouldn't this be done by parent?
      this.origin.x = this.origin.x / owidth * this.scale.width;
      this.origin.y = this.origin.y / oheight * this.scale.height;
      return this;
    }

    /*
      * renders the containts within tha camera to the given canvas
      * @param {context} c - the canvas to draw the camera on.
    */

  }, {
    key: 'capture',
    value: function capture(cc, c) {
      var renderData = cc.getImageData(this.position.x, this.position.y, this.scale.width, this.scale.height);
      cc.putImageData(renderData, 0, 0);
    }

    /**
      * converts camera relative position to absolute position
      * @param {vector2} relative - position witin the camera.
      *  @return {vector2} absolute - absolute position
    */

  }, {
    key: 'absolute',
    value: function absolute(relative) {
      var xratio = this.target.scene.canvas.width / this.scale.width;
      var yratio = this.target.scene.canvas.height / this.scale.height;
      return { x: this.position.x + relative.x / xratio,
        y: this.position.y + relative.y / yratio };
    }

    /**
      * converts camera relative position to absolute position
      * @param {vector2} relative - position witin the camera.
      *  @return {vector2} absolute - absolute position
    */

  }, {
    key: 'relative',
    value: function relative(absolute) {
      return { x: absolute.x - this.position.x, y: absolute.y - this.position.y };
    }

    /**
      * updates the camera just once
    */

  }, {
    key: 'update',
    value: function update() {
      if (this.target.object) {
        this.translate(this.target.object.position.x + this.target.object.origin.x - this.origin.x, this.target.object.position.y + this.target.object.origin.y - this.origin.y);
      }
    }

    /**
      * renders the camera itself
      * @param {context} c - the canvas to draw the camera on.
    */

  }, {
    key: 'render',
    value: function render(c) {
      c.save();
      c.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
      c.rotate(-this.rotation * Math.PI / 180);
      c.translate(-this.position.x - this.origin.x, -this.position.y - this.origin.y);
      c.strokeStyle = "black";
      c.font = "12px Verdana";
      c.fillStyle = "black";
      c.fillText(this.id, this.position.x, this.position.y - 5);
      c.strokeRect(this.position.x, this.position.y, this.scale.width, this.scale.height);
      c.fillStyle = "yellow";
      c.fillRect(this.position.x + this.origin.x - 2, this.position.y + this.origin.y - 2, 4, 4);
      c.restore();
    }
  }]);

  return Camera;
}(_GameObject2.GameObject);