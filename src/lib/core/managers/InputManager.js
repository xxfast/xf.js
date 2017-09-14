/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a input manager managing the inputs of a game
 */

import {Manager} from '../../core/managers/Manager'

export class InputManager extends Manager {
    constructor(owner) {
        super();
        this.owner = owner;
        this.mouse = {  position: {x:0, y:0},
                        down: { left: false, middle: false, right:false },
                        up: { left: false, middle: false, right:false } };
        this.key =  {
                        down: [],
                        up: []
                    };
        this.initialise();
    }


    /*
     * resets the triggers
     *   @returns {InputManager} self
     */
    reset(){
        this.mouse = {  position: this.mouse.position,
            down: { left: false, middle: false, right:false },
            up: { left: false, middle: false, right:false } };
        return this;
    }

    /*
     * initialises the input manager's context
     *   @returns {InputManager} self
     */
    initialise() {
        var callback = this;
        document.onmousemove = function(e){
            callback.mouse.position.x = e.pageX;
            callback.mouse.position.y = e.pageY;
        };
        document.onmousedown = function (e){
            e = e || window.event;
            switch (e.which) {
                case 1:
                    callback.mouse.down.left = true;
                    break;
                case 2:
                    callback.mouse.down.middle = true;
                    break;
                case 3:
                    callback.mouse.down.right = true;
                    break;
            }
        };
        document.onmouseup = function (e){
            e = e || window.event;
            switch (e.which) {
                case 1:
                    callback.mouse.up.left = true;
                    break;
                case 2:
                    callback.mouse.up.middle = true;
                    break;
                case 3:
                    callback.mouse.up.right = true;
                    break;
            }
        };
        document.onkeydown = function (e) {
            var char = event.which || event.keyCode;
            callback.key.down[char] = true;
            callback.key.up[char] = false;
        };
        document.onkeyup = function (e) {
            var char = event.which || event.keyCode;
            callback.key.up[char] = true;
            callback.key.down[char] = false;
        };
        return this;
    }

    /**
     *  processes the inputs on the game
     */
    process(){
        this.reset();
    }
}