import {Component} from 'Component'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotate etc.
*/
export class Rotatable extends Component {
  constructor(owner) {
    super(owner);
    this.rotation = 0;
    this.rotationVelocity = 0;
  }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  torque(degree=0){
    this.rotationVelocity = degree;
    return this;
  }


  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree=0){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    if(this.bounds) this.bounderies = this.bounds();
    return this;
  }

  process(){
    this.rotate(this.rotationVelocity);
  }


}
