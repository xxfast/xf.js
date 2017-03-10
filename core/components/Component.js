/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor() {
    this.manager = null;
  }

  responds(manager){
    this.manager = manager;
    return this;
  }

}
