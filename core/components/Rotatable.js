/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotate etc.
*/
class Rotatable {
  constructor() {
    this.rotation = 0;
  }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree=0){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    this.bounderies = this.bounds();
    return this;
  }


}
