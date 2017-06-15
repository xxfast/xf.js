import {GameObject} from '../../core/GameObject'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a singular sprite with embedded physics.
 * @extends Object
*/
export class Sprite extends GameObject{
  /**
    * Create an Sprite.
    * @param {string} id - name of the Sprite.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,x,y,w,h) {
    super(id,x,y,w,h);
    this.attach(new Rotatable(this));
    this.attach(new CollidableSprite(this));
    this.attach(new Animatable(this));
    this.attach(new RenderableSprite(this));
    this.attach(new Debuggable(this));
  }

  /**
    *clones the object
    * @returns {Sprite} cloned
  */
  clone(){
    var toReturn = new Sprite(this.id,this.position.x,this.position.y,this.scale.width,this.scale.height);
    toReturn.speed = {x:this.speed.x,y:this.speed.y};
    toReturn.acceleration = {x:this.acceleration.x,y:this.acceleration.y};
    toReturn.mass = this.mass;
    toReturn.debug = { drawCollisionMask:this.debug.drawCollisionMask};
    toReturn.states = this.states; //shallow
    toReturn.fpt = this.fpt;
    return toReturn;
  }


}
