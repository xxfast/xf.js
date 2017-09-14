import {Component} from './Component'

/**
 * @virtual
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a identifiable components that defines a identifiable behavior
*/

export class Identifiable extends Component{
  constructor(owner, id) {
    super(owner);
    this.id = id;
  }

  /*
    * checks whether the given object is being identifed as the given id
    *   @returns {bool} amI?
  */
  identify(id){
    return (this.id==id);
  }

  /*
    * generates a unique identifiable id for a gameobject
    *   @returns {String} uniqueString
  */
  generate(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  /*
    * initialise the state of the component
  */
  initialise(){
    if(!this.id) this.id =  this.generate();
  }

}
