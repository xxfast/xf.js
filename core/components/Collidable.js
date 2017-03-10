/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a collidable behaviors like collideon, bounds etc.
*/
class Collidable {
  constructor() {
    this.vertices = [];
    this.bounderies = {};
  }

  /**
    * calculate the bounds object of the this sprite
    * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
  */
  bounds(){
    this.vertices = [{x:0, y:0},{x:+this.scale.width, y:0},
                   {x:+this.scale.width, y:+this.scale.height},{x:0, y:0+this.scale.height}];
    var rads = -(this.rotation * Math.PI)/180;
    for (var i=0;i < this.vertices.length;i++) {
     var dx = this.vertices[i].x - this.origin.x;
     var dy = this.vertices[i].y - this.origin.y;
     this.vertices[i].x = (dx * Math.cos(rads) - dy * Math.sin(rads))+ this.origin.x;
     this.vertices[i].y = (dx * Math.sin(rads) + dy * Math.cos(rads))+ this.origin.y;
    }
    var minx=this.vertices[0].x, miny=this.vertices[0].y;
    var maxx=this.vertices[0].x, maxy=this.vertices[0].y;
    for(var i=0;i<this.vertices.length;i++){
      if(this.vertices[i].x<minx) minx = this.vertices[i].x;
      if(this.vertices[i].y<miny) miny = this.vertices[i].y;
      if(this.vertices[i].x>maxx) maxx = this.vertices[i].x;
      if(this.vertices[i].y>maxy) maxy = this.vertices[i].y;
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
    }else{

    }
    return true;
  }
}
