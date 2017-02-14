/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single scene that contains child sprite elements
*/
class Scene extends GameObject{
  /**
    * Create an Scene.
    * @param {string} id - name of the Scene.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,bg="white",w,h) {
    super(id,0,0,w,h);
    this.elements = [];
    this.background = bg;
    this.canvas = 0;
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

  /**
    * renders the scene on the given canvas,
    * if a camera is proviced, then as seen from the given camera
    * @param {context} c - the canvas to draw the scene on.
    * @param {Camera} camera - the camera to look at the scene from.
  */
  render(c,camera=false){
    this.canvas = c.canvas;
    this.clear(c);
    for(var i=0; i<this.elements.length; i++){
      var s = this.elements[i];
      if(!camera || s.within(camera)){
        this.elements[i].render(c,camera || undefined);
      }
    }
  }

  /**
    * clear the rendered patch for the scene
    */
  clear(c){
    c.fillStyle=this.background;
    c.clearRect(0, 0, this.scale.width, this.scale.height);
    c.fillRect(0, 0, this.scale.width, this.scale.height );
  }
}
