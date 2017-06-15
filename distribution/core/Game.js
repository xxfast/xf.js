"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single game instance
*/
var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.managers = { scenes: new SceneManager() };
    this.states = [];
  }

  /*
    * gets the scene manager of this game
    *   @returns {SceneManager} sceneManager
  */


  _createClass(Game, [{
    key: "scenes",
    value: function scenes() {
      return this.managers.scenes;
    }

    /*
      * updates the current scene of this game
    */

  }, {
    key: "update",
    value: function update() {
      this.managers.scenes.process();
    }

    /*
      * renders the current scene of this game
    */

  }, {
    key: "render",
    value: function render() {
      this.managers.scenes.render();
    }
  }]);

  return Game;
}();