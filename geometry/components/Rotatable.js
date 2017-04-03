/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotation for Polygons etc.
*/
class RotatablePolygon extends Component {
  constructor(owner) {
    super(owner);
    this.rotation = 0;
  }

  /**
    * @override
    * rotates the points of the polygon around it's center by given amount of degrees
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @returns {Polygon} this - the object itself.
  */
  rotate(degree=0){
    //super.rotate(degree);
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    var rads = -(degree * Math.PI)/180;
    for (var i=0;i < this.points.length;i++) {
      var dx = this.points[i].x - this.origin.x;
      var dy = this.points[i].y - this.origin.y;
      this.points[i].x = (dx * Math.cos(rads) - dy * Math.sin(rads))+ this.origin.x;
      this.points[i].y = (dx * Math.sin(rads) + dy * Math.cos(rads))+ this.origin.y;
    }
    if(this.bounds) this.bounderies = this.bounds();
    this.scale = {width:this.bounderies.right-this.bounderies.left,height:this.bounderies.down-this.bounderies.top};
    return this;
  }
}
