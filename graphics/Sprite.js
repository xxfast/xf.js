class Sprite {
  /** @description
   * Represents a singular sprite with embedded physics.
   * @constructor
  */
  constructor() {
    this.position = {x:0,y:0};
    this.origin = {x:0,y:0};
    this.scale = {width:0,height:0};
    this.speed = {x:0,y:0};
    this.acceleration = {x:0,y:0};
    this.mass = 1;
    this.debug = { drawCollisionMask:0 };
    this.image = [];
    this.states = [];
    this.fpt = 1;
  }

    * sets layered image resources for the desired sprite
  /**
    * returns the current state the sprite is in
  */
  state() { return this.states[0]; }

  /**
    * set the current state of the animation
    *   @param {string} id - unique name of the animation to go to
  */
  goto(state){
    if(this.states.length==1) return this;
    for(var i=0; i<this.states.length; i++){
      if(this.states[i].id==state){
        this.states.unshift(this.states.splice(i,1));
        break;
      }
    }
    return this;
  }

  /**
  play(fpt=1){
    this.fpt = fpt;
    return this;
  }

  /**
  /**
    * important ! - the last last layer renders on top
    * important ! - the first layer will be used as the collision mask by defult
    *   @param {string[]} url - location of the images layer by layer.
  */
  source(urls){
    var state = { id:"default", layers:[] };
    for(var i=0;i<urls.length;i++){
      var image = new Image();
      image.src = urls[i];
      image.callback = this;
      image.onload = function(){
        if(this.callback.scale.width==0 && this.callback.scale.height==0 )
         this.callback.transform(this.width, this.height);
      }
      state.layers.push(image);
      this.states.push(state);
      if(!this.collider) this.collider = image;
    }
    return this;
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
  */
  animate(name, urls, nr, nc, nf, sf, repeat){
    var state = { id:name,frame:sf,layers:[], nr:nr, nc:nc, nf:nf, fw:0,fh:0,repeat:repeat,cp:[]};
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

  /**
    * moves the  sprite to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
  */
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }

  /**
    * transform the  sprite to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }

  /**
    * rotates the  sprite by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    return this;
  }

  /**
    * sets the origin of the sprite to the given position
    * @param {int} x - anchor in the x position.
    * @param {int} x - anchor in the y position.
  */
  center(x,y){
    this.origin = {x:x,y:y};
    return this;
  }

  /**
    * sets the velocity of the sprite
    * @param {int} x - horizontal velocity component.
    * @param {int} y- vertical velocity component.
  */
  velocity(x,y){
    this.speed = {x:x,y:y};
    return this;
  }

  /**
    * increases the acceleration of the sprite
    * @param {int} x - horizontal acceleration component.
    * @param {int} y- vertical acceleration component.
  */
  accelerate(x,y){
    this.acceleration.x += x;
    this.acceleration.y += y;
    return this;
  }

  /**
    * applies a force to the sprite
    * @param {int} x - horizontal force component.
    * @param {int} y- vertical force component.
  */
  force(x,y){
    this.acceleration.x += (x/this.mass);
    this.acceleration.y += (y/this.mass);
    return this;
  }

  /**
    * sets the weight of the sprite
    * @param {int} x - weight to set.
  */
  weight(w){
    this.mass = w;
    return this;
  }

  /**
    * @author Joseph Lenton - PlayMyCode.com
    * sets the collision mask of the sprite
    * @param {string} mask - url of the mask to set.
  */
  collideon(mask){
    var image = new Image();
    image.src = mask;
    this.collider = image;
    return this;
  }

  /**
    * get the collision mask of the sprite
  */
  getCollisionMask(){
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = this.collider;
    // context.save();
    // context.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    // context.rotate(-this.rotation + Math.PI/2.0);
    // context.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    context.drawImage(img, 0, 0, this.scale.width, this.scale.height);
    return context.getImageData(0, 0, this.scale.width,  this.scale.height);
  }

  /**
   * @param {string} sprite - Sprite object this object colliding with.
   */
  colliding(sprite){
      // we need to avoid using floats, as were doing array lookups
      var x  = Math.round( this.position.x ),
          y  = Math.round( this.position.y ),
          x2 = Math.round( sprite.position.x ),
          y2 = Math.round( sprite.position.y );


      var w  = this.scale.width,
          h  = this.scale.height,
          w2 = sprite.scale.width,
          h2 = sprite.scale.height ;

      var rads = this.rotation * Math.PI/180;
      var c = Math.abs(Math.cos(rads));
      var s = Math.abs(Math.sin(rads));
      w =  h * s + w * c;
      h = h * c + w * s ;
      w2 =  h2 * s + w2 * c;
      h2 = h2 * c + w2 * s ;

      //console.log(w,h,w2,h2);

       w  = this.scale.width,
          h  = this.scale.height,
          w2 = sprite.scale.width,
          h2 = sprite.scale.height ;
      // find the top left and bottom right corners of overlapping area
      var xMin = Math.max( x, x2 ),
          yMin = Math.max( y, y2 ),
          xMax = Math.min( x+w, x2+w2 ),
          yMax = Math.min( y+h, y2+h2 );

      // Sanity collision check, we ensure that the top-left corner is both
      // above and to the left of the bottom-right corner.
      if ( xMin >= xMax || yMin >= yMax ) {
          return false;
      }

      var xDiff = xMax - xMin,
          yDiff = yMax - yMin;

      // get the pixels out from the images
      var pixels  = this.getCollisionMask().data,
      pixels2 = sprite.getCollisionMask().data;

      // if the area is really small,
      // then just perform a normal image collision check
      if ( xDiff < 4 && yDiff < 4 ) {
          for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
              for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                  if (
                          ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                          ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                  ) {
                      return true;
                  }
              }
          }
      } else {
          /* What is this doing?
           * It is iterating over the overlapping area,
           * across the x then y the,
           * checking if the pixels are on top of this.
           *
           * What is special is that it increments by incX or incY,
           * allowing it to quickly jump across the image in large increments
           * rather then slowly going pixel by pixel.
           *
           * This makes it more likely to find a colliding pixel early.
           */

          // Work out the increments,
          // it's a third, but ensure we don't get a tiny
          // slither of an area for the last iteration (using fast ceil).
          var incX = xDiff / 3.0,
              incY = yDiff / 3.0;
          incX = (~~incX === incX) ? incX : (incX+1 | 0);
          incY = (~~incY === incY) ? incY : (incY+1 | 0);

          for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
              for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                  for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                      for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                          if (
                                  ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                  ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                          ) {
                              return true;
                          }
                      }
                  }
              }
          }
      }

      return false;
  }

  /**
    * updates the sprite once
  */
  update(){
    this.speed = {x: this.speed.x + this.acceleration.x, y: this.speed.y + this.acceleration.y}
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //frame control

    if(this.state().repeat>=1 || this.state().repeat<0){
      this.state().frame+= this.fpt;
      if(this.state().frame>this.state().nf-1){
        this.state().frame = 0;
        this.state().repeat--;
      }
    }
  }

  /*
    * renders the sprite on the given canvas
    * @param {int} c - the canvas to draw the sprite on.
  */
  render(c){
    c.save();
    c.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    c.rotate(-this.rotation + Math.PI/2.0);
    c.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    for(var i=0;i<this.state().layers.length;i++){
      if(!this.state().hasOwnProperty('frame')) c.drawImage(this.state().layers[i],this.position.x,this.position.y,this.scale.width,this.scale.height);
      else c.drawImage(this.state().layers[i],this.state().cp[Math.round(this.state().frame)].x, this.state().cp[Math.round(this.state().frame)].y,this.state().fw,this.state().fh,this.position.x,this.position.y,this.scale.width,this.scale.height);
    }
    if(this.debug.drawCollisionMask && this.collider){
      c.drawImage(this.collider,this.position.x,this.position.y,this.scale.width,this.scale.height);
    }
    c.restore();
  }
}
