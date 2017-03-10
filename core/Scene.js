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
    * @param {int} [h=0] - desired height.
    */
  constructor(id,bg="white",w,h,canvas=null) {
    super(id,0,0,w,h);
    this.elements = [];
    this.background = bg;
    this.canvas = canvas;
    this.debug.show = false;
  }

  /*
    * renders the scene on the given canvas
    * @param {Sprite} sprite - the canvas to draw the scene on.
    *   @returns {Sprite} itself
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
    * @param {Camera} [camera=false] - the camera to look at the scene from.
  */
  render(c,camera=false){ // {position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}
    this.canvas = c.canvas;
    this.clear(c);
    c.save();
    //c.translate(-camera.position.x + camera.origin.x, -camera.position.y + camera.origin.y);
    // c.translate(((camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    c.rotate(-(camera.rotation) * Math.PI/180);
    // c.translate(((-camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((-camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    //c.translate(camera.position.x - camera.origin.x, camera.position.y - camera.origin.y);
    for(var i=0; i<this.elements.length; i++){
      var s = this.elements[i];
      if(!camera || s.within(camera)){
        this.elements[i].render(c,camera || undefined);
      }
    }
    c.rotate((camera.rotation) * Math.PI/180);
    if(this.debug.show){
        var i = 0;
        c.fillStyle="white";
        c.fillRect(-1,-1,100,Object.keys(this.debug).length*12+5);
        for(var prop in this.debug){
          c.fillStyle="black";
          c.font="12px Helvatica";
          c.fillText(prop + ': ' + this.debug[prop], 5, (++i)*12);
        }
        //c.strokeRect(-1,-1,100,i*12+5);
    }
  }

  /**
    * clear the rendered patch for the scene
    * @param {context} c - the canvas to clear the canvas scene on.
    */
  clear(c){
    c.fillStyle=this.background;
    c.clearRect(0, 0, this.scale.width, this.scale.height);
    c.fillRect(0, 0, this.scale.width, this.scale.height );
  }
}
