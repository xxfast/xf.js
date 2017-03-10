/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like move, translate etc.
*/
class Movable extends Component {
  constructor() {
    super();
    this.position = {x:0,y:0};
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
    * movees the object by the given amount
    * @param {int} x - x amount to move.
    * @param {int} y - y amount to move.
  */
  move(x,y){
    this.position.x += x;
    this.position.y += y;
    return this;
  }
}
