'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Manager2 = require('Manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author - Isuru Kusumal Rajapakse (xxfast)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description - Represents a scene manager managing the scenes of a game
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var SceneManager = exports.SceneManager = function (_Manager) {
  _inherits(SceneManager, _Manager);

  function SceneManager() {
    _classCallCheck(this, SceneManager);

    var _this = _possibleConstructorReturn(this, (SceneManager.__proto__ || Object.getPrototypeOf(SceneManager)).call(this));

    _this.scenes = [];
    _this.current = null;
    return _this;
  }

  /*
    * checks whether the givens scene is a part of this game
    * @param {Scene} scene - the scene to check
    *   @returns {int} index found
  */


  _createClass(SceneManager, [{
    key: 'contains',
    value: function contains(scene) {
      for (var i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].identify(scene.id)) {
          return i;
        }
      }
      return -1;
    }

    /*
      * adds a given scene to the list of scenes
      * @param {Scene} scene - the scene to add
      *   @returns {Sprite} itself
    */

  }, {
    key: 'add',
    value: function add(scene) {
      this.scenes.push(scene);
      return this;
    }

    /*
      * sets a given scene to the current of scene
      * @param {Scene} scene - the scene to add
      *   @returns {Sprite} itself
    */

  }, {
    key: 'set',
    value: function set(scene) {
      if (this.contains(scene) < 0) this.add(scene);
      this.current = this.scenes[this.contains(scene)];
      return this;
    }

    /*
      * gets the first scene that matches the id
      * @param {string} id - id of the scene to get
      *   @returns {Scene} found[=null]
    */

  }, {
    key: 'get',
    value: function get(id) {
      for (var i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].id == id) return this.scenes[i];
      }return null;
    }

    /*
      * removes the first scene that matches the id
      * @param {string} id - the id of the scene to remove
      *   @returns {Scene} the removed scene
    */

  }, {
    key: 'remove',
    value: function remove(id) {
      var index = this.contains(this.get(id));
      var toReturn = index > 0 ? this.scenes.splice(index, 1) : null;
      return toReturn;
    }

    /**
      *  processes the current scene the SceneManager is focused on
    */

  }, {
    key: 'process',
    value: function process() {
      if (this.current) {
        this.current.update();
      }
    }

    /**
      *  render the current scene the SceneManager is focused on
    */

  }, {
    key: 'render',
    value: function render() {
      if (this.current) {
        this.current.render();
      }
    }
  }]);

  return SceneManager;
}(_Manager2.Manager);