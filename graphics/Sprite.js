class Sprite {
  /**
   * Represents a singular sprite with embedded physics.
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
  */
  constructor() {
    this.origin = {x:0,y:0};
    this.scale = {width:0,height:0};
    this.speed = {x:0,y:0};
    this.acceleration = {x:0,y:0};
    this.mass = 1;
  }

  /*
    * sets a singular resource location for the desired sprite
    * @param {string} url - locaiton of the image resource.
  */
  resource(url){
    this.image = new Array();
    var image = new Image();
    image.src = url;
    image.callback = this;
    image.onload = function(){
      if(this.callback.scale.width==0 && this.callback.scale.height==0 )
       this.callback.transform(this.width, this.height);
    }
    this.image.push(image);
    return this;
  }

  /*
    * @override
    * sets layered image resources for the desired sprite
    * @param {string[]} url - locaitons of the spritesheet.
  */
  resources(urls){
    this.image = new Array();
    for(var i=0;i<urls.length;i++){
      var image = new Image();
      image.src = urls[i];
      image.callback = this;
      image.onload = function(){
        if(this.callback.scale.width==0 && this.callback.scale.height==0 )
         this.callback.transform(this.width, this.height);
      }
      this.image.push(image);
    }
    return this;
  }

  /*
    * moves the  sprite to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
  */
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }

  /*
    * transform the  sprite to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }

  /*
    * rotates the  sprite by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    return this;
  }

  /*
    * sets the origin of the sprite to the given position
    * @param {int} x - anchor in the x position.
    * @param {int} x - anchor in the y position.
  */
  center(x,y){
    this.origin = {x:x,y:y};
    return this;
  }

  /*
    * sets the velocity of the sprite
    * @param {int} x - horizontal velocity component.
    * @param {int} y- vertical velocity component.
  */
  velocity(x,y){
    this.speed = {x:x,y:y};
    return this;
  }

  /*
    * increases the acceleration of the sprite
    * @param {int} x - horizontal acceleration component.
    * @param {int} y- vertical acceleration component.
  */
  accelerate(x,y){
    this.acceleration.x += x;
    this.acceleration.y += x;
    return this;
  }

  /*
    * applies a force to the sprite
    * @param {int} x - horizontal force component.
    * @param {int} y- vertical force component.
  */
  force(x,y){
    this.acceleration.x += (x/this.mass);
    this.acceleration.y += (y/this.mass);
    return this;
  }

  /*
    * sets the weight of the sprite
    * @param {int} x - weight to set.
  */
  weight(w){
    this.mass = w;
    return this;
  }

  /*
    * updates the sprite once
  */
  update(){
    this.speed = {x: this.speed.x + this.acceleration.x, y: this.speed.y + this.acceleration.y}
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
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
    for(var i=0;i<this.image.length;i++){
      c.drawImage(this.image[i],this.position.x,this.position.y,this.scale.width,this.scale.height);
    }
    c.restore();
  }
}
