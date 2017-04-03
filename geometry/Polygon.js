/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an abstract polygon with n number of sides
*/

class Polygon extends GameObject {
  /**
    * Create an polygon with specified vertices
    * @param {[cordinates]]} points - array of sets of coordinates formated as {x:x,y;y}.
    */
  constructor(points=[{x:0,y:0}],color={fill:false,stroke:false}) {
    super();
    this.points = points;
    this.color = color;
    this.attach(new TransformablePolygon(this));
    this.attach(new CollidablePolygon(this));
    this.attach(new RotatablePolygon(this));
    this.attach(new RenderablePolygon(this));
    this.attach(new Debuggable(this));
    //debug
    this.bounderies = this.bounds();
  }
}
