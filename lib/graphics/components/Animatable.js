"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a animatable behaviors like animate, play etc.
*/
var Animatable = function (_Component) {
  _inherits(Animatable, _Component);

  function Animatable(owner) {
    _classCallCheck(this, Animatable);

    var _this = _possibleConstructorReturn(this, (Animatable.__proto__ || Object.getPrototypeOf(Animatable)).call(this, owner));

    _this.states = [];
    _this.current = 0;
    _this.fpt = 1;
    return _this;
  }

  /**
    * returns the current state the sprite is in
    *   @returns {state} current state
  */


  _createClass(Animatable, [{
    key: "state",
    value: function state() {
      return this.states[this.current];
    }

    /**
      * set the current state of the animation
      *   @param {string} id - unique name of the animation to go to
      *   @returns {Sprite} itself
    */

  }, {
    key: "goto",
    value: function goto(id) {
      for (var i = 0; i < this.states.length; i++) {
        if (this.states[i].id == id) {
          this.current = i;
          break;
        }
      }
      return this;
    }

    /**
      * plays the animation associated in the state (if any)
      *   @param {string} fpt - sets the speed of playback [<0=slowmotion, 0=stopped, 1=normal, 1>=fastmotion]
      *   @returns {Sprite} itself
    */

  }, {
    key: "play",
    value: function play() {
      var fpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.fpt = fpt;
      return this;
    }

    /**
      * stops the animation associated in the state (if any)
      *   @returns {Sprite} itself
    */

  }, {
    key: "stop",
    value: function stop() {
      this.fpt = 0;
      return this;
    }

    /**
      * rewinds the animation associated in the state (if any)
      * rewinds to the start by default.
      *   @param {in} [to=0] - sets the frame to rewind to
      *   @returns {Sprite} itself
    */

  }, {
    key: "rewind",
    value: function rewind() {
      var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.state().frame = to;
      return this;
    }

    /**
      * sets a static layered image resources for the desired sprite
      * important ! - the last last layer renders on top
      * important ! - the first layer will be used as the collision mask by defult
      *   @param {string[]} url - location of the images layer by layer.
      *   @returns {Sprite} itself
    */

  }, {
    key: "source",
    value: function source(urls) {
      return this.animate("default", urls, 1, 1, 1, 1, 0);
    }

    /**
    * sets animated spritesheet resources for the desired sprite
    * important ! - the last last layer renders on top
    * important ! - the first layer will be used as the collision mask by defult
    *   @param {string} name -  unique name to identify each animation state
    *   @param {string[]} urls - location(s) of the spritesheet images layer by layer.
    *   @param {int} nr - number of rows in the spritesheet
    *   @param {int} nc - number of colomns in the spritesheet
    *   @param {string} sf -  starting frame of the said state
    *   @param {int} repeat - times should the animation repeat [-1: repeat forever, 0:don't animate , 1:repeat once ...]
    *   @returns {Sprite} itself
    */

  }, {
    key: "animate",
    value: function animate(name, urls, nr, nc, nf, sf, repeat) {
      var state = { id: name, frame: sf, layers: [], nr: nr, nc: nc, nf: nf, fw: 0, fh: 0, repeat: repeat, cp: [], collider: null };
      for (var i = 0; i < urls.length; i++) {
        var image = new Image();
        image.src = urls[i];
        image.state = state;
        image.callback = this;
        image.state = state;
        image.onload = function () {
          //frame width, height, and clipping points is decided from the base layer
          if (!this.state.fw) this.state.fw = this.width / this.state.nc;
          if (!this.state.fh) this.state.fh = this.height / this.state.nr;
          if (this.state.cp.length == 0) {
            for (var r = 0; r < nr; r++) {
              for (var c = 0; c < nc; c++) {
                state.cp.push({ x: c * this.state.fw, y: r * this.state.fh });
              }
            }
          }
          this.callback.bounderies = this.callback.bounds();
          //by default, the collider for the state will be the base layer
          if (!this.state.collider) this.state.collider = this;
          //by default, if no scale is provided, scale will be set to base layers dimentions.
          if (this.callback.scale.width == 0 && this.callback.scale.height == 0) {
            this.callback.transform(this.width, this.height);
          }
        };
        state.layers.push(image);
      }
      this.states.push(state);
      this.goto(name);
      return this;
    }

    /*
      * defines how the component state change on one update
    */

  }, {
    key: "process",
    value: function process() {
      if (this.state().repeat >= 1 || this.state().repeat < 0) {
        this.state().frame += this.fpt;
        if (this.state().frame > this.state().nf - 1) {
          this.state().frame = 0;
          this.state().repeat--;
        } else if (this.state().frame < 0) {
          this.state().frame = this.state().nf - 1;
        }
      }
    }
  }]);

  return Animatable;
}(Component);