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
  constructor(id,x=0,y=0,w=0,h=0) {
      this.components = {};
      this.vertices = [];
      this.bounderies = {};
      this.attach(new Identifiable(this,id));
      this.attach(new Movable(this));
      this.attach(new Transformable(this));
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
    var compfacade = {owner:component.owner};
    var reflected = component;
    while (reflected = Reflect.getPrototypeOf(reflected)) {
      if(reflected == Component.prototype) break; // base component act as an interface here
      if(reflected == Object.prototype) break; // no need to redefine Object behavior
      let keys = Reflect.ownKeys(reflected);
      for(var i=1;i<keys.length;i++){
        var keyname = keys[i];
        compfacade[keyname] = reflected[keys[i]];
        if(keyname=="process" || keyname=="render") continue;
        Reflect.getPrototypeOf(this)[keyname] = reflected[keys[i]];
      }
      this.components[reflected.constructor.name] =  compfacade;
    }
    return this;
  }

  /*
    * updates all the components of the given game object by one tick
  */
  update() {
    for (var component in this.components) {
      if (this.components.hasOwnProperty(component)) {
        var component = this.components[component];
        if(component.hasOwnProperty("process")){
          component.beforeProcess();
          if(component.shouldProcess()){
            component.process.call(this);
          }
        }
      }
    }
  }

  /*
    * renders the GameObject on the given canvas
    * @param {int} c - the canvas to draw the GameObject on.
  */
  render(c,camera) {
    for (var component in this.components) {
      if (this.components.hasOwnProperty(component)) {
        var component = this.components[component];
        if(component.hasOwnProperty("render")){
          component.beforeRender();
          if(component.shouldRender()){
            component.render.call(this,c,camera);
          }
        }
      }
    }
  }


}
