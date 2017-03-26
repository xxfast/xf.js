/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an abstract polygon with n number of sides
*/

class Polygon extends GameObject {
  /**
    * Create an polygon with specified vertices
    * @param {[cordinates]]} points - array of sets of coordinates formated as {x:x,y;y}.
    */
  constructor(points=[{x:0,y:0}],color={fill:false,stroke:false}) {
    super();
    this.attach(new TransformablePolygon(this));
    this.attach(new CollidablePolygon(this));
    this.attach(new RotatablePolygon(this));
    this.points = points;
    this.color = color;
    //debug
    this.bounderies = this.bounds();
  }



  /**
    * @override
    * updates the sprite once
  */
  update(){ }

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
