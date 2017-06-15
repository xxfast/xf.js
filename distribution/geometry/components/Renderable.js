"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
var RenderablePolygon = function (_Component) {
  _inherits(RenderablePolygon, _Component);

  function RenderablePolygon(owner) {
    _classCallCheck(this, RenderablePolygon);

    return _possibleConstructorReturn(this, (RenderablePolygon.__proto__ || Object.getPrototypeOf(RenderablePolygon)).call(this, owner));
  }

  /**
    * renders the polygon on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @param {Camera} camera - the camera to look at the polygon from.
  */


  _createClass(RenderablePolygon, [{
    key: "render",
    value: function render(c) {
      var camera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { position: { x: 0, y: 0 }, scale: { width: 1, height: 1 }, rotation: 0, target: { scene: { canvas: { width: 1, height: 1 } } } };

      var cwidth = camera.target.scene.canvas.width;
      var cheight = camera.target.scene.canvas.height;
      var cwratio = camera.target.scene.canvas.width / camera.scale.width;
      var chratio = camera.target.scene.canvas.height / camera.scale.height;
      var xcoffset = camera.position.x / camera.scale.width * camera.target.scene.canvas.width;
      var ycoffset = camera.position.y / camera.scale.height * camera.target.scene.canvas.height;
      var xoffset, yoffset;
      c.beginPath();
      for (var i = 0; i < this.points.length; i++) {
        xoffset = (this.position.x + this.points[i].x) / camera.scale.width * camera.target.scene.canvas.width;
        yoffset = (this.position.y + this.points[i].y) / camera.scale.height * camera.target.scene.canvas.height;
        if (i == 0) c.moveTo(xoffset - xcoffset, yoffset - ycoffset);else c.lineTo(xoffset - xcoffset, yoffset - ycoffset);
      }
      xoffset = this.position.x * cwratio; // ((this.position.x/camera.scale.width) * camera.target.scene.canvas.width);
      yoffset = this.position.y * cwratio; // ((this.position.y/camera.scale.height) * camera.target.scene.canvas.height);
      c.closePath();
      c.fillStyle = this.color.fill;
      if (this.color.fill) c.fill();
      c.strokeStyle = this.color.stroke;
      if (this.color.stroke) c.stroke();
      if (this.debug) {
        if (this.debug.drawBounds) {
          c.strokeStyle = "red";
          var xboffset = (this.position.x + this.bounderies.left) * cwratio;
          var yboffset = (this.position.y + this.bounderies.top) * chratio;
          c.strokeRect(xboffset - xcoffset, yboffset - ycoffset, this.scale.width * cwratio, this.scale.height * chratio); // draw the bounding boxes
        }
        if (this.debug.drawCenter) {
          c.fillStyle = "yellow";
          var xooffset = (this.position.x + this.origin.x - 2) * cwratio;
          var yooffset = (this.position.y + this.origin.y - 2) * chratio;
          c.fillRect(xooffset - xcoffset, yooffset - ycoffset, 4, 4); // draw the bounding boxes
        }
      }
    }
  }]);

  return RenderablePolygon;
}(Component);