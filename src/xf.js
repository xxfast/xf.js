
/* importing core */
import {Game} from './lib/core/Game'
import {GameObject} from './lib/core/GameObject'
import {Scene} from './lib/core/Scene'

/* importing geometry */
import {Polygon} from './lib/geometry/Polygon'
import {Circle} from './lib/geometry/Circle'
import {Rectangle} from './lib/geometry/Rectangle'
import {Triangle} from './lib/geometry/Triangle'

/* importing graphics */
import {Camera} from './lib/graphics/Camera'
import {Sprite} from './lib/graphics/Sprite'

var xf = {
  Game: Game,
  GameObject: GameObject,
  Scene: Scene,
  Polygon: Polygon,
  Circle: Circle,
  Rectangle: Rectangle,
  Triangle: Triangle,
  Camera: Camera,
  Sprite: Sprite,
};

module.exports = xf;