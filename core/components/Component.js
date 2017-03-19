/**
 * @abstract
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor() {
  }

  responds(manager){
    this.manager = manager;
    return this;
  }
}
