/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor() {
    this.profiles = {process:{update:1, current:0}};
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
    * assign managed profile
    * @param {Profile} profile - profile to manage the component using
    *   @returns {Component} itself
  */
  profile(profiles){
    for (var profile in profiles) {
      if (profiles.hasOwnProperty(profile)) {
          this.profiles[profile] = profiles[profile];
      }
    }
    return this;
  }

  /*
    * determines wheather the component should process based on the last profile
    *   @returns {bool} should
  */
  shouldProcess(){
    return (this.profiles["process"].current == this.profiles["process"].update);
  }

  /*
    * defines how the component state change on one update
  */
  process() { throw new Error('must be implemented by subclass!'); }

  /*
    * defines how this component handles rendering
  */
  render() { throw new Error('must be implemented by subclass!');}
}
