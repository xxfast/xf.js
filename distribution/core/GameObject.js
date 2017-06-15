'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Identifiable = require('components/Identifiable');

var _Movable = require('components/Movable');

var _Transformable = require('components/Transformable');

var _Manager = require('managers/Manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @abstract
 * Class representing an game object.
 */

var GameObject = exports.GameObject = function () {
  /**
    * Create an GameObject.
    * @param {string} id - name of the GameObject.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  function GameObject(id) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var h = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, GameObject);

    this.components = {};
    this.attach(new _Identifiable.Identifiable(this, id));
    this.attach(new _Movable.Movable(this));
    this.attach(new _Transformable.Transformable(this));
  }

  /**
    * clones the object
    *   @returns {GameObject} cloned game object
  */


  _createClass(GameObject, [{
    key: 'clone',
    value: function clone() {
      return new GameObject(this.id, this.position.x, this.position.y, this.scale.width, this.scale.height);
    }

    /**
      * attaches a particular behavior component to the game object
      * @param {Component} component - component to attach
      *   @returns {GameObject} itself
    */

  }, {
    key: 'attach',
    value: function attach(component) {
      Object.assign(this, component);
      var compfacade = { owner: component.owner };
      var reflected = component;
      while (reflected = Reflect.getPrototypeOf(reflected)) {
        if (reflected == Component.prototype) break; // base component act as an interface here
        if (reflected == Object.prototype) break; // no need to redefine Object behavior
        var keys = Reflect.ownKeys(reflected);
        for (var i = 1; i < keys.length; i++) {
          var keyname = keys[i];
          compfacade[keyname] = reflected[keys[i]];
          if (keyname == "initialise" || keyname == "process" || keyname == "render") continue;
          Reflect.getPrototypeOf(this)[keyname] = reflected[keys[i]];
        }
        this.components[reflected.constructor.name] = compfacade;
      }
      return this;
    }
  }]);

  return GameObject;
}();