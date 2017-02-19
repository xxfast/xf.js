/**
 * @abstract
 * Class representing an game object.
 */
 class GameObject {
   /**
     * Create an GameObject.
     * @param {string} id - name of the GameObject.
     * @param {number} [x=0] - x position.
     * @param {number} [y=0] - y position.
     * @param {int} [w=0] - desired width.
     * @param {int} [h=0] - desired height.
     */
  constructor(id="",x=0,y=0,w=0,h=0) {
      this.id = id;
      this.position = {x:x,y:y};
      this.scale = {width:w,height:h};
      this.origin = {x:0,y:0};
      this.rotation = 0;
      this.points = [];
      this.bounderies = {};
      this.debug = {};
  }

  /**
    * clones the object
    *   @returns {GameObject} cloned game object
  */
  clone(){
    return new GameObject(this.id,this.position.x,this.position.y,this.scale.width,this.scale.height);
  }

  /**
    * moves the  object to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
  */
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }

  /**
    * @virtual
    * transform the  object to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }

  /*
    * @abstract
    * calculate the bounds object of the GameObject
  */
  bounds() { throw new Error('must be implemented by subclass!'); }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree=0){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    var rads = -(degree * Math.PI)/180;
    this.points = [{x:0, y:0},
                  {x:+this.scale.width, y:0},
                  {x:+this.scale.width, y:+this.scale.height},
                  {x:0, y:0+this.scale.height} ];
    for (var i=0;i < this.points.length;i++) {
      var dx = this.points[i].x - this.origin.x;
      var dy = this.points[i].y - this.origin.y;
      this.points[i].x = (dx * Math.cos(rads) - dy * Math.sin(rads))+ this.origin.x;
      this.points[i].y = (dx * Math.sin(rads) + dy * Math.cos(rads))+ this.origin.y;
    }
    this.bounderies = this.bounds();
    return this;
  }

  /**
    * sets the origin of the object to the given position
    * if called without parameters, it defaults to center of the object
    * @param {int} [x=width/2] - anchor in the x position.
    * @param {int} [y=height/2] - anchor in the y position.
  */
  center(x=this.scale.width/2,y=this.scale.height/2){
    this.origin = {x:x,y:y};
    return this;
  }

  /**
    * Sees if one game object is within another sprite
    * @param {GameObject} obj - GameObject to see if this is within.
  */
  within(obj){
    if(this.rotation == 0 && obj.rotation == 0){
      if ((this.position.x > (obj.position.x+obj.scale.width)) ||( obj.position.x > (this.position.x+ this.scale.width)))
          return false;
      if ((this.position.y > (obj.position.y+obj.scale.height)) ||( obj.position.y > (this.position.y+ this.scale.height)))
          return false;
    }else{

    }
    return true;
  }


  /*
    * @abstract
    * updates the object
  */
  update() { throw new Error('must be implemented by subclass!'); }

  /*
    * @abstract
    * renders the GameObject on the given canvas
    * @param {int} c - the canvas to draw the GameObject on.
  */
  render(c) { throw new Error('must be implemented by subclass!'); }
}
