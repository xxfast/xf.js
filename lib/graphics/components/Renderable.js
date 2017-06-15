/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
class RenderableSprite extends Component {
  constructor(owner) {
    super(owner);
  }

  /*
    * renders the sprite on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the sprite on.
    *   @param {Camera} camera - the camera to look at the sprite from.
  */
  render(c,camera={position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}){
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var rxoffset = (Math.cos(camera.rotation+this.rotation));
    var ryoffset = (Math.sin(camera.rotation+this.rotation));
    var xoffset =  ((this.position.x/camera.scale.width) * cwidth);
    var xcoffset = ((camera.position.x/camera.scale.width) * cwidth);
    var yoffset = ((this.position.y/camera.scale.height) * cheight);
    var ycoffset = ((camera.position.y/camera.scale.height)* cheight);
    c.save();
    c.translate(((this.position.x+this.origin.x-camera.position.x)/camera.scale.width)*cwidth, ((this.position.y+this.origin.y-camera.position.y)/camera.scale.height)*cheight);
    c.rotate(-(this.rotation) * Math.PI/180);
    c.translate(((-this.position.x-this.origin.x+camera.position.x)/camera.scale.width)*cwidth, ((-this.position.y-this.origin.y+camera.position.y)/camera.scale.height)*cheight);
    for(var i=0;i<this.state().layers.length;i++){
      var args = [this.state().layers[i]];
      if(this.state().hasOwnProperty('frame')){
        var frame = Math.round(this.state().frame);
        args.push((this.state().cp[frame] || {x:0}).x, // clipping x position of sprite cell
                  (this.state().cp[frame] || {y:0}).y, // clipping y position of sprite cell
                  Math.max(1, Math.floor(this.state().fw)),  // width of sprite cell
                  Math.max(1, Math.floor(this.state().fh))); // height of sprite cell
      }
      args.push( xoffset - xcoffset, // x position to render
                 yoffset - ycoffset, // y position to render
                (this.scale.width/camera.scale.width)* cwidth, // height to render
                (this.scale.height/camera.scale.height)* cheight); // width to render
      c.drawImage(...args);
    }
    c.restore();
  }
}
