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
      this.components = [];
      this.vertices = [];
      this.bounderies = {};
      this.attach(new Identifiable(id));
      this.attach(new Movable());
      this.attach(new Transformable());
      this.debug = {enabled:false};
  }

  /**
    * clones the object
    *   @returns {GameObject} cloned game object
  */
  clone(){
    return new GameObject(this.id,this.position.x,this.position.y,this.scale.width,this.scale.height);
  }

  /**
    * attaches a particular behavior component to the game object
    * @param {Component} component - component to attach
  */
  attach(component){
    Object.assign(this,component);
    while (component = Reflect.getPrototypeOf(component)) {
      if(component == Object.prototype) break; // no need to redefine Object behavior
      let keys = Reflect.ownKeys(component)
      for(var i=1;i<keys.length;i++){
        Reflect.getPrototypeOf(this)[keys[i]] = component[keys[i]];
      }
    }
    return this;
  }

  /**
    * calculate the bounds object of the this sprite
    * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
  */
  bounds(){
    this.vertices = [{x:0, y:0},{x:+this.scale.width, y:0},
                   {x:+this.scale.width, y:+this.scale.height},{x:0, y:0+this.scale.height}];
    var rads = -(this.rotation * Math.PI)/180;
    for (var i=0;i < this.vertices.length;i++) {
     var dx = this.vertices[i].x - this.origin.x;
     var dy = this.vertices[i].y - this.origin.y;
     this.vertices[i].x = (dx * Math.cos(rads) - dy * Math.sin(rads))+ this.origin.x;
     this.vertices[i].y = (dx * Math.sin(rads) + dy * Math.cos(rads))+ this.origin.y;
    }
    var minx=this.vertices[0].x, miny=this.vertices[0].y;
    var maxx=this.vertices[0].x, maxy=this.vertices[0].y;
    for(var i=0;i<this.vertices.length;i++){
      if(this.vertices[i].x<minx) minx = this.vertices[i].x;
      if(this.vertices[i].y<miny) miny = this.vertices[i].y;
      if(this.vertices[i].x>maxx) maxx = this.vertices[i].x;
      if(this.vertices[i].y>maxy) maxy = this.vertices[i].y;
    }
    return {top:miny,right:maxx,down:maxy,left:minx};
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

  static debug(obj){
    for(var propt in obj.debug){
        obj.debug[propt] = !obj[propt] ;
    }
  }
}
