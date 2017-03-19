/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Virtual manager class that is responsible in managing a single component behavior.
*/
class Manager {
  constructor() {
    this.managed = [];
  }

  /**
    * assigns an component to be managed by the manager
    * @param {Component} component - component to manage.
    * @param {Profile} profile - profile to manage the component
    *   @returns {Manager} itself
  */
  manage(component, profile={update:1, current:0}){
    component.profile = profile;
    this.managed.push(component);
    return this;
  }

  /**
    * Subsequently update all of the managed components
  */
  update(){
    for (var i = 0; i < this.managed.length; i++) {
      this.managed[i].update();
    }
  }
}
