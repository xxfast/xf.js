/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an abstract polygon with n number of lines
*/

class Polygon extends GameObject {
  /**
    * Create an polygon with specified vertices
    * @param {[cordinates]]} points - array of sets of coordinates formated as {x:x,y;y}.
    */
  constructor(points=[],color={fill:false,stroke:false}) {
    super();
    this.points = points;
    this.translate(points[0].x,points[0].y);
    this.center(this.position.x,this.position.y);
    this.transform(this.width(),this.height());
    this.color = color;
    this.rotation = 0;
  }
  
  width(){
    var max=this.points[0].x, min=this.points[0].x;
    for(var i=0;i<this.points.length;i++){
      if(this.points[i].x>max) max = this.points[i].x;
      if(this.points[i].x<min) min = this.points[i].x;
    }
    return max-min;
  }

  height(){
    var max=this.points[0].y, min=this.points[0].y;
    for(var i=0;i<this.points.length;i++){
      if(this.points[i].y>max) max = this.points[i].y;
      if(this.points[i].y<min) min = this.points[i].y;
    }
    return max-min;
  }


  /**
    * moves the polygon to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
  */
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }

  /**
    * transform the  polygon to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }

  /**
    * sets the origin of the polygon to the given position
    * if called without parameters, it defaults to center of the object
  */
  center(x=this.scale.width/2,y=this.scale.height/2){
    this.origin = {x:x,y:y};
    return this;
  }

  /**
    * @override
    * rotates the points of the polygon around it's center by given amount of degrees
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @returns {Polygon} this - the object itself.
  */
  rotate(degree=0){
    var rads = (degree * Math.PI)/180;
    for (var point in this.points) {
      B.x = A.x * cos(rads) - A.y * sin(rads);
      B.y = A.x * sin(rads) + A.y * cos(rads);
    }
    return this;
  }
  /**
    * @override
    * renders the polygon on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @param {Camera} camera - the camera to look at the polygon from.
  */
  render(c,camera={position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{canvas:{width:1,height:1}}}){
    c.fillStyle = this.color.fill;
    c.beginPath();
    for(var i=0;i<this.points.length;i++){
      var xoffset =  ((this.position.x + this.points[i].x/camera.scale.width) * camera.target.canvas.width);
      var xcoffset = ((camera.position.x/camera.scale.width) * camera.target.canvas.width);
      var yoffset = ((this.position.y + this.points[i].y/camera.scale.height) * camera.target.canvas.height);
      var ycoffset = ((camera.position.y/camera.scale.height)* camera.target.canvas.height);
      if(i==0) c.moveTo(xoffset-xcoffset, yoffset-ycoffset);
      else c.lineTo(xoffset-xcoffset, yoffset-ycoffset);
    }
    c.closePath();
    c.fill();
    c.strokeStyle = this.color.stroke;
    c.stroke();
    if(this.debug){
      c.strokeStyle="red";
      if(this.debug.drawBounds) c.strokeRect(this.position.x, this.position.y, this.scale.width, this.scale.height ); // draw the bounding boxes
      if(this.debug.drawCenter){
        c.strokeStyle="yellow";
        c.strokeRect(this.position.x + this.origin.x - 2, this.position.y + this.origin.y - 2, 4,4 ); // draw the bounding boxes
      }
    }
  }
}
