
/* importing core */
import {Game} from './core/Game'
import {GameObject} from './core/GameObject'
import {Scene} from './core/Scene'

/* importing geometry */
import {Polygon} from './geometry/Polygon'
import {Circle} from './geometry/Circle'
import {Rectangle} from './geometry/Rectangle'
import {Triangle} from './geometry/Triangle'

var xf = {
  Game: Game,
  GameObject: GameObject,
  Scene: Scene,
  Polygon: Polygon,
  Circle: Circle,
  Rectangle: Rectangle,
  Triangle: Triangle,
};

module.exports = xf;