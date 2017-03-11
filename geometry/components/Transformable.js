/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center for Polygons etc.
*/
class TransformablePolygon extends Component {
  constructor() {
    super();
    this.bounderies = {};
    this.origin = {x:0,y:0};
    this.scale = {width:0,height:0};
  }
  /**
    * get the width as defined by points of the polygon
    * @return {int} width - width as defined by the polygon
    */
  width(){
    var max=this.points[0].x, min=this.points[0].x;
    for(var i=0;i<this.points.length;i++){
      if(this.points[i].x>max) max = this.points[i].x;
      if(this.points[i].x<min) min = this.points[i].x;
    }
    return max-min;
  }

  /**
    * get the height as defined by points of the polygon
    * @return {int} height - height as defined by the polygon
    */
  height(){
    var max=this.points[0].y, min=this.points[0].y;
    for(var i=0;i<this.points.length;i++){
      if(this.points[i].y>max) max = this.points[i].y;
      if(this.points[i].y<min) min = this.points[i].y;
    }
    return max-min;
  }

  /**
    * @override
    * transform the  polygon to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    for(var i=0; i<this.points.length;i++){
      this.points[i].x = ((this.points[i].x )/this.scale.width) * width;
      this.points[i].y = ((this.points[i].y )/this.scale.height) * height;
    }
    var newxc = (this.origin.x/this.scale.width)*width;
    var newyc = (this.origin.y/this.scale.height)*height;
    this.position.x -= newxc - this.origin.x;
    this.position.y -= newyc - this.origin.y;
    this.center(newxc,newyc);
    //this.position.y -= (this.origin.y/this.scale.height)*height;
    this.scale = {width:this.width(),height:this.height()};
    this.bounderies = this.bounds();
    return this;
  }

  /**
    * transform the polygon to the given scale
    * @param {int} byX - increse/decrease in width.
    * @param {int} byY - increse/decrease in height.
  */
  resize(byX,byY){
    this.transform(this.scale.width+byX,this.scale.height+byY)
    return this;
  }

  /**
    * @override
    * sets the origin of the polygon to the given position
    * if called without parameters, it defaults to center of the object
    * @param {int} [x=width/2] - desired center in the x-cordinate.
    * @param {int} [y=height/2] - desired center in the y-cordinate.
  */
  center(x=(this.bounderies.left+this.bounderies.right)/2,y=(this.bounderies.top+this.bounderies.down)/2){
    this.origin = {x:x,y:y};
    return this;
  }
}
