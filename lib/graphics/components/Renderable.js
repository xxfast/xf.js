'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
var RenderableSprite = function (_Component) {
  _inherits(RenderableSprite, _Component);

  function RenderableSprite(owner) {
    _classCallCheck(this, RenderableSprite);

    return _possibleConstructorReturn(this, (RenderableSprite.__proto__ || Object.getPrototypeOf(RenderableSprite)).call(this, owner));
  }

  /*
    * renders the sprite on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the sprite on.
    *   @param {Camera} camera - the camera to look at the sprite from.
  */


  _createClass(RenderableSprite, [{
    key: 'render',
    value: function render(c) {
      var camera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { position: { x: 0, y: 0 }, scale: { width: 1, height: 1 }, rotation: 0, target: { scene: { canvas: { width: 1, height: 1 } } } };

      var cwidth = camera.target.scene.canvas.width;
      var cheight = camera.target.scene.canvas.height;
      var rxoffset = Math.cos(camera.rotation + this.rotation);
      var ryoffset = Math.sin(camera.rotation + this.rotation);
      var xoffset = this.position.x / camera.scale.width * cwidth;
      var xcoffset = camera.position.x / camera.scale.width * cwidth;
      var yoffset = this.position.y / camera.scale.height * cheight;
      var ycoffset = camera.position.y / camera.scale.height * cheight;
      c.save();
      c.translate((this.position.x + this.origin.x - camera.position.x) / camera.scale.width * cwidth, (this.position.y + this.origin.y - camera.position.y) / camera.scale.height * cheight);
      c.rotate(-this.rotation * Math.PI / 180);
      c.translate((-this.position.x - this.origin.x + camera.position.x) / camera.scale.width * cwidth, (-this.position.y - this.origin.y + camera.position.y) / camera.scale.height * cheight);
      for (var i = 0; i < this.state().layers.length; i++) {
        var args = [this.state().layers[i]];
        if (this.state().hasOwnProperty('frame')) {
          var frame = Math.round(this.state().frame);
          args.push((this.state().cp[frame] || { x: 0 }).x, // clipping x position of sprite cell
          (this.state().cp[frame] || { y: 0 }).y, // clipping y position of sprite cell
          Math.max(1, Math.floor(this.state().fw)), // width of sprite cell
          Math.max(1, Math.floor(this.state().fh))); // height of sprite cell
        }
        args.push(xoffset - xcoffset, // x position to render
        yoffset - ycoffset, // y position to render
        this.scale.width / camera.scale.width * cwidth, // height to render
        this.scale.height / camera.scale.height * cheight); // width to render
        c.drawImage.apply(c, args);
      }
      c.restore();
    }
  }]);

  return RenderableSprite;
}(Component);