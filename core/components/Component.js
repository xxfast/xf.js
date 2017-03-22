/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a base components that defines a behavior
*/
class Component {
  constructor() {
    this.profiles = {process:{on:1, now:0}};
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
  //{process:{on:1,now:0}
  profile(profiles){
    for (var profile in profiles) {
      if (profiles.hasOwnProperty(profile)) {
          this.profiles[profile] = profiles[profile];
          this.profiles[profile].now = 0;
      }
    }
    return this;
  }

  /*
    * @virtual
    * determines wheather the component should process based on the last profile
    *   @returns {bool} should
  */
  shouldProcess(){
    return (this.profiles["process"].now == this.profiles["process"].on);
  }

  /*
    * component logic before processing
  */
  //buggy!
  beforeProcess(){
    this.profiles.process.now++;
    if(this.profiles.process.now>this.profiles.process.on){
      this.profiles.process.now=0;
    }
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
