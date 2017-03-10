/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a scene manager managing the scenes of a game
*/
class SceneManager {
  constructor() {
    this.scenes = [];
  }

  /*
    * adds a given scene to the list of scenes
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  add(scene){
    this.scenes.push(scne);
    return this;
  }

  /*
    * gets the first scene that matches the id
    * @param {Scene} scene - the scene to add
    *   @returns {Sprite} itself
  */
  get(id){
    for(var i=0;i<this.scenes.length;i++)
      if(this.scenes[i].id==id)
        return this.scenes[i];
    return null;
  }

  /*
    * removes the first scene that matches the id
    * @param {string} id - the id of the scene to remove
    *   @returns {Scene} the removed scene
  */
  remove(id){
    return this.scenes.splice(this.scenes.indexof(this.get(id)),1);
  }
}
