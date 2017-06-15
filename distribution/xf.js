'use strict';

var _Game = require('./core/Game');

var _GameObject = require('./core/GameObject');

var _Scene = require('./core/Scene');

var _Polygon = require('./geometry/Polygon');

var _Circle = require('./geometry/Circle');

var _Rectangle = require('./geometry/Rectangle');

var _Triangle = require('./geometry/Triangle');

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