
/* importing core */
import {Game} from './lib/core/Game'
import {GameObject} from './lib/core/GameObject'
import {Scene} from './lib/core/Scene'

/* importing geometry */
import {Polygon} from './lib/geometry/Polygon'
import {Circle} from './lib/geometry/Circle'
import {Rectangle} from './lib/geometry/Rectangle'
import {Triangle} from './lib/geometry/Triangle'

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