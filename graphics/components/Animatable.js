/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a animatable behaviors like animate, play etc.
*/
class Animatable extends Component {
  constructor() {
    super();
    this.states = [];
    this.current= 0;
    this.fpt = 1;
  }

  /**
    * returns the current state the sprite is in
    *   @returns {state} current state
  */
  state() {
    return this.states[this.current];
  }

  /**
    * set the current state of the animation
    *   @param {string} id - unique name of the animation to go to
    *   @returns {Sprite} itself
  */
  goto(id){
    for(var i=0;i<this.states.length;i++){
      if(this.states[i].id==id){
        this.current = i;
        break;
      }
    }
    return this;
  }

  /**
    * plays the animation associated in the state (if any)
    *   @param {string} fpt - sets the speed of playback [<0=slowmotion, 0=stopped, 1=normal, 1>=fastmotion]
    *   @returns {Sprite} itself
  */
  play(fpt=1){
    this.fpt = fpt;
    return this;
  }

  /**
    * stops the animation associated in the state (if any)
    *   @returns {Sprite} itself
  */
  stop(){
    this.fpt = 0;
    return this;
  }

  /**
    * rewinds the animation associated in the state (if any)
    * rewinds to the start by default.
    *   @param {in} [to=0] - sets the frame to rewind to
    *   @returns {Sprite} itself
  */
  rewind(to=0){
    this.state().frame=to;
    return this;
  }

  /**
    * sets a static layered image resources for the desired sprite
    * important ! - the last last layer renders on top
    * important ! - the first layer will be used as the collision mask by defult
    *   @param {string[]} url - location of the images layer by layer.
    *   @returns {Sprite} itself
  */
  source(urls){
    return this.animate("default",urls,1,1,1,1,0);
  }

  /**
  * sets animated spritesheet resources for the desired sprite
  * important ! - the last last layer renders on top
  * important ! - the first layer will be used as the collision mask by defult
  *   @param {string} name -  unique name to identify each animation state
  *   @param {string[]} urls - location(s) of the spritesheet images layer by layer.
  *   @param {int} nr - number of rows in the spritesheet
  *   @param {int} nc - number of colomns in the spritesheet
  *   @param {string} sf -  starting frame of the said state
  *   @param {int} repeat - times should the animation repeat [-1: repeat forever, 0:don't animate , 1:repeat once ...]
  *   @returns {Sprite} itself
  */
  animate(name, urls, nr, nc, nf, sf, repeat){
    var state = { id:name,frame:sf,layers:[], nr:nr, nc:nc, nf:nf, fw:0,fh:0,repeat:repeat,cp:[], collider:null};
    for(var i=0;i<urls.length;i++){
      var image = new Image();
      image.src = urls[i];
      image.state = state;
      image.callback = this;
      image.state = state;
      image.onload = function(){
        //frame width, height, and clipping points is decided from the base layer
        if(!this.state.fw) this.state.fw = this.width/this.state.nc;
        if(!this.state.fh) this.state.fh = this.height/this.state.nr;
        if(this.state.cp.length==0){
          for(var r = 0; r < nr; r++)
          	for(var c = 0; c < nc; c++)
          		state.cp.push({x:c*this.state.fw ,y:r*this.state.fh});
        }
        this.callback.bounderies = this.callback.bounds();
        //by default, the collider for the state will be the base layer
        if(!this.state.collider) this.state.collider = this;
        //by default, if no scale is provided, scale will be set to base layers dimentions.
        if(this.callback.scale.width==0 && this.callback.scale.height==0){
          this.callback.transform(this.width, this.height);
        }
      }
      state.layers.push(image);
    }
    this.states.push(state);
    this.goto(name);
    return this;
  }

  /*
    * defines how the component state change on one update
  */
  process(){
    if(this.state().repeat>=1 || this.state().repeat<0){
      this.state().frame+= this.fpt;
      if(this.state().frame>this.state().nf-1){
        this.state().frame = 0;
        this.state().repeat--;
      }else if(this.state().frame < 0){
        this.state().frame = this.state().nf-1;
      }
    }
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
