class Rectangle extends Polygon {
  constructor(color={fill:false,stroke:false},x=0,y=0,w=0,h=0) {
    super([{x:0,y:0},{x:w,y:0},{x:w,y:h},{x:0,y:h}],color);
  }
}
