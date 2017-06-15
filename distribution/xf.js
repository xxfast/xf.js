'use strict';

var _Game = require('./core/Game');

var _GameObject = require('./core/GameObject');

var _Scene = require('./core/Scene');

var _Polygon = require('./geometry/Polygon');

// import {Circle} from './geometry/Circle'
// import {Rectangle} from './geometry/Rectangle'
// import {Triangle} from './geometry/Triangle'

/* importing core */
var xf = {
  Game: _Game.Game,
  GameObject: _GameObject.GameObject,
  Scene: _Scene.Scene,
  Polygon: _Polygon.Polygon
  // Circle: Circle,
  // Rectangle: Rectangle,
  // Triangle: Triangle,
};

/* importing geometry */


module.exports = xf;