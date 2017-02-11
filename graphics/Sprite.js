class Sprite {
  constructor() {
    this.origin = {x:0,y:0};
  }
  resource(url){
    this.url = url;
    this.image = new Image();
    this.image.src = this.url;
    return this;
  }
  translate(x,y){
    this.x = x;
    this.y = y;
    return this;
  }
  transform(width,height){
    this.width = width;
    this.height = height;
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
  render(c){
    c.save();
    c.translate(this.x+this.origin.x,this.y+this.origin.y);
    c.rotate(-this.rotation + Math.PI/2.0);
    c.translate(-this.x-this.origin.x, -this.y-this.origin.y);
    c.drawImage(this.image,this.x,this.y,this.width,this.height);
    c.restore();
  }
}
