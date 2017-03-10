/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center etc.
*/
class Transformable extends Component{
  constructor() {
    super();
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