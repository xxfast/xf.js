"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debuggable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require("./Component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that help us developers to debug
*/
var Debuggable = exports.Debuggable = function (_Component) {
  _inherits(Debuggable, _Component);

  function Debuggable(owner) {
    _classCallCheck(this, Debuggable);

    var _this = _possibleConstructorReturn(this, (Debuggable.__proto__ || Object.getPrototypeOf(Debuggable)).call(this, owner));

    _this.debug = { enabled: true,
      drawCollisionMask: false,
      drawBounds: true,
      drawCenter: true,
      drawContainer: true };
    return _this;
  }

  /*
    * enable/disable debugging parameters in the debugging mode
    *   @returns {GameObject} itself
  */


  _createClass(Debuggable, [{
    key: "debug",
    value: function debug() {
      for (var propt in obj.debug) {
        obj.debug[propt] = !obj[propt];
      }
      return this;
    }

    /*
      * enable/disable debugging parameters in the debugging mode
      *   @returns {GameObject} itself
    */

  }, {
    key: "render",
    value: function render(c, camera) {
      if (!this.debug.enabled) return;
      var cwidth = camera.target.scene.canvas.width;
      var cheight = camera.target.scene.canvas.height;
      var rxoffset = Math.cos(camera.rotation + this.rotation);
      var ryoffset = Math.sin(camera.rotation + this.rotation);
      var xoffset = this.position.x / camera.scale.width * cwidth;
      var xcoffset = camera.position.x / camera.scale.width * cwidth;
      var yoffset = this.position.y / camera.scale.height * cheight;
      var ycoffset = camera.position.y / camera.scale.height * cheight;
      if (this.debug.drawCenter) {
        c.fillStyle = "yellow";
        var cpxoffset = (this.position.x + this.origin.x - 2) / camera.scale.width * cwidth;
        var cpyoffset = (this.position.y + this.origin.y - 2) / camera.scale.height * cheight;
        c.fillRect(cpxoffset - xcoffset, cpyoffset - ycoffset, 4, 4); // draw the bounding boxes
      }
      if (this.debug.drawContainer) {
        c.strokeStyle = "green";
        c.beginPath();
        var xpoffset = (this.position.x + this.vertices[0].x) / camera.scale.width * cwidth;
        var ypoffset = (this.position.y + this.vertices[0].y) / camera.scale.height * cheight;
        c.moveTo(xpoffset - xcoffset, ypoffset - ycoffset);
        for (var i = 0; i < this.vertices.length; i++) {
          xpoffset = (this.position.x + this.vertices[i].x) / camera.scale.width * cwidth;
          ypoffset = (this.position.y + this.vertices[i].y) / camera.scale.height * cheight;
          c.lineTo(xpoffset - xcoffset, ypoffset - ycoffset);
        }
        c.closePath();
        c.stroke();
      }
      if (this.debug.drawBounds) {
        c.strokeStyle = "red";
        c.strokeRect(xoffset - xcoffset + this.bounderies.left, yoffset - ycoffset + this.bounderies.top, (this.bounderies.right - this.bounderies.left) / camera.scale.width * cwidth, (this.bounderies.down - this.bounderies.top) / camera.scale.height * cheight); // draw the bounding boxes
      }
      if (this.debug.drawCollisionMask && this.state().collider) {
        var args = [this.state().collider];
        if (this.state().hasOwnProperty('frame')) args.push((this.state().cp[Math.round(this.state().frame)] || { x: 0 }).x, // clipping x position of sprite cell
        (this.state().cp[Math.round(this.state().frame)] || { y: 0 }).y, // clipping y position of sprite cell
        this.state().fw, // width of sprite cell
        this.state().fh); // height of sprite cell
        args.push(xoffset - xcoffset, // x position to render
        yoffset - ycoffset, // y position to render
        this.scale.width / camera.scale.width * cwidth, // height to render
        this.scale.height / camera.scale.height * cheight); // width to render
        c.drawImage.apply(c, args);
      }
    }
  }]);

  return Debuggable;
}(_Component2.Component);