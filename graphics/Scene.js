class Scene {
  /** @description
   * Represents a single scene.
  */

  constructor(id,bg="white",width,height) {
    this.id = id;
    this.elements = [];
    this.background = bg;
    this.scale = {width:width, height:height};
  }

  /*
    * renders the scene on the given canvas
    * @param {Sprite} sprite - the canvas to draw the scene on.
  */
  add(s){
    for (var i = 0; i < arguments.length; i++ ) {
       this.elements.push(arguments[i]);
    }
    return this;
  }

  /*
    * removes a sprite from the scene
    * @param {Sprite} sprite - the canvas to draw the scene on.
  */
  remove(sprite){
    this.elements = this.elements.filter(item => item !== sprite);
    return this;
  }

  /**
    * updates the scene once
  */
  update(){
    for(var i=0; i<this.elements.length; i++){
      this.elements[i].update();
    }
  }

  /*
    * renders the scene on the given canvas
    * @param {context} c - the canvas to draw the scene on.
  */
  render(c){
    cc.fillStyle=this.background;
    cc.clearRect(0, 0, this.scale.width, this.scale.height);
    cc.fillRect(0, 0, this.scale.width, this.scale.height );
    for(var i=0; i<this.elements.length; i++){
      this.elements[i].render(c);
    }
  }
}
