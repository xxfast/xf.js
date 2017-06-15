/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single game instance
*/
class Game {
  constructor() {
    this.managers = { scenes: new SceneManager() };
    this.states = [];
  }

  /*
    * gets the scene manager of this game
    *   @returns {SceneManager} sceneManager
  */
  scenes() {
    return this.managers.scenes;
  }

  /*
    * updates the current scene of this game
  */
  update() {
    this.managers.scenes.process();
  }

  /*
    * renders the current scene of this game
  */
  render() {
    this.managers.scenes.render();
  }

}
/**
 * @abstract
 * Class representing an game object.
 */
class GameObject {
  /**
    * Create an GameObject.
    * @param {string} id - name of the GameObject.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id, x = 0, y = 0, w = 0, h = 0) {
    this.components = {};
    this.attach(new Identifiable(this, id));
    this.attach(new Movable(this));
    this.attach(new Transformable(this));
  }

  /**
    * clones the object
    *   @returns {GameObject} cloned game object
  */
  clone() {
    return new GameObject(this.id, this.position.x, this.position.y, this.scale.width, this.scale.height);
  }

  /**
    * attaches a particular behavior component to the game object
    * @param {Component} component - component to attach
    *   @returns {GameObject} itself
  */
  attach(component) {
    Object.assign(this, component);
    var compfacade = { owner: component.owner };
    var reflected = component;
    while (reflected = Reflect.getPrototypeOf(reflected)) {
      if (reflected == Component.prototype) break; // base component act as an interface here
      if (reflected == Object.prototype) break; // no need to redefine Object behavior
      let keys = Reflect.ownKeys(reflected);
      for (var i = 1; i < keys.length; i++) {
        var keyname = keys[i];
        compfacade[keyname] = reflected[keys[i]];
        if (keyname == "initialise" || keyname == "process" || keyname == "render") continue;
        Reflect.getPrototypeOf(this)[keyname] = reflected[keys[i]];
      }
      this.components[reflected.constructor.name] = compfacade;
    }
    return this;
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a single scene that contains child sprite elements
*/
class Scene extends GameObject {
  /**
    * Create an Scene.
    * @param {string} id - name of the Scene.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    * @param {int} [h=0] - desired height.
    */
  constructor(id, bg = "white", w, h, canvas = null) {
    super(id, 0, 0, w, h);
    this.elements = [];
    this.managers = {};
    this.manageProfiles = { Animatable: { process: { on: 1 } },
      Rotatable: { process: { on: 1 } } };
    this.observer = null;
    this.background = bg;
    this.canvas = canvas;
  }

  /*
    * checks whether the givens gameobject is a part of this scene
    * @param {GameObject} obj - the object to check
    *   @returns {int} index found
  */
  contains(object) {
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].identify(object.id)) {
        return i;
      }
    }
    return -1;
  }

  /*
    * adds gameobjects to the scene
    * @param {GameObject[]} args - the gameobjects to add to the scene.
    *   @returns {Scene} itself
  */
  add(args) {
    for (var i = 0; i < arguments.length; i++) {
      this.elements.push(arguments[i]);
      for (var component in arguments[i].components) {
        if (arguments[i].components.hasOwnProperty(component)) {
          if (!this.managers.hasOwnProperty(component)) {
            this.managers[component] = new Manager();
            this.managers[component].adopt(this.manageProfiles[component]);
          }
          this.managers[component].manage(arguments[i].components[component], this.manageProfiles[component]);
        }
      }
      if (arguments[i] instanceof Camera) arguments[i].targets(this);
    }
    return this;
  }

  /*
    * removes a gameobject from the scene
    * @param {GameObject} obj - the canvas to draw the scene on.
  */
  remove(obj) {
    this.elements = this.elements.filter(item => item !== obj);
    return this;
  }

  /*
    * adds and sets the observer for the scene
    * @param {Camera} camera - the camera to set to observe through
    *   @returns {Scene} itself
  */
  observe(camera = null) {
    if (this.contains(camera) < 0) this.add(camera);
    this.observer = camera;
    return this;
  }

  /**
    * initialise the scene and components
  */
  initialise() {
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].initialise();
      }
    }
  }

  /**
    * updates the scene once
  */
  update() {
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].update();
      }
    }
  }

  /**
    * renders the scene on the given canvas,
    * if a camera is proviced, then as seen from the given camera
    * @param {context} c - the canvas to draw the scene on.
    * @param {Camera} [camera=false] - the camera to look at the scene from.
  */
  render(c, camera = this.observer) {
    // {position:{x:0,y:0},scale:{width:1,height:1},rotation:0,target:{scene:{canvas:{width:1,height:1}}}}
    this.canvas = c.canvas;
    this.clear(c);
    c.save();
    //c.translate(-camera.position.x + camera.origin.x, -camera.position.y + camera.origin.y);
    // c.translate(((camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    c.rotate(-camera.rotation * Math.PI / 180);
    // c.translate(((-camera.position.x)/camera.scale.width)*camera.target.scene.canvas.width,
    //              ((-camera.position.y)/camera.scale.height)*camera.target.scene.canvas.height);
    //c.translate(camera.position.x - camera.origin.x, camera.position.y - camera.origin.y);
    // for(var i=0; i<this.elements.length; i++){
    //   var s = this.elements[i];
    //   if(!(s instanceof Camera) && ( !camera || s.within(camera) )){
    //     this.elements[i].render(c,camera || undefined);
    //   }
    // }
    for (var manager in this.managers) {
      if (this.managers.hasOwnProperty(manager)) {
        this.managers[manager].render(c, camera);
      }
    }
    c.rotate(camera.rotation * Math.PI / 180);
    if (this.debug) {
      var i = 0;
      c.fillStyle = "white";
      c.fillRect(-1, -1, 100, Object.keys(this.debug).length * 12 + 5);
      for (var prop in this.debug) {
        c.fillStyle = "black";
        c.font = "12px Helvatica";
        c.fillText(prop + ': ' + this.debug[prop], 5, ++i * 12);
      }
    }
  }

  /**
    * clear the rendered patch for the scene
    * @param {context} c - the canvas to clear the canvas scene on.
    */
  clear(c) {
    c.fillStyle = this.background;
    c.clearRect(0, 0, this.scale.width, this.scale.height);
    c.fillRect(0, 0, this.scale.width, this.scale.height);
  }
}
/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor(owner) {
    this.owner = owner;
    this.profiles = { render: { on: 1, now: 0 } };
  }

  /*
    * assigns the component manager for this component
    *   @returns {Component} itself
  */
  responds(manager) {
    this.manager = manager;
    return this;
  }

  /*
    * defines how the component should initialise after attaching to gameobject
  */
  initialise() {
    throw new Error('must be implemented by subclass!');
  }

  /*
    * defines how the component state change on one update
  */
  process() {
    throw new Error('must be implemented by subclass!');
  }

  /*
    * defines how this component handles rendering
  */
  render(c, camera) {
    throw new Error('must be implemented by subclass!');
  }
}

export default Component;
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that help us developers to debug
*/

const Component = require('./Component.js');

class Debuggable extends Component {
  constructor(owner) {
    super(owner);
    this.debug = { enabled: true,
      drawCollisionMask: false,
      drawBounds: true,
      drawCenter: true,
      drawContainer: true };
  }

  /*
    * enable/disable debugging parameters in the debugging mode
    *   @returns {GameObject} itself
  */
  debug() {
    for (var propt in obj.debug) {
      obj.debug[propt] = !obj[propt];
    }
    return this;
  }

  /*
    * enable/disable debugging parameters in the debugging mode
    *   @returns {GameObject} itself
  */
  render(c, camera) {
    if (!this.debug.enabled) return;
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var rxoffset = Math.cos(camera.rotation + this.rotation);
    var ryoffset = Math.sin(camera.rotation + this.rotation);
    var xoffset = this.position.x / camera.scale.width * cwidth;
    var xcoffset = camera.position.x / camera.scale.width * cwidth;
    var yoffset = this.position.y / camera.scale.height * cheight;
    var ycoffset = camera.position.y / camera.scale.height * cheight;
    if (this.debug.drawCenter) {
      c.fillStyle = "yellow";
      var cpxoffset = (this.position.x + this.origin.x - 2) / camera.scale.width * cwidth;
      var cpyoffset = (this.position.y + this.origin.y - 2) / camera.scale.height * cheight;
      c.fillRect(cpxoffset - xcoffset, cpyoffset - ycoffset, 4, 4); // draw the bounding boxes
    }
    if (this.debug.drawContainer) {
      c.strokeStyle = "green";
      c.beginPath();
      var xpoffset = (this.position.x + this.vertices[0].x) / camera.scale.width * cwidth;
      var ypoffset = (this.position.y + this.vertices[0].y) / camera.scale.height * cheight;
      c.moveTo(xpoffset - xcoffset, ypoffset - ycoffset);
      for (var i = 0; i < this.vertices.length; i++) {
        xpoffset = (this.position.x + this.vertices[i].x) / camera.scale.width * cwidth;
        ypoffset = (this.position.y + this.vertices[i].y) / camera.scale.height * cheight;
        c.lineTo(xpoffset - xcoffset, ypoffset - ycoffset);
      }
      c.closePath();
      c.stroke();
    }
    if (this.debug.drawBounds) {
      c.strokeStyle = "red";
      c.strokeRect(xoffset - xcoffset + this.bounderies.left, yoffset - ycoffset + this.bounderies.top, (this.bounderies.right - this.bounderies.left) / camera.scale.width * cwidth, (this.bounderies.down - this.bounderies.top) / camera.scale.height * cheight); // draw the bounding boxes
    }
    if (this.debug.drawCollisionMask && this.state().collider) {
      var args = [this.state().collider];
      if (this.state().hasOwnProperty('frame')) args.push((this.state().cp[Math.round(this.state().frame)] || { x: 0 }).x, // clipping x position of sprite cell
      (this.state().cp[Math.round(this.state().frame)] || { y: 0 }).y, // clipping y position of sprite cell
      this.state().fw, // width of sprite cell
      this.state().fh); // height of sprite cell
      args.push(xoffset - xcoffset, // x position to render
      yoffset - ycoffset, // y position to render
      this.scale.width / camera.scale.width * cwidth, // height to render
      this.scale.height / camera.scale.height * cheight); // width to render
      c.drawImage(...args);
    }
  }

}

export default Debuggable;
/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a identifiable components that defines a identifiable behavior
*/
class Identifiable extends Component {
  constructor(owner, id) {
    super(owner);
    this.id = id;
  }

  /*
    * checks whether the given object is being identifed as the given id
    *   @returns {bool} amI?
  */
  identify(id) {
    return this.id == id;
  }

  /*
    * generates a unique identifiable id for a gameobject
    *   @returns {String} uniqueString
  */
  generate() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  /*
    * initialise the state of the component
  */
  initialise() {
    if (!this.id) this.id = this.generate();
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like move, translate etc.
*/
class Movable extends Component {
  constructor(owner) {
    super(owner);
    this.position = { x: 0, y: 0 };
    this.speed = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
  }

  /**
    * translales the object to the given position
    * @param {int} x - x position to move.
    * @param {int} y - y position to move.
    *   @returns {}
  */
  translate(x, y) {
    this.position = { x: x, y: y };
    return this;
  }

  /**
    * moves the object by the given amount
    * @param {int} x - x amount to move.
    * @param {int} y - y amount to move.
  */
  move(x, y) {
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  /**
    * sets the velocity of the object
    *   @param {int} x - horizontal velocity component.
    *   @param {int} y- vertical velocity component.
    *   @returns {Sprite} itself
  */
  velocity(x, y) {
    this.speed = { x: x, y: y };
    return this;
  }

  /**
    * increases the acceleration of the  object
    *   @param {int} x - horizontal acceleration component.
    *   @param {int} y- vertical acceleration component.
    *   @returns {Sprite} itself
  */
  accelerate(x, y) {
    this.acceleration.x += x;
    this.acceleration.y += y;
    return this;
  }

  /**
    * applies a force to the object
    *   @param {int} x - horizontal force component.
    *   @param {int} y- vertical force component.
    *   @returns {Sprite} itself
  */
  force(x, y) {
    this.acceleration.x += x / (this.mass || 1);
    this.acceleration.y += y / (this.mass || 1);
    return this;
  }

  /*
    * defines how the movable component change state on one update
  */
  process() {
    this.velocity(this.speed.x + this.acceleration.x, this.speed.y + this.acceleration.y);
    this.move(this.speed.x, this.speed.y);
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotate etc.
*/
class Rotatable extends Component {
  constructor(owner) {
    super(owner);
    this.rotation = 0;
    this.rotationVelocity = 0;
  }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  torque(degree = 0) {
    this.rotationVelocity = degree;
    return this;
  }

  /**
    * rotates the  object by given amount of degrees
    * @param {int} degree - amount of degrees to move.
  */
  rotate(degree = 0) {
    this.rotation = !this.rotation ? degree : this.rotation + degree;
    if (this.bounds) this.bounderies = this.bounds();
    return this;
  }

  process() {
    this.rotate(this.rotationVelocity);
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center etc.
*/
class Transformable extends Component {
  constructor(owner) {
    super(owner);
    this.origin = { x: 0, y: 0 };
    this.scale = { width: 0, height: 0 };
  }

  /**
    * transform the  object to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width, height) {
    this.scale = { width: width, height: height };
    return this;
  }

  /**
    * transform the object to the given scale
    * @param {int} byX - increse/decrease in width.
    * @param {int} byY - increse/decrease in height.
  */
  resize(byX, byY) {
    this.transform(this.scale.width + byX, this.scale.height + byY);
    return this;
  }

  /**
    * sets the origin of the object to the given position
    * if called without parameters, it defaults to center of the object
    * @param {int} [x=width/2] - anchor in the x position.
    * @param {int} [y=height/2] - anchor in the y position.
  */
  center(x = this.scale.width / 2, y = this.scale.height / 2) {
    this.origin = { x: x, y: y };
    return this;
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Virtual manager class that is responsible in managing a single component behavior.
*/
class Manager {
  constructor() {
    this.managed = [];
    this.profiles = { render: { on: 1, now: 0 } };
  }

  /**
    * assigns an component to be managed by the manager
    * @param {Component} component - component to manage.
    * @param {Profile} profile - profile to manage the component
    *   @returns {Manager} itself
  */
  manage(component) {
    component.manager = this;
    this.managed.push(component);
    return this;
  }

  /*
    * assign managed profile
    * @param {Profile} profile - profile to manage the component using
    *   @returns {Component} itself
  */
  adopt(profiles) {
    for (var profile in profiles) {
      if (profiles.hasOwnProperty(profile)) {
        this.profiles[profile] = profiles[profile];
        this.profiles[profile].now = 0;
      }
    }
    return this;
  }

  /**
    * Subsequently initialises all of the managed components
  */
  initialise() {
    for (var i = 0; i < this.managed.length; i++) {
      if (this.managed[i].hasOwnProperty("initialise")) {
        this.managed[i].initialise.call(this.managed[i].owner);
      }
    }
  }

  /*
    * @virtual
    * determines wheather the managed components should process based on the process profile
    *   @returns {bool} should
  */
  shouldUpdate() {
    return !this.profiles["process"] ? true : this.profiles["process"].now == this.profiles["process"].on;
  }

  /*
    *logic before processing each managed component
  */
  //buggy!
  beforeUpdate() {
    if (!this.profiles["process"]) return;
    this.profiles.process.now++;
    if (this.profiles.process.now > this.profiles.process.on) {
      this.profiles.process.now = 0;
    }
  }

  /**
    * Subsequently process all of the managed components
  */
  update() {
    this.beforeUpdate();
    if (this.shouldUpdate()) {
      for (var i = 0; i < this.managed.length; i++) {
        if (this.managed[i].hasOwnProperty("process")) {
          this.managed[i].process.call(this.managed[i].owner);
        }
      }
    }
  }

  /*
    * @virtual
    * determines wheather the component should render based on the render profile
    *   @returns {bool} should
  */
  shouldRender() {
    return !this.profiles["render"] ? true : this.profiles["render"].now == this.profiles["render"].on;
  }

  /*
    * component logic before rendeing
  */
  beforeRender() {
    this.profiles.render.now++;
    if (this.profiles.render.now > this.profiles.render.on) {
      this.profiles.render.now = 0;
    }
  }

  /**
    * Subsequently renders all of the managed components
  */
  render(c, camera) {
    this.beforeRender();
    if (this.shouldRender()) {
      for (var i = 0; i < this.managed.length; i++) {
        if (this.managed[i].hasOwnProperty("render")) this.managed[i].render.call(this.managed[i].owner, c, camera);
      }
    }
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a scene manager managing the scenes of a game
*/
class SceneManager extends Manager {
  constructor() {
    super();
    this.scenes = [];
    this.current = null;
  }

  /*
    * checks whether the givens scene is a part of this game
    * @param {Scene} scene - the scene to check
    *   @returns {int} index found
  */
  contains(scene) {
    for (var i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].identify(scene.id)) {
        return i;
      }
    }
    return -1;
  }

  /*
    * adds a given scene to the list of scenes
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  add(scene) {
    this.scenes.push(scene);
    return this;
  }

  /*
    * sets a given scene to the current of scene
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  set(scene) {
    if (this.contains(scene) < 0) this.add(scene);
    this.current = this.scenes[this.contains(scene)];
    return this;
  }

  /*
    * gets the first scene that matches the id
    * @param {string} id - id of the scene to get
    *   @returns {Scene} found[=null]
  */
  get(id) {
    for (var i = 0; i < this.scenes.length; i++) if (this.scenes[i].id == id) return this.scenes[i];
    return null;
  }

  /*
    * removes the first scene that matches the id
    * @param {string} id - the id of the scene to remove
    *   @returns {Scene} the removed scene
  */
  remove(id) {
    var index = this.contains(this.get(id));
    var toReturn = index > 0 ? this.scenes.splice(index, 1) : null;
    return toReturn;
  }

  /**
    *  processes the current scene the SceneManager is focused on
  */
  process() {
    if (this.current) {
      this.current.update();
    }
  }

  /**
    *  render the current scene the SceneManager is focused on
  */
  render() {
    if (this.current) {
      this.current.render();
    }
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an Circle shape
*/
class Circle extends Polygon {
  constructor(color = { fill: false, stroke: false }, x = 0, y = 0, r = 0, step = 1) {
    super(pathFromCircle(x, y, r, step), color);
  }
}

function pathFromCircle(x, y, r, step) {
  var path = [];
  var theta = 1;
  while (theta < 360) {
    path.push({ x: x + r * Math.cos(theta * Math.PI / 180),
      y: y + r * Math.sin(theta * Math.PI / 180) });
    theta += step;
  }
  return path;
}
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
  constructor(points = [{ x: 0, y: 0 }], color = { fill: false, stroke: false }) {
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
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an Rectangle shape
*/
class Rectangle extends Polygon {
  constructor(color = { fill: false, stroke: false }, x = 0, y = 0, w = 0, h = 0) {
    super([{ x: x, y: y }, { x: x + w, y: y }, { x: x + w, y: y + h }, { x: x, y: y + h }], color);
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents an Rectangle shape
*/
class Triangle extends Polygon {
  constructor(color = { fill: false, stroke: false }, x = 0, y = 0, w = 0, h = 0) {
    super([{ x: x, y: y + h }, { x: x + w / 2, y: y }, { x: x + w, y: y + h }], color);
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a collidable behaviors like collideon, bounds for Polygons etc.
*/
class CollidablePolygon extends Component {
  constructor(owner) {
    super(owner);
    this.vertices = [];
    this.bounderies = {};
    this.collider = null;
    this.mass = 1;
  }

  /**
    * @override
    * calculate the bounds object of the this polygon
    * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
  */
  bounds() {
    this.vertices = [{ x: 0, y: 0 }, { x: +this.scale.width, y: 0 }, { x: +this.scale.width, y: +this.scale.height }, { x: 0, y: 0 + this.scale.height }];
    var rads = -(this.rotation * Math.PI) / 180;
    for (var i = 0; i < this.vertices.length; i++) {
      var dx = this.vertices[i].x - this.origin.x;
      var dy = this.vertices[i].y - this.origin.y;
      // TODO : fix this shit
      this.vertices[i].x -= dx;
      this.vertices[i].y -= dy;
    }
    var minx = this.points[0].x,
        miny = this.points[0].y;
    var maxx = this.points[0].x,
        maxy = this.points[0].y;
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].x < minx) minx = this.points[i].x;
      if (this.points[i].y < miny) miny = this.points[i].y;
      if (this.points[i].x > maxx) maxx = this.points[i].x;
      if (this.points[i].y > maxy) maxy = this.points[i].y;
    }
    return { top: miny, right: maxx, down: maxy, left: minx };
  }

  /**
    * Sees if one game object is within another sprite
    * @param {GameObject} obj - GameObject to see if this is within.
  */
  within(obj) {
    if (this.rotation == 0 && obj.rotation == 0) {
      if (this.position.x > obj.position.x + obj.scale.width || obj.position.x > this.position.x + this.scale.width) return false;
      if (this.position.y > obj.position.y + obj.scale.height || obj.position.y > this.position.y + this.scale.height) return false;
    }
    return true;
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
class RenderablePolygon extends Component {
  constructor(owner) {
    super(owner);
  }

  /**
    * renders the polygon on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @param {Camera} camera - the camera to look at the polygon from.
  */
  render(c, camera = { position: { x: 0, y: 0 }, scale: { width: 1, height: 1 }, rotation: 0, target: { scene: { canvas: { width: 1, height: 1 } } } }) {
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var cwratio = camera.target.scene.canvas.width / camera.scale.width;
    var chratio = camera.target.scene.canvas.height / camera.scale.height;
    var xcoffset = camera.position.x / camera.scale.width * camera.target.scene.canvas.width;
    var ycoffset = camera.position.y / camera.scale.height * camera.target.scene.canvas.height;
    var xoffset, yoffset;
    c.beginPath();
    for (var i = 0; i < this.points.length; i++) {
      xoffset = (this.position.x + this.points[i].x) / camera.scale.width * camera.target.scene.canvas.width;
      yoffset = (this.position.y + this.points[i].y) / camera.scale.height * camera.target.scene.canvas.height;
      if (i == 0) c.moveTo(xoffset - xcoffset, yoffset - ycoffset);else c.lineTo(xoffset - xcoffset, yoffset - ycoffset);
    }
    xoffset = this.position.x * cwratio; // ((this.position.x/camera.scale.width) * camera.target.scene.canvas.width);
    yoffset = this.position.y * cwratio; // ((this.position.y/camera.scale.height) * camera.target.scene.canvas.height);
    c.closePath();
    c.fillStyle = this.color.fill;
    if (this.color.fill) c.fill();
    c.strokeStyle = this.color.stroke;
    if (this.color.stroke) c.stroke();
    if (this.debug) {
      if (this.debug.drawBounds) {
        c.strokeStyle = "red";
        var xboffset = (this.position.x + this.bounderies.left) * cwratio;
        var yboffset = (this.position.y + this.bounderies.top) * chratio;
        c.strokeRect(xboffset - xcoffset, yboffset - ycoffset, this.scale.width * cwratio, this.scale.height * chratio); // draw the bounding boxes
      }
      if (this.debug.drawCenter) {
        c.fillStyle = "yellow";
        var xooffset = (this.position.x + this.origin.x - 2) * cwratio;
        var yooffset = (this.position.y + this.origin.y - 2) * chratio;
        c.fillRect(xooffset - xcoffset, yooffset - ycoffset, 4, 4); // draw the bounding boxes
      }
    }
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like rotation for Polygons etc.
*/
class RotatablePolygon extends Component {
  constructor(owner) {
    super(owner);
    this.rotation = 0;
  }

  /**
    * @override
    * rotates the points of the polygon around it's center by given amount of degrees
    *   @param {context} c - the canvas context to draw the polygon on.
    *   @returns {Polygon} this - the object itself.
  */
  rotate(degree = 0) {
    //super.rotate(degree);
    this.rotation = !this.rotation ? degree : this.rotation + degree;
    var rads = -(degree * Math.PI) / 180;
    for (var i = 0; i < this.points.length; i++) {
      var dx = this.points[i].x - this.origin.x;
      var dy = this.points[i].y - this.origin.y;
      this.points[i].x = dx * Math.cos(rads) - dy * Math.sin(rads) + this.origin.x;
      this.points[i].y = dx * Math.sin(rads) + dy * Math.cos(rads) + this.origin.y;
    }
    if (this.bounds) this.bounderies = this.bounds();
    this.scale = { width: this.bounderies.right - this.bounderies.left, height: this.bounderies.down - this.bounderies.top };
    return this;
  }
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a behaviors like transform, center for Polygons etc.
*/
class TransformablePolygon extends Component {
  constructor(owner) {
    super(owner);
    this.bounderies = {};
    this.origin = { x: 0, y: 0 };
    function width() {
      var max = owner.points[0].x,
          min = owner.points[0].x;
      for (var i = 0; i < owner.points.length; i++) {
        if (owner.points[i].x > max) max = owner.points[i].x;
        if (owner.points[i].x < min) min = owner.points[i].x;
      }
      return max - min;
    }

    function height() {
      var max = owner.points[0].y,
          min = owner.points[0].y;
      for (var i = 0; i < owner.points.length; i++) {
        if (owner.points[i].y > max) max = owner.points[i].y;
        if (owner.points[i].y < min) min = owner.points[i].y;
      }
      return max - min;
    }
    this.scale = { width: width(), height: height() };
  }
  /**
    * get the width as defined by points of the polygon
    * @return {int} width - width as defined by the polygon
    */

  /**
    * get the height as defined by points of the polygon
    * @return {int} height - height as defined by the polygon
    */

  /**
    * @override
    * transform the  polygon to the given scale
    * @param {int} width - desired width.
    * @param {int} height - desired height.
  */
  transform(width, height) {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].x = this.points[i].x / this.scale.width * width;
      this.points[i].y = this.points[i].y / this.scale.height * height;
    }
    var newxc = this.origin.x / this.scale.width * width;
    var newyc = this.origin.y / this.scale.height * height;
    this.position.x -= newxc - this.origin.x;
    this.position.y -= newyc - this.origin.y;
    this.center(newxc, newyc);
    //this.position.y -= (this.origin.y/this.scale.height)*height;
    this.bounderies = this.bounds();
    this.scale = { width: width, height: height };
    return this;
  }

  /**
    * transform the polygon to the given scale
    * @param {int} byX - increse/decrease in width.
    * @param {int} byY - increse/decrease in height.
  */
  resize(byX, byY) {
    this.transform(this.scale.width + byX, this.scale.height + byY);
    return this;
  }

  /**
    * @override
    * sets the origin of the polygon to the given position
    * if called without parameters, it defaults to center of the object
    * @param {int} [x=width/2] - desired center in the x-cordinate.
    * @param {int} [y=height/2] - desired center in the y-cordinate.
  */
  center(x = (this.bounderies.left + this.bounderies.right) / 2, y = (this.bounderies.top + this.bounderies.down) / 2) {
    this.origin = { x: x, y: y };
    return this;
  }

  /*
    * initialise the state of the Transformable component
  */
  initialise() {}
}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a camera that captures a scene.
*/
class Camera extends GameObject {
  /**
    * Create an Camera.
    * @param {string} [id] - name of the Camera.
    * @param {Scene} target - the scene the camera targted at.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id, scene, x, y, w, h) {
    super(id, x, y, w, h);
    this.attach(new Rotatable(this));
    this.target = { scene: scene, object: false };
    this.options = { contained: true };
  }

  /**
    * targets the camera at the given scene
    * @param {Scene} target - the scene the camera targted at.
    *   @returns {Camera} itself
    */
  targets(scene) {
    this.target.scene = scene;
    return this;
  }

  /**
    * camera tracks the given object
    * @param {GameObject} object - the object the camera starts tracking.
    *   @returns {Camera} itself
    */
  tracks(object) {
    this.target.object = object;
    return this;
  }

  /**
    * camera zooms in to, and keeps the constain ratio if enabled
    * @param {int} amount - amount to zoom in on.
    * @param {bool} keepRatio - should the camera keep constent ratio while zooming.
    *   @returns {Camera} itself
    */
  zoom(amount, keepRatio = true) {
    var owidth = this.scale.width,
        oheight = this.scale.height;
    var ratio = this.scale.width / this.scale.height;
    for (var i = 0; i < Math.abs(amount); i++) {
      this.scale.width = this.scale.width - Math.sign(amount) * Math.abs(amount);
      this.scale.height = keepRatio ? this.scale.width / ratio : this.scale.height - Math.sign(amount);
    }
    //recentering the origin ? shouldn't this be done by parent?
    this.origin.x = this.origin.x / owidth * this.scale.width;
    this.origin.y = this.origin.y / oheight * this.scale.height;
    return this;
  }

  /*
    * renders the containts within tha camera to the given canvas
    * @param {context} c - the canvas to draw the camera on.
  */
  capture(cc, c) {
    var renderData = cc.getImageData(this.position.x, this.position.y, this.scale.width, this.scale.height);
    cc.putImageData(renderData, 0, 0);
  }

  /**
    * converts camera relative position to absolute position
    * @param {x:y:} relative - position witin the camera.
    *  @return {x:y:} absolute - absolute position
  */
  absolute(relative) {
    var xratio = this.target.scene.canvas.width / this.scale.width;
    var yratio = this.target.scene.canvas.height / this.scale.height;
    return { x: this.position.x + relative.x / xratio,
      y: this.position.y + relative.y / yratio };
  }

  /**
    * converts camera relative position to absolute position
    * @param {x:y:} relative - position witin the camera.
    *  @return {x:y:} absolute - absolute position
  */
  relative(absolute) {
    return { x: absolute.x - this.position.x, y: absolute.y - this.position.y };
  }

  /**
    * updates the camera just once
  */
  update() {
    if (this.target.object) {
      this.translate(this.target.object.position.x + this.target.object.origin.x - this.origin.x, this.target.object.position.y + this.target.object.origin.y - this.origin.y);
    }
  }

  /**
    * renders the camera itself
    * @param {context} c - the canvas to draw the camera on.
  */
  render(c) {
    c.save();
    c.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
    c.rotate(-this.rotation * Math.PI / 180);
    c.translate(-this.position.x - this.origin.x, -this.position.y - this.origin.y);
    c.strokeStyle = "black";
    c.font = "12px Verdana";
    c.fillStyle = "black";
    c.fillText(this.id, this.position.x, this.position.y - 5);
    c.strokeRect(this.position.x, this.position.y, this.scale.width, this.scale.height);
    c.fillStyle = "yellow";
    c.fillRect(this.position.x + this.origin.x - 2, this.position.y + this.origin.y - 2, 4, 4);
    c.restore();
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a singular sprite with embedded physics.
 * @extends Object
*/
class Sprite extends GameObject {
  /**
    * Create an Sprite.
    * @param {string} id - name of the Sprite.
    * @param {number} [x=0] - x position.
    * @param {number} [y=0] - y position.
    * @param {int} [w=0] - desired width.
    * @param {int} [h=0] - desired height.
    */
  constructor(id, x, y, w, h) {
    super(id, x, y, w, h);
    this.attach(new Rotatable(this));
    this.attach(new CollidableSprite(this));
    this.attach(new Animatable(this));
    this.attach(new RenderableSprite(this));
    this.attach(new Debuggable(this));
  }

  /**
    *clones the object
    * @returns {Sprite} cloned
  */
  clone() {
    var toReturn = new Sprite(this.id, this.position.x, this.position.y, this.scale.width, this.scale.height);
    toReturn.speed = { x: this.speed.x, y: this.speed.y };
    toReturn.acceleration = { x: this.acceleration.x, y: this.acceleration.y };
    toReturn.mass = this.mass;
    toReturn.debug = { drawCollisionMask: this.debug.drawCollisionMask };
    toReturn.states = this.states; //shallow
    toReturn.fpt = this.fpt;
    return toReturn;
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a animatable behaviors like animate, play etc.
*/
class Animatable extends Component {
  constructor(owner) {
    super(owner);
    this.states = [];
    this.current = 0;
    this.fpt = 1;
  }

  /**
    * returns the current state the sprite is in
    *   @returns {state} current state
  */
  state() {
    return this.states[this.current];
  }

  /**
    * set the current state of the animation
    *   @param {string} id - unique name of the animation to go to
    *   @returns {Sprite} itself
  */
  goto(id) {
    for (var i = 0; i < this.states.length; i++) {
      if (this.states[i].id == id) {
        this.current = i;
        break;
      }
    }
    return this;
  }

  /**
    * plays the animation associated in the state (if any)
    *   @param {string} fpt - sets the speed of playback [<0=slowmotion, 0=stopped, 1=normal, 1>=fastmotion]
    *   @returns {Sprite} itself
  */
  play(fpt = 1) {
    this.fpt = fpt;
    return this;
  }

  /**
    * stops the animation associated in the state (if any)
    *   @returns {Sprite} itself
  */
  stop() {
    this.fpt = 0;
    return this;
  }

  /**
    * rewinds the animation associated in the state (if any)
    * rewinds to the start by default.
    *   @param {in} [to=0] - sets the frame to rewind to
    *   @returns {Sprite} itself
  */
  rewind(to = 0) {
    this.state().frame = to;
    return this;
  }

  /**
    * sets a static layered image resources for the desired sprite
    * important ! - the last last layer renders on top
    * important ! - the first layer will be used as the collision mask by defult
    *   @param {string[]} url - location of the images layer by layer.
    *   @returns {Sprite} itself
  */
  source(urls) {
    return this.animate("default", urls, 1, 1, 1, 1, 0);
  }

  /**
  * sets animated spritesheet resources for the desired sprite
  * important ! - the last last layer renders on top
  * important ! - the first layer will be used as the collision mask by defult
  *   @param {string} name -  unique name to identify each animation state
  *   @param {string[]} urls - location(s) of the spritesheet images layer by layer.
  *   @param {int} nr - number of rows in the spritesheet
  *   @param {int} nc - number of colomns in the spritesheet
  *   @param {string} sf -  starting frame of the said state
  *   @param {int} repeat - times should the animation repeat [-1: repeat forever, 0:don't animate , 1:repeat once ...]
  *   @returns {Sprite} itself
  */
  animate(name, urls, nr, nc, nf, sf, repeat) {
    var state = { id: name, frame: sf, layers: [], nr: nr, nc: nc, nf: nf, fw: 0, fh: 0, repeat: repeat, cp: [], collider: null };
    for (var i = 0; i < urls.length; i++) {
      var image = new Image();
      image.src = urls[i];
      image.state = state;
      image.callback = this;
      image.state = state;
      image.onload = function () {
        //frame width, height, and clipping points is decided from the base layer
        if (!this.state.fw) this.state.fw = this.width / this.state.nc;
        if (!this.state.fh) this.state.fh = this.height / this.state.nr;
        if (this.state.cp.length == 0) {
          for (var r = 0; r < nr; r++) for (var c = 0; c < nc; c++) state.cp.push({ x: c * this.state.fw, y: r * this.state.fh });
        }
        this.callback.bounderies = this.callback.bounds();
        //by default, the collider for the state will be the base layer
        if (!this.state.collider) this.state.collider = this;
        //by default, if no scale is provided, scale will be set to base layers dimentions.
        if (this.callback.scale.width == 0 && this.callback.scale.height == 0) {
          this.callback.transform(this.width, this.height);
        }
      };
      state.layers.push(image);
    }
    this.states.push(state);
    this.goto(name);
    return this;
  }

  /*
    * defines how the component state change on one update
  */
  process() {
    if (this.state().repeat >= 1 || this.state().repeat < 0) {
      this.state().frame += this.fpt;
      if (this.state().frame > this.state().nf - 1) {
        this.state().frame = 0;
        this.state().repeat--;
      } else if (this.state().frame < 0) {
        this.state().frame = this.state().nf - 1;
      }
    }
  }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines a collidable behaviors like collideon, bounds etc.
*/
class CollidableSprite extends Component {
    constructor(owner) {
        super(owner);
        this.vertices = [];
        this.bounderies = {};
        this.collider = null;
        this.mass = 1;
    }

    /**
      * sets the weight of the sprite
      *   @param {int} x - weight to set.
      *   @returns {Sprite} itself
    */
    weight(w) {
        this.mass = w;
        return this;
    }

    /**
      * calculate the bounds object of the this sprite
      * @returns {Object} bounds - bounds object formated as {top:,right:,down:,left:}.
    */
    bounds() {
        this.vertices = [{ x: 0, y: 0 }, { x: +this.scale.width, y: 0 }, { x: +this.scale.width, y: +this.scale.height }, { x: 0, y: 0 + this.scale.height }];
        var rads = -(this.rotation * Math.PI) / 180;
        for (var i = 0; i < this.vertices.length; i++) {
            var dx = this.vertices[i].x - this.origin.x;
            var dy = this.vertices[i].y - this.origin.y;
            this.vertices[i].x = dx * Math.cos(rads) - dy * Math.sin(rads) + this.origin.x;
            this.vertices[i].y = dx * Math.sin(rads) + dy * Math.cos(rads) + this.origin.y;
        }
        var minx = this.vertices[0].x,
            miny = this.vertices[0].y;
        var maxx = this.vertices[0].x,
            maxy = this.vertices[0].y;
        for (var i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].x < minx) minx = this.vertices[i].x;
            if (this.vertices[i].y < miny) miny = this.vertices[i].y;
            if (this.vertices[i].x > maxx) maxx = this.vertices[i].x;
            if (this.vertices[i].y > maxy) maxy = this.vertices[i].y;
        }
        return { top: miny, right: maxx, down: maxy, left: minx };
    }

    /**
      * Sees if one game object is within another sprite
      * @param {GameObject} obj - GameObject to see if this is within.
    */
    within(obj) {
        if (this.rotation == 0 && obj.rotation == 0) {
            if (this.position.x > obj.position.x + obj.scale.width || obj.position.x > this.position.x + this.scale.width) return false;
            if (this.position.y > obj.position.y + obj.scale.height || obj.position.y > this.position.y + this.scale.height) return false;
        }
        return true;
    }

    /**
      * sets the custom collision mask for the current, or provided state of the sprite
      * @param {String} mask - url of the mask to set.
      * @param {State} state - the state of which the collider applies to.
      *   @returns {Sprite} itself
    */
    collideon(mask, state = this.state()) {
        var image = new Image();
        image.src = mask;
        state.collider = image;
        return this;
    }

    /**
      * get the collision mask of the sprite
      *   @returns {Sprite} itself
    */
    mask() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = this.state().collider;
        //context.save();
        //context.translate(this.position.x+this.origin.x,this.position.y+this.origin.y);
        //context.rotate(-this.rotation * Math.PI/180);
        //context.translate(-this.position.x-this.origin.x, -this.position.y-this.origin.y);
        context.drawImage(img, 0, 0, this.scale.width, this.scale.height);
        return context.getImageData(0, 0, this.scale.width, this.scale.height);
    }

    /**
     *  @param {string} sprite - Sprite object this object colliding with.
     *  @returns {bool} colliding
     */
    colliding(sprite) {
        // we need to avoid using floats, as were doing array lookups
        var x = Math.round(this.position.x),
            y = Math.round(this.position.y),
            x2 = Math.round(sprite.position.x),
            y2 = Math.round(sprite.position.y);

        var w = this.scale.width,
            h = this.scale.height,
            w2 = sprite.scale.width,
            h2 = sprite.scale.height;

        var rads = this.rotation * Math.PI / 180;
        var c = Math.abs(Math.cos(rads));
        var s = Math.abs(Math.sin(rads));
        w = h * s + w * c;
        h = h * c + w * s;
        w2 = h2 * s + w2 * c;
        h2 = h2 * c + w2 * s;

        w = this.scale.width, h = this.scale.height, w2 = sprite.scale.width, h2 = sprite.scale.height;
        // find the top left and bottom right corners of overlapping area
        var xMin = Math.max(x, x2),
            yMin = Math.max(y, y2),
            xMax = Math.min(x + w, x2 + w2),
            yMax = Math.min(y + h, y2 + h2);

        // Sanity collision check, we ensure that the top-left corner is both
        // above and to the left of the bottom-right corner.
        if (xMin >= xMax || yMin >= yMax) {
            return false;
        }

        var xDiff = xMax - xMin,
            yDiff = yMax - yMin;

        // get the pixels out from the images
        var pixels = this.mask().data,
            pixels2 = sprite.mask().data;

        // if the area is really small,
        // then just perform a normal image collision check
        if (xDiff < 4 && yDiff < 4) {
            for (var pixelX = xMin; pixelX < xMax; pixelX++) {
                for (var pixelY = yMin; pixelY < yMax; pixelY++) {
                    if (pixels[(pixelX - x + (pixelY - y) * w) * 4 + 3] !== 0 && pixels2[(pixelX - x2 + (pixelY - y2) * w2) * 4 + 3] !== 0) {
                        return true;
                    }
                }
            }
        } else {
            /* What is this doing?
             * It is iterating over the overlapping area,
             * across the x then y the,
             * checking if the pixels are on top of this.
             *
             * What is special is that it increments by incX or incY,
             * allowing it to quickly jump across the image in large increments
             * rather then slowly going pixel by pixel.
             *
             * This makes it more likely to find a colliding pixel early.
             */

            // Work out the increments,
            // it's a third, but ensure we don't get a tiny
            // slither of an area for the last iteration (using fast ceil).
            var incX = xDiff / 3.0,
                incY = yDiff / 3.0;
            incX = ~~incX === incX ? incX : incX + 1 | 0;
            incY = ~~incY === incY ? incY : incY + 1 | 0;

            for (var offsetY = 0; offsetY < incY; offsetY++) {
                for (var offsetX = 0; offsetX < incX; offsetX++) {
                    for (var pixelY = yMin + offsetY; pixelY < yMax; pixelY += incY) {
                        for (var pixelX = xMin + offsetX; pixelX < xMax; pixelX += incX) {
                            if (pixels[(pixelX - x + (pixelY - y) * w) * 4 + 3] !== 0 && pixels2[(pixelX - x2 + (pixelY - y2) * w2) * 4 + 3] !== 0) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

}
/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that defines renderable behaviour of a sprite
*/
class RenderableSprite extends Component {
  constructor(owner) {
    super(owner);
  }

  /*
    * renders the sprite on the given canvas,
    * and if a camera is provided, then as seen from given camera
    *   @param {context} c - the canvas context to draw the sprite on.
    *   @param {Camera} camera - the camera to look at the sprite from.
  */
  render(c, camera = { position: { x: 0, y: 0 }, scale: { width: 1, height: 1 }, rotation: 0, target: { scene: { canvas: { width: 1, height: 1 } } } }) {
    var cwidth = camera.target.scene.canvas.width;
    var cheight = camera.target.scene.canvas.height;
    var rxoffset = Math.cos(camera.rotation + this.rotation);
    var ryoffset = Math.sin(camera.rotation + this.rotation);
    var xoffset = this.position.x / camera.scale.width * cwidth;
    var xcoffset = camera.position.x / camera.scale.width * cwidth;
    var yoffset = this.position.y / camera.scale.height * cheight;
    var ycoffset = camera.position.y / camera.scale.height * cheight;
    c.save();
    c.translate((this.position.x + this.origin.x - camera.position.x) / camera.scale.width * cwidth, (this.position.y + this.origin.y - camera.position.y) / camera.scale.height * cheight);
    c.rotate(-this.rotation * Math.PI / 180);
    c.translate((-this.position.x - this.origin.x + camera.position.x) / camera.scale.width * cwidth, (-this.position.y - this.origin.y + camera.position.y) / camera.scale.height * cheight);
    for (var i = 0; i < this.state().layers.length; i++) {
      var args = [this.state().layers[i]];
      if (this.state().hasOwnProperty('frame')) {
        var frame = Math.round(this.state().frame);
        args.push((this.state().cp[frame] || { x: 0 }).x, // clipping x position of sprite cell
        (this.state().cp[frame] || { y: 0 }).y, // clipping y position of sprite cell
        Math.max(1, Math.floor(this.state().fw)), // width of sprite cell
        Math.max(1, Math.floor(this.state().fh))); // height of sprite cell
      }
      args.push(xoffset - xcoffset, // x position to render
      yoffset - ycoffset, // y position to render
      this.scale.width / camera.scale.width * cwidth, // height to render
      this.scale.height / camera.scale.height * cheight); // width to render
      c.drawImage(...args);
    }
    c.restore();
  }
}
var Component = require('.lib/core/components/Component');

var xf = {
  Component: Component
};

module.exports = xf;
