import {Component} from './Component'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center etc.
*/
export class Transformable extends Component{
  constructor(owner) {
    super(owner);
    this.origin = {x:0,y:0};
    this.scale = {width:0,height:0};
  }

  /**
    * transform the  object to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }

  /**
    * transform the object to the given scale
    * @param {int} byX - increse/decrease in width.
    * @param {int} byY - increse/decrease in height.
  */
  resize(byX,byY){
    this.transform(this.scale.width+byX,this.scale.height+byY)
    return this;
  }

  /**
    * sets the origin of the object to the given position
    * if called without parameters, it defaults to center of the object
    * @param {int} [x=width/2] - anchor in the x position.
    * @param {int} [y=height/2] - anchor in the y position.
  */
  center(x=this.scale.width/2,y=this.scale.height/2){
    this.origin = {x:x,y:y};
    return this;
  }
}
