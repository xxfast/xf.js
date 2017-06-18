import {GameObject} from '../core/GameObject'
import {Rotatable} from '../core/components/Rotatable'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a camera that captures a scene.
*/
export class Camera extends GameObject{
  /**
    * Create an Camera.
    * @param {string} [id] - name of the Camera.
    * @param {Scene} target - the scene the camera targted at.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,scene,x,y,w,h) {
    super(id,x,y,w,h);
    this.attach(new Rotatable(this));
    this.target = {scene:scene,object:false};
    this.options = {contained:true};
  }

  /**
    * targets the camera at the given scene
    * @param {Scene} target - the scene the camera targted at.
    *   @returns {Camera} itself
    */
  targets(scene){
    this.target.scene = scene;
    return this;
  }

  /**
    * camera tracks the given object
    * @param {GameObject} object - the object the camera starts tracking.
    *   @returns {Camera} itself
    */
  tracks(object){
    this.target.object = object;
    return this;
  }

  /**
    * camera zooms in to, and keeps the constain ratio if enabled
    * @param {int} amount - amount to zoom in on.
    * @param {bool} keepRatio - should the camera keep constent ratio while zooming.
    *   @returns {Camera} itself
    */
  zoom(amount, keepRatio=true){
    var owidth = this.scale.width, oheight = this.scale.height;
    var ratio = this.scale.width / this.scale.height;
    for(var i=0;i<Math.abs(amount);i++) {
      this.scale.width = this.scale.width - (Math.sign(amount) * Math.abs(amount));
      this.scale.height =  (keepRatio)?(this.scale.width/ratio) : this.scale.height- Math.sign(amount);
    }
    //recentering the origin ? shouldn't this be done by parent?
    this.origin.x = (this.origin.x / owidth) * this.scale.width;
    this.origin.y = (this.origin.y / oheight) * this.scale.height;
    return this;
  }


  /*
    * renders the containts within tha camera to the given canvas
    * @param {context} c - the canvas to draw the camera on.
  */
  capture(cc,c){
    var renderData = cc.getImageData(this.position.x, this.position.y, this.scale.width, this.scale.height);
    cc.putImageData(renderData,0,0);
  }

  /**
    * converts camera relative position to absolute position
    * @param {x:y:} relative - position witin the camera.
    *  @return {x:y:} absolute - absolute position
  */
  absolute(relative){
    var xratio = this.target.scene.canvas.width / this.scale.width;
    var yratio = this.target.scene.canvas.height / this.scale.height;
    return {x:(this.position.x+(relative.x/xratio)) ,
            y:(this.position.y+(relative.y/yratio))};
  }

  /**
    * converts camera relative position to absolute position
    * @param {x:y:} relative - position witin the camera.
    *  @return {x:y:} absolute - absolute position
  */
  relative(absolute){
    return {x:absolute.x-this.position.x,y:absolute.y-this.position.y};
  }

  /**
    * updates the camera just once
  */
  update(){
    if(this.target.object){
      this.translate(this.target.object.position.x + this.target.object.origin.x  - this.origin.x ,
                     this.target.object.position.y + this.target.object.origin.y - this.origin.y);
    }
  }

  /**
    * renders the camera itself
    * @param {context} c - the canvas to draw the camera on.
  */
  render(c){
    c.save();
    c.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    c.rotate(-this.rotation * Math.PI/180);
    c.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    c.strokeStyle="black";
    c.font="12px Verdana";
    c.fillStyle = "black"
    c.fillText(this.id,this.position.x, this.position.y- 5);
    c.strokeRect(this.position.x, this.position.y, this.scale.width, this.scale.height );
    c.fillStyle="yellow";
    c.fillRect(this.position.x+this.origin.x-2, this.position.y+this.origin.y-2,4,4);
    c.restore();
  }


}
