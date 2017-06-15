'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = require('GameObject');

var _Manager = require('./managers/Manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single scene that contains child sprite elements
*/
var Scene = exports.Scene = function (_GameObject) {
  _inherits(Scene, _GameObject);

  /**
    * Create an Scene.
    * @param {string} id - name of the Scene.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    * @param {int} [h=0] - desired height.
    */
  function Scene(id) {
    var bg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "white";
    var w = arguments[2];
    var h = arguments[3];
    var canvas = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, id, 0, 0, w, h));

    _this.elements = [];
    _this.managers = {};
    _this.manageProfiles = { Animatable: { process: { on: 1 } },
      Rotatable: { process: { on: 1 } } };
    _this.observer = null;
    _this.background = bg;
    _this.canvas = canvas;
    return _this;
  }

  /*
    * checks whether the givens gameobject is a part of this scene
    * @param {GameObject} obj - the object to check
    *   @returns {int} index found
  */


  _createClass(Scene, [{
    key: 'contains',
    value: function contains(object) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].identify(object.id)) {
          return i;
        }
      }
      return -1;
    }

    /*
      * adds gameobjects to the scene
      * @param {GameObject[]} args - the gameobjects to add to the scene.
      *   @returns {Scene} itself
    */

  }, {
    key: 'add',
    value: function add(args) {
      for (var i = 0; i < arguments.length; i++) {
        this.elements.push(arguments[i]);
        for (var component in arguments[i].components) {
          if (arguments[i].components.hasOwnProperty(component)) {
            if (!this.managers.hasOwnProperty(component)) {
              this.managers[component] = new _Manager.Manager();
              this.managers[component].adopt(this.manageProfiles[component]);
            }
            this.managers[component].manage(arguments[i].components[component], this.manageProfiles[component]);
          }
        }
        if (arguments[i] instanceof Camera) arguments[i].targets(this);
      }
      return this;
    }

    /*
      * removes a gameobject from the scene
      * @param {GameObject} obj - the canvas to draw the scene on.
    */

  }, {
    key: 'remove',
    value: function remove(obj) {
      this.elements = this.elements.filter(function (item) {
        return item !== obj;
      });
      return this;
    }

    /*
      * adds and sets the observer for the scene
      * @param {Camera} camera - the camera to set to observe through
      *   @returns {Scene} itself
    */

  }, {
    key: 'observe',
    value: function observe() {
      var camera = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.contains(camera) < 0) this.add(camera);
      this.observer = camera;
      return this;
    }

    /**
      * initialise the scene and components
    */

  }, {
    key: 'initialise',
    value: function initialise() {
      for (var manager in this.managers) {
        if (this.managers.hasOwnProperty(manager)) {
          this.managers[manager].initialise();
        }
      }
    }

    /**
      * updates the scene once
    */

  }, {
    key: 'update',
    value: function update() {
      for (var manager in this.managers) {
        if (this.managers.hasOwnProperty(manager)) {
          this.managers[manager].update();
        }
      }
    }

    /**
      * renders the scene on the given canvas,
      * if a camera is proviced, then as seen from the given camera
      * @param {context} c - the canvas to draw the scene on.
      * @param {Camera} [camera=false] - the camera to look at the scene from.
    */

  }, {
    key: 'render',
    value: function render(c) {
      var camera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.observer;
      // {position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}
      this.canvas = c.canvas;
      this.clear(c);
      c.save();
      //c.translate(-camera.position.x + camera.origin.x, -camera.position.y + camera.origin.y);
      // c.translate(((camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
      //              ((camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
      c.rotate(-camera.rotation * Math.PI / 180);
      // c.translate(((-camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
      //              ((-camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
      //c.translate(camera.position.x - camera.origin.x, camera.position.y - camera.origin.y);
      // for(var i=0; i<this.elements.length; i++){
      //   var s = this.elements[i];
      //   if(!(s instanceof Camera) && ( !camera || s.within(camera) )){
      //     this.elements[i].render(c,camera || undefined);
      //   }
      // }
      for (var manager in this.managers) {
        if (this.managers.hasOwnProperty(manager)) {
          this.managers[manager].render(c, camera);
        }
      }
      c.rotate(camera.rotation * Math.PI / 180);
      if (this.debug) {
        var i = 0;
        c.fillStyle = "white";
        c.fillRect(-1, -1, 100, Object.keys(this.debug).length * 12 + 5);
        for (var prop in this.debug) {
          c.fillStyle = "black";
          c.font = "12px Helvatica";
          c.fillText(prop + ': ' + this.debug[prop], 5, ++i * 12);
        }
      }
    }

    /**
      * clear the rendered patch for the scene
      * @param {context} c - the canvas to clear the canvas scene on.
      */

  }, {
    key: 'clear',
    value: function clear(c) {
      c.fillStyle = this.background;
      c.clearRect(0, 0, this.scale.width, this.scale.height);
      c.fillRect(0, 0, this.scale.width, this.scale.height);
    }
  }]);

  return Scene;
}(_GameObject2.GameObject);