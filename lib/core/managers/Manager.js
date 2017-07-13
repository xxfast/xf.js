"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Virtual manager class that is responsible in managing a single component behavior.
*/
var Manager = exports.Manager = function () {
  function Manager() {
    _classCallCheck(this, Manager);

    this.managed = [];
    this.profiles = { render: { on: 1, now: 0 } };
  }

  /**
    * assigns an component to be managed by the manager
    * @param {Component} component - component to manage.
    * @param {Profile} profile - profile to manage the component
    *   @returns {Manager} itself
  */


  _createClass(Manager, [{
    key: "manage",
    value: function manage(component) {
      component.manager = this;
      this.managed.push(component);
      return this;
    }

    /*
      * assign managed profile
      * @param {Profile} profile - profile to manage the component using
      *   @returns {Component} itself
    */

  }, {
    key: "adopt",
    value: function adopt(profiles) {
      for (var profile in profiles) {
        if (profiles.hasOwnProperty(profile)) {
          this.profiles[profile] = profiles[profile];
          this.profiles[profile].now = 0;
        }
      }
      return this;
    }

    /**
      * Subsequently initialises all of the managed components
    */

  }, {
    key: "initialise",
    value: function initialise() {
      for (var i = 0; i < this.managed.length; i++) {
        if (this.managed[i].hasOwnProperty("initialise")) {
          this.managed[i].initialise.call(this.managed[i].owner);
        }
      }
    }

    /*
      * @virtual
      * determines wheather the managed components should process based on the process profile
      *   @returns {bool} should
    */

  }, {
    key: "shouldUpdate",
    value: function shouldUpdate() {
      return !this.profiles["process"] ? true : this.profiles["process"].now == this.profiles["process"].on;
    }

    /*
      *logic before processing each managed component
    */
    //buggy!

  }, {
    key: "beforeUpdate",
    value: function beforeUpdate() {
      if (!this.profiles["process"]) return;
      this.profiles.process.now++;
      if (this.profiles.process.now > this.profiles.process.on) {
        this.profiles.process.now = 0;
      }
    }

    /**
      * Subsequently process all of the managed components
    */

  }, {
    key: "update",
    value: function update() {
      this.beforeUpdate();
      if (this.shouldUpdate()) {
        for (var i = 0; i < this.managed.length; i++) {
          if (this.managed[i].hasOwnProperty("process")) {
            this.managed[i].process.call(this.managed[i].owner);
          }
        }
      }
    }

    /*
      * @virtual
      * determines wheather the component should render based on the render profile
      *   @returns {bool} should
    */

  }, {
    key: "shouldRender",
    value: function shouldRender() {
      return !this.profiles["render"] ? true : this.profiles["render"].now == this.profiles["render"].on;
    }

    /*
      * component logic before rendeing
    */

  }, {
    key: "beforeRender",
    value: function beforeRender() {
      this.profiles.render.now++;
      if (this.profiles.render.now > this.profiles.render.on) {
        this.profiles.render.now = 0;
      }
    }

    /**
      * Subsequently renders all of the managed components
    */

  }, {
    key: "render",
    value: function render(c, camera) {
      this.beforeRender();
      if (true) {
        //this.shouldRender()){
        for (var i = 0; i < this.managed.length; i++) {
          if (this.managed[i].hasOwnProperty("render")) this.managed[i].render.call(this.managed[i].owner, c, camera);
        }
      }
    }
  }]);

  return Manager;
}();