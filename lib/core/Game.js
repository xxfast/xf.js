'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneManager = require('./managers/SceneManager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single game instance
*/

var Game = exports.Game = function () {
  /*
    * creates the game instance
    *   @returns {Game} itself
  */
  function Game() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { width: 500, height: 400 };

    _classCallCheck(this, Game);

    this.managers = { scenes: new _SceneManager.SceneManager(this) };
    this.states = [];
    this.size = size;
    this.canvas = null;
    this.display = { options: {
        fullscreen: false,
        framerate: 60
      },
      canvas: null,
      context: null,
      container: null
    };
    this.loop = null;
  }

  /*
    * builds the game instance
    *   @returns {Game} itself
  */


  _createClass(Game, [{
    key: 'build',
    value: function build() {
      var container = null,
          dpr = window.devicePixelRatio;
      this.canvas = document.createElement('canvas');
      /* if no container is specified, then the game will be attached to the root
         root document body, otherwise will be attached to the given node
      */
      this.canvas.width = this.size.width;
      this.canvas.height = this.size.height;
      if (this.display.container == null) {
        this.display.container = document.body; // window;
        container = this.display.container;
      }

      var w = this.canvas.width; // = container.innerWidth; // buggy
      var h = this.canvas.height; // = container.innerHeight;
      var scale = Math.min(container.innerHeight / h, container.innerWidth / w);

      if (this.display.container == null) {
        if (this.display.options.fullscreen) {
          this.canvas.style.position = "absolute";
          this.canvas.style.width = w * scale + "px";
          this.canvas.style.height = h * scale + "px";
          this.canvas.style.left = window.innerWidth * 0.5 - w * scale * 0.5 + "px";
          this.canvas.style.top = window.innerHeight * 0.5 - h * scale * 0.5 + "px";
        }
        document.body.appendChild(this.canvas);
      } else {
        this.display.container.appendChild(this.canvas);
      }
      this.display.canvas = this.canvas;
      this.display.context = this.canvas.getContext("2d");
      return this;
    }

    /*
      * run the game loop
      *   @returns {Game} itself
    */

  }, {
    key: 'start',
    value: function start() {
      var callback = this;
      window.onload = function () {
        console.log("callback = " + callback);
        console.log("callback.display = " + callback.display);
        console.log("callback.display = " + callback.display);
        console.log("callback.display.options = " + callback.display.options);
        setInterval(function () {
          callback.update.call(callback);
        }, callback.display.options.framerate / 1000);
      };
    }

    /*
      * gets the scene manager of this game
      *   @returns {SceneManager} sceneManager
    */

  }, {
    key: 'scenes',
    value: function scenes() {
      return this.managers.scenes;
    }

    /*
      * updates the current scene of this game
    */

  }, {
    key: 'update',
    value: function update() {
      if (this.loop != null) this.loop();
      this.managers.scenes.process();
      this.render();
    }

    /*
      * renders the current scene of this game
    */

  }, {
    key: 'render',
    value: function render() {
      this.managers.scenes.render(this.display.context);
    }
  }]);

  return Game;
}();