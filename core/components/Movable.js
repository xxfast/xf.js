/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like move, translate etc.
*/
class Movable extends Component {
  constructor() {
    super();
    this.position = {x:0,y:0};
    this.speed = {x:0,y:0};
    this.acceleration = {x:0,y:0};
  }

  /**
    * translales the object to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
    *   @returns {}
  */
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }

  /**
    * moves the object by the given amount
    * @param {int} x - x amount to move.
    * @param {int} y - y amount to move.
  */
  move(x,y){
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  /**
    * sets the velocity of the object
    *   @param {int} x - horizontal velocity component.
    *   @param {int} y- vertical velocity component.
    *   @returns {Sprite} itself
  */
  velocity(x,y){
    this.speed = {x:x,y:y};
    return this;
  }

  /**
    * increases the acceleration of the  object
    *   @param {int} x - horizontal acceleration component.
    *   @param {int} y- vertical acceleration component.
    *   @returns {Sprite} itself
  */
  accelerate(x,y){
    this.acceleration.x += x;
    this.acceleration.y += y;
    return this;
  }

  /**
    * applies a force to the object
    *   @param {int} x - horizontal force component.
    *   @param {int} y- vertical force component.
    *   @returns {Sprite} itself
  */
  force(x,y){
    this.acceleration.x += (x/(this.mass || 1));
    this.acceleration.y += (y/(this.mass || 1));
    return this;
  }

  /*
    * defines how the movable component change state on one update
  */
  process(){
    this.velocity(this.speed.x + this.acceleration.x, this.speed.y + this.acceleration.y );
    this.move(this.speed.x,this.speed.y);
  }
}
