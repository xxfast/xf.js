class Sprite {
  constructor() {
    this.origin = {x:0,y:0};
    this.scale = {width:0,height:0};
    this.speed = {x:0,y:0};
    this.acceleration = {x:0,y:0};
  }
  resource(url){
    this.url = url;
    this.image = new Image();
    this.image.src = this.url;
    return this;
  }
  translate(x,y){
    this.position = {x:x,y:y};
    return this;
  }
  transform(width,height){
    this.scale = {width:width,height:height};
    return this;
  }
  rotate(degree){
    this.rotation = (!this.rotation)?degree:this.rotation+degree;
    return this;
  }
  center(x,y){
    this.origin = {x:x,y:y};
    return this;
  }
  velocity(x,y){
    this.speed = {x:x,y:y};
    return this;
  }
  accelerate(x,y){
    this.acceleration = {x:x,y:y};
    return this;
  }

  update(){
    this.speed = {x: this.speed.x + this.acceleration.x, y: this.speed.y + this.acceleration.y}
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }

  render(c){
    c.save();
    c.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
    c.rotate(-this.rotation + Math.PI/2.0);
    c.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
    c.drawImage(this.image,this.position.x,this.position.y,this.scale.width,this.scale.height);
    c.restore();
  }
}
