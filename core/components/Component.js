/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor(owner) {
    this.owner = owner;
    this.profiles = {render:{on:1, now:0}};
  }

  /*
    * assigns the component manager for this component
    *   @returns {Component} itself
  */
  responds(manager){
    this.manager = manager;
    return this;
  }

  /*
    * defines how the component should initialise after attaching to gameobject
  */
  initialise() { throw new Error('must be implemented by subclass!'); }

  /*
    * defines how the component state change on one update
  */
  process() { throw new Error('must be implemented by subclass!'); }

  /*
    * defines how this component handles rendering
  */
  render(c,camera) { throw new Error('must be implemented by subclass!');}
}
