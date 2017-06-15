'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require('Game');

Object.keys(_Game).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Game[key];
    }
  });
});

var _GameObject = require('GameObject');

Object.keys(_GameObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GameObject[key];
    }
  });
});

var _Scene = require('Scene');

Object.keys(_Scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Scene[key];
    }
  });
});