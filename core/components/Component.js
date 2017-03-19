/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor() {
    this.manager = null;
  }

  /**
    * assigns an manager to manage this component
    * @param {Manager} manager - Manager to manage this component.
    *   @returns {Manager} itself
  */
  responds(manager){
    this.manager = manager;
    return this;
  }

  /**
    * update all of the properties related this componet
  */
  tick(){
    throw new Error('must be implemented by subclass!');
  }

}
