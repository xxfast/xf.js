'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
var Component = exports.Component = function () {
  function Component(owner) {
    _classCallCheck(this, Component);

    this.owner = owner;
    this.profiles = { render: { on: 1, now: 0 } };
  }

  /*
    * assigns the component manager for this component
    *   @returns {Component} itself
  */


  _createClass(Component, [{
    key: 'responds',
    value: function responds(manager) {
      this.manager = manager;
      return this;
    }

    /*
      * defines how the component should initialise after attaching to gameobject
    */

  }, {
    key: 'initialise',
    value: function initialise() {
      throw new Error('must be implemented by subclass!');
    }

    /*
      * defines how the component state change on one update
    */

  }, {
    key: 'process',
    value: function process() {
      throw new Error('must be implemented by subclass!');
    }

    /*
      * defines how this component handles rendering
    */

  }, {
    key: 'render',
    value: function render(c, camera) {
      throw new Error('must be implemented by subclass!');
    }
  }]);

  return Component;
}();