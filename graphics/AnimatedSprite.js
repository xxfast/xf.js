class AnimatedSprite extends Sprite {
  constructor(){
    super();
    this.states = [];
  }

  /*
    * get the collision mask of the sprite
  */
  getCollisionMask(){
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = this.collider;
    var cs = this.states[0];
    context.drawImage(img,
                cs.cp[cs.frame].x,
                cs.cp[cs.frame].y,
                cs.fw,
                cs.fh,
                this.position.x,
                this.position.y,
                this.scale.width,
                this.scale.height);
    return context.getImageData(0, 0, this.scale.width,  this.scale.height);
  }

  /*
    * sets a spritesheet resource location for the desired sprite
    * @param {string} url - locaiton of the sprite sheet resource.
    * @param {int} nrows - number of rows in the sprite sheet.
    * @param {int} ncols -  number of colomns in the sprite sheet.
  */
  resource(name, urls, nr, nc, nf, sf, loop){
    var state = { id:name,    //unique name to identify each animation state
                  frame:sf,   //starting frame of the said state
                  layers:[],  //layers of spritesheet bitmap
                  nr:nr,      //number of rows in the sprite sheet.
                  nc:nc,      //number of colomns in the sprite sheet.
                  nf:nf,      //number of frames in this state
                  fw:0,       //frame width
                  fh:0,       //frame height
                  loop:loop,  //should animation loop?
                  cp:[]       //clipping positions : internal
              };
    for(var i=0;i<urls.length;i++){
      var image = new Image();
      image.src = urls[i];
      image.state = state;
      image.onload = function(){
        //frame width and height is decided from the base layer
        if(!this.state.fw) this.state.fw = this.width/this.state.nc;
        if(!this.state.fh) this.state.fh = this.height/this.state.nr;
        if(this.state.cp.length==0){
          for(var r = 0; r < nr; r++)
          	for(var c = 0; c < nc; c++)
          		state.cp.push({x:c*this.state.fw ,y:r*this.state.fh});
        }
      }
      state.layers.push(image);
      if(!this.collider) this.collider = image;
    }
    this.states.push(state);
    return this;
  }

  update(){
    super.update();
    var cs = this.states[0];
    cs.frame++;
    if(cs.frame>cs.nf-1){
      cs.frame = (cs.loop)?0:cs.nf-1;
    }
  }

  render(c){
    c.save();
    c.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    c.rotate(-this.rotation + Math.PI/2.0);
    c.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    var cs = this.states[0]; //current state
    for(var i=0;i<cs.layers.length;i++){
      c.drawImage(cs.layers[i],
                  cs.cp[cs.frame].x,
                  cs.cp[cs.frame].y,
                  cs.fw,
                  cs.fh,
                  this.position.x,
                  this.position.y,
                  this.scale.width,
                  this.scale.height);
    }
    if(this.debug.drawCollisionMask && this.collider){
      c.drawImage(this.collider,
                  cs.cp[cs.frame].x,
                  cs.cp[cs.frame].y,
                  cs.fw,
                  cs.fh,
                  this.position.x,
                  this.position.y,
                  this.scale.width,
                  this.scale.height);
    }
    c.restore();
  }
}
