/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a camera that captures a scene.
*/
class Camera extends GameObject{
  /**
    * Create an Camera.
    * @param {string} [id] - name of the Camera.
    * @param {Scene} target - the scene the camera targted at.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,target,x,y,w,h) {
    super(id,target,x,y,w,h);
    this.target = target;
  }

  /**
    * targets the camera at the given scene
    * @param {Scene} target - the scene the camera targted at.
    */
  targets(scene){
    this.target = scene;
    return this;
  }

  /*
    * renders the camera itself
    * @param {context} c - the canvas to draw the camera on.
  */
  render(c){
    c.save();
    c.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    c.rotate(-this.rotation * Math.PI/180);
    c.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    c.fillStyle="black";
    c.font="12px Verdana";
    c.fillText(this.id,this.position.x, this.position.y- 5);
    c.strokeRect(this.position.x, this.position.y, this.scale.width, this.scale.height );
    c.restore();
  }

  /*
    * renders the containts within tha camera to the given canvas
    * @param {context} c - the canvas to draw the camera on.
  */
  capture(cc,c){
    var renderData = cc.getImageData(this.position.x, this.position.y, this.scale.width, this.scale.height);
    cc.putImageData(renderData,0,0);
  }
}
