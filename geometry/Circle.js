class Circle extends Polygon {
  constructor(color={fill:false,stroke:false},x=0,y=0,r=0,step=1) {
    super(derives(x,y,r,step),color);
  }
}

function derives(x,y,r,step){
  var path = [];
  var theta=1;
  while(theta<360){
    path.push({x: x + r * Math.cos((theta * Math.PI)/180),
               y: y + r * Math.sin((theta * Math.PI)/180)});
    theta+=step;
  }
  return path;
}
