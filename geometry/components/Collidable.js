/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a collidable behaviors like collideon, bounds for Polygons etc.
*/
class CollidablePolygon extends Component {
  constructor(owner) {
    super(owner);
  }

  /**
    * @override
    * calculate the bounds object of the this polygon
    * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
  */
  bounds(){
    var minx=this.points[0].x, miny=this.points[0].y;
    var maxx=this.points[0].x, maxy=this.points[0].y;
    for(var i=0;i<this.points.length;i++){
      if(this.points[i].x<minx) minx = this.points[i].x;
      if(this.points[i].y<miny) miny = this.points[i].y;
      if(this.points[i].x>maxx) maxx = this.points[i].x;
      if(this.points[i].y>maxy) maxy = this.points[i].y;
    }
    return {top:miny,right:maxx,down:maxy,left:minx};
  }

  /**
    * Sees if one game object is within another sprite
    * @param {GameObject} obj - GameObject to see if this is within.
  */
  within(obj){
    if(this.rotation == 0 && obj.rotation == 0){
      if ((this.position.x > (obj.position.x+obj.scale.width)) ||( obj.position.x > (this.position.x+ this.scale.width)))
          return false;
      if ((this.position.y > (obj.position.y+obj.scale.height)) ||( obj.position.y > (this.position.y+ this.scale.height)))
          return false;
    }
    return true;
  }
}
