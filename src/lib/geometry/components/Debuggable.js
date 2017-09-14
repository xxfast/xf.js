import {Component} from '../../core/components/Component'

/**
 * @author - Isuru Kusumal Rajapakse (xxfast)
 * @description - Represents a component that help us developers to debug
 */
export class DebuggablePolygon extends Component {
    constructor(owner) {
        super(owner);
        this.debug = { enabled:false,
            drawCollisionMask:false,
            drawBounds:true,
            drawCenter: true,
            drawContainer: true };
    }

    /*
     * enable/disable debugging parameters in the debugging mode
     *   @returns {GameObject} itself
     */
    debug(){
        for(var propt in obj.debug){
            obj.debug[propt] = !obj[propt] ;
        }
        return this;
    }

    /*
     * enable/disable debugging parameters in the debugging mode
     *   @returns {GameObject} itself
     */
    render(c,camera){
        if(this.debug){
            if(this.debug.drawBounds){
                c.strokeStyle="red";
                var xboffset = ((this.position.x+this.bounderies.left)*cwratio);
                var yboffset = ((this.position.y+this.bounderies.top)*chratio);
                c.strokeRect((xboffset-xcoffset),(yboffset-ycoffset),this.scale.width*cwratio,this.scale.height*chratio); // draw the bounding boxes
            }
            if(this.debug.drawCenter){
                c.fillStyle="yellow";
                var xooffset = ((this.position.x+ this.origin.x - 2)*cwratio);
                var yooffset = ((this.position.y+ this.origin.y - 2)*chratio);
                c.fillRect((xooffset-xcoffset) , (yooffset-ycoffset), 4,4 ); // draw the bounding boxes
            }
        }
    }

}

