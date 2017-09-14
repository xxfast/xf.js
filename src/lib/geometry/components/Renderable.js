import {Component} from '../../core/components/Component'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
export class RenderablePolygon extends Component {
  constructor(owner) {
    super(owner);
  }

  /**
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

  }
}
