/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a singular sprite with embedded physics.
 * @extends Object
*/
class Sprite extends GameObject{
  /**
    * Create an Sprite.
    * @param {string} id - name of the Sprite.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id,x,y,w,h) {
    super(id,x,y,w,h);
    this.attach(new Rotatable());
    this.attach(new Collidable());
    this.attach(new Animatable());

    /* debug */
    {
      this.debug.drawCollisionMask = true;
      this.debug.drawBounds = true;
      this.debug.drawCenter = true;
      this.debug.drawContainer = true;
    };
  }

  /**
    *clones the object
    * @returns {Sprite} cloned
  */
  clone(){
    var toReturn = new Sprite(this.id,this.position.x,this.position.y,this.scale.width,this.scale.height);
    toReturn.speed = {x:this.speed.x,y:this.speed.y};
    toReturn.acceleration = {x:this.acceleration.x,y:this.acceleration.y};
    toReturn.mass = this.mass;
    toReturn.debug = { drawCollisionMask:this.debug.drawCollisionMask};
    toReturn.states = this.states; //shallow
    toReturn.fpt = this.fpt;
    return toReturn;
  }


  /**
    * sets a static layered image resources for the desired sprite
    * important ! - the last last layer renders on top
    * important ! - the first layer will be used as the collision mask by defult
    *   @param {string[]} url - location of the images layer by layer.
    *   @returns {Sprite} itself
  */
  source(urls){
    return this.animate("default",urls,1,1,1,1,0);
  }

  /*
    * renders the sprite on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the sprite on.
    *   @param {Camera} camera - the camera to look at the sprite from.
  */
  render(c,camera={position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}){
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var rxoffset = (Math.cos(camera.rotation+this.rotation));
    var ryoffset = (Math.sin(camera.rotation+this.rotation));
    var xoffset =  ((this.position.x/camera.scale.width) * cwidth);
    var xcoffset = ((camera.position.x/camera.scale.width) * cwidth);
    var yoffset = ((this.position.y/camera.scale.height) * cheight);
    var ycoffset = ((camera.position.y/camera.scale.height)* cheight);
    c.save();
    c.translate(((this.position.x+this.origin.x-camera.position.x)/camera.scale.width)*cwidth, ((this.position.y+this.origin.y-camera.position.y)/camera.scale.height)*cheight);
    c.rotate(-(this.rotation) * Math.PI/180);
    c.translate(((-this.position.x-this.origin.x+camera.position.x)/camera.scale.width)*cwidth, ((-this.position.y-this.origin.y+camera.position.y)/camera.scale.height)*cheight);
    for(var i=0;i<this.state().layers.length;i++){
      var args = [this.state().layers[i]];
      if(this.state().hasOwnProperty('frame'))
        args.push((this.state().cp[Math.round(this.state().frame)] || {x:0}).x, // clipping x position of sprite cell
                  (this.state().cp[Math.round(this.state().frame)] || {y:0}).y, // clipping y position of sprite cell
                  this.state().fw,  // width of sprite cell
                  this.state().fh); // height of sprite cell
      args.push( xoffset - xcoffset, // x position to render
                 yoffset - ycoffset, // y position to render
                (this.scale.width/camera.scale.width)* cwidth, // height to render
                (this.scale.height/camera.scale.height)* cheight); // width to render
      c.drawImage(...args);
    }
    c.restore();
    if(this.debug.enabled){
      if(this.debug.drawCenter){
        c.fillStyle="yellow";
        var cpxoffset = (((this.position.x + this.origin.x - 2 )/camera.scale.width) * cwidth);
        var cpyoffset = (((this.position.y + this.origin.y - 2)/camera.scale.height) * cheight);
        c.fillRect((cpxoffset - xcoffset) , (cpyoffset - ycoffset), 4,4 ); // draw the bounding boxes
      }
      if(this.debug.drawContainer){
        c.strokeStyle="green";
        c.beginPath();
        var xpoffset = ((this.position.x + this.vertices[0].x)/camera.scale.width)* cwidth;
        var ypoffset = ((this.position.y + this.vertices[0].y)/camera.scale.height)* cheight;
        c.moveTo( xpoffset - xcoffset, ypoffset - ycoffset);
        for(var i=0;i<this.vertices.length;i++){
          xpoffset = ((this.position.x + this.vertices[i].x)/camera.scale.width)* cwidth;
          ypoffset = ((this.position.y + this.vertices[i].y)/camera.scale.height)* cheight;
          c.lineTo( xpoffset - xcoffset, ypoffset - ycoffset);
        }
        c.closePath();
        c.stroke();
      }
      if(this.debug.drawBounds){
        c.strokeStyle="red";
        c.strokeRect((xoffset - xcoffset)+this.bounderies.left,
                     (yoffset - ycoffset)+this.bounderies.top,
                     ((this.bounderies.right-this.bounderies.left)/camera.scale.width)* cwidth,
                     ((this.bounderies.down-this.bounderies.top)/camera.scale.height)* cheight); // draw the bounding boxes
      }
      if(this.debug.drawCollisionMask && this.state().collider){
          // c.drawImage(this.state().collider,(xoffset - xcoffset)+this.bounderies.left,
          //            (yoffset - ycoffset)+this.bounderies.top,
          //            ((this.bounderies.right-this.bounderies.left)/camera.scale.width)* cwidth,
          //            ((this.bounderies.down-this.bounderies.top)/camera.scale.height)* cheight); // draw collition image
         var args = [this.state().collider];
         if(this.state().hasOwnProperty('frame'))
           args.push((this.state().cp[Math.round(this.state().frame)] || {x:0}).x, // clipping x position of sprite cell
                     (this.state().cp[Math.round(this.state().frame)] || {y:0}).y, // clipping y position of sprite cell
                     this.state().fw,  // width of sprite cell
                     this.state().fh); // height of sprite cell
         args.push( xoffset - xcoffset, // x position to render
                    yoffset - ycoffset, // y position to render
                   (this.scale.width/camera.scale.width)* cwidth, // height to render
                   (this.scale.height/camera.scale.height)* cheight); // width to render
         c.drawImage(...args);
      }
    }
  }
}
