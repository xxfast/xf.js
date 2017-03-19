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
      this.components = {};
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
    *   @returns {GameObject} itself
  */
  attach(component){
    Object.assign(this,component);
    while (component = Reflect.getPrototypeOf(component)) {
      var compfacade = {};
      if(component == Object.prototype) break; // no need to redefine Object behavior
      let keys = Reflect.ownKeys(component);
      for(var i=1;i<keys.length;i++){
        var keyname = keys[i];
        Reflect.getPrototypeOf(this)[keyname] = component[keys[i]];
        compfacade[keyname] = Reflect.getPrototypeOf(this)[keyname];
      }
      this.components[component.constructor.name] =  compfacade;
    }
    return this;
  }

  /*
    * updates all the components of the given game object by one tick
  */
  update() {
    for (var component in this.components) {
      if (this.components.hasOwnProperty(component)) {
        if(this.components[component].hasOwnProperty("tick")){
          this.components[component].tick.call(this);
        }
      }
    }
  }

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
