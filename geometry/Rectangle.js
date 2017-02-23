class Rectangle extends Polygon {
  constructor(color={fill:false,stroke:false},x=0,y=0,w=0,h=0) {
    super([{x:x,y:y},{x:x+w,y:y},{x:x+w,y:y+h},{x:x,y:y+h}],color);
  }
}
