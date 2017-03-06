/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an abstract polygon with n number of sides
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
    this.scale = {width: this.width(),height:this.height()};
    this.bounderies = this.bounds();
    this.color = color;
    this.rotation = 0;
    //debug
    this.debug.drawBounds = false;
    this.debug.drawCenter = false;
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

  /**
    * @override
    * rotates the points of the polygon around it's center by given amount of degrees
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @returns {Polygon} this - the object itself.
  */
  rotate(degree=0){
    super.rotate(degree);
    var rads = -(degree * Math.PI)/180;
    for (var i=0;i < this.points.length;i++) {
      var dx = this.points[i].x - this.origin.x;
      var dy = this.points[i].y - this.origin.y;
      this.points[i].x = (dx * Math.cos(rads) - dy * Math.sin(rads))+ this.origin.x;
      this.points[i].y = (dx * Math.sin(rads) + dy * Math.cos(rads))+ this.origin.y;
    }
    this.scale = {width:this.width(),height:this.height()};
    this.bounderies = this.bounds();
    return this;
  }
  /**
    * @override
    * updates the sprite once
  */
  update(){
  }

  /**
    * @override
    * renders the polygon on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @param {Camera} camera - the camera to look at the polygon from.
  */
  render(c,camera={position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}){
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var cwratio =  camera.target.scene.canvas.width/camera.scale.width ;
    var chratio =  camera.target.scene.canvas.height/camera.scale.height ;
    var xcoffset = ((camera.position.x/camera.scale.width) * camera.target.scene.canvas.width);
    var ycoffset = ((camera.position.y/camera.scale.height)* camera.target.scene.canvas.height);
    var xoffset, yoffset;
    c.beginPath();
    for(var i=0;i<this.points.length;i++){
      xoffset =  (((this.position.x + this.points[i].x)/camera.scale.width) * camera.target.scene.canvas.width);
      yoffset = (((this.position.y + this.points[i].y)/camera.scale.height) * camera.target.scene.canvas.height);
      if(i==0) c.moveTo(xoffset-xcoffset, yoffset-ycoffset);
      else c.lineTo(xoffset-xcoffset, yoffset-ycoffset);
    }
    xoffset = this.position.x * cwratio; // ((this.position.x/camera.scale.width) * camera.target.scene.canvas.width);
    yoffset = this.position.y * cwratio; // ((this.position.y/camera.scale.height) * camera.target.scene.canvas.height);
    c.closePath();
    c.fillStyle = this.color.fill;
    if (this.color.fill) c.fill();
    c.strokeStyle = this.color.stroke;
    if (this.color.stroke) c.stroke();
    if(this.debug){
      if(this.debug.drawBounds){
        c.strokeStyle="red";
        var xboffset = ((this.position.x+this.bounderies.left)*cwratio);
        var yboffset = ((this.position.y+this.bounderies.top)*chratio);
        c.strokeRect((xboffset-xcoffset),(yboffset-ycoffset),this.scale.width*cwratio,this.scale.height*chratio); // draw the bounding boxes
      }
      if(this.debug.drawCenter){
        c.fillStyle="yellow";
        var xooffset = ((this.position.x+ this.origin.x - 2)*cwratio);
        var yooffset = ((this.position.y+ this.origin.y - 2)*chratio);
        c.fillRect((xooffset-xcoffset) , (yooffset-ycoffset), 4,4 ); // draw the bounding boxes
      }
    }
  }
}
