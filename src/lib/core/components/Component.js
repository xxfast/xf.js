/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
export class Component {
  constructor(owner) {
    this.owner = owner;
    this.profiles = {render:{on:1, now:0}};
  }

  /**
    * assigns a component manager for this component
    *   @returns {Component} itself
  */
  responds(manager){
    this.manager = manager;
    return this;
  }

  /**
    * defines how a component should initialise after attaching to it's game object
  */
  initialise() { throw new Error('must be implemented by subclass!'); }

  /**
    * defines how a component state change on one update call
  */
  process() { throw new Error('must be implemented by subclass!'); }

  /*
   * defines how a component should be handling rendering calls
   *   @param {context} c - the canvas context to draw the sprite on.
   *   @param {Camera} camera - the camera to look at the sprite from.
   */
  render(c,camera) { throw new Error('must be implemented by subclass!');}
}
