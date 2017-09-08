/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Virtual manager class that is responsible in managing a single component behavior.
*/
export class Manager {
  constructor() {
    this.owner = null;
    this.managed = [];
    this.profiles = {render:{on:1, now:0}};
  }

  /**
    * assigns an component to be managed by the manager
    * @param {Component} component - component to manage.
    * @param {Profile} profile - profile to manage the component
    *   @returns {Manager} itself
  */
  manage(component){
    component.manager = this;
    this.managed.push(component);
    return this;
  }

  /*
    * assign managed profile
    * @param {Profile} profile - profile to manage the component using
    *   @returns {Component} itself
  */
  adopt(profiles){
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
  initialise(){
    for (var i = 0; i < this.managed.length; i++) {
      if(this.managed[i].hasOwnProperty("initialise")){
        this.managed[i].initialise.call(this.managed[i].owner);
      }
    }
  }

  /*
    * @virtual
    * determines wheather the managed components should process based on the process profile
    *   @returns {bool} should
  */
  shouldUpdate(){
    return (!this.profiles["process"])?true:
           (this.profiles["process"].now == this.profiles["process"].on);
  }

  /*
    *logic before processing each managed component
  */
  //buggy!
  beforeUpdate(){
    if(!this.profiles["process"]) return;
    this.profiles.process.now++;
    if(this.profiles.process.now>this.profiles.process.on){
      this.profiles.process.now=0;
    }
  }


  /**
    * Subsequently process all of the managed components
  */
  update(){
    this.beforeUpdate();
    if(this.shouldUpdate()){
      for (var i = 0; i < this.managed.length; i++) {
        if(this.managed[i].hasOwnProperty("process")){
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
  shouldRender(){
    return (!this.profiles["render"])?true :
           (this.profiles["render"].now == this.profiles["render"].on);
  }

  /*
    * component logic before rendering
  */
  beforeRender(){
    this.profiles.render.now++;
    if(this.profiles.render.now>this.profiles.render.on){
      this.profiles.render.now=0;
    }
  }

  /**
    * Subsequently renders all of the managed components
  */
  render(c,camera){
    this.beforeRender();
    if(true){//this.shouldRender()){
      for (var i = 0; i < this.managed.length; i++) {
        if(this.managed[i].hasOwnProperty("render"))
          this.managed[i].render.call(this.managed[i].owner,c,camera);
        }
    }
  }
}
