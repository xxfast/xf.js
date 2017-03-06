/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an Rectangle shape
*/
class Triangle extends Polygon {
  constructor(color={fill:false,stroke:false},x=0,y=0,w=0,h=0) {
    super([{x:x,y:y+h},{x:x+(w/2),y:y},{x:x+w,y:y+h}],color);
  }
}
