'use strict';

var _Game = require('./lib/core/Game');

var _GameObject = require('./lib/core/GameObject');

var _Scene = require('./lib/core/Scene');

var _Polygon = require('./lib/geometry/Polygon');

var _Circle = require('./lib/geometry/Circle');

var _Rectangle = require('./lib/geometry/Rectangle');

var _Triangle = require('./lib/geometry/Triangle');

/* importing geometry */
var xf = {
  Game: _Game.Game,
  GameObject: _GameObject.GameObject,
  Scene: _Scene.Scene,
  Polygon: _Polygon.Polygon,
  Circle: _Circle.Circle,
  Rectangle: _Rectangle.Rectangle,
  Triangle: _Triangle.Triangle
};
/* importing core */


module.exports = xf;