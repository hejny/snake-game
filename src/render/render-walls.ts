import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'
import {ImageCollection} from '../classes/image-collection'

//const images = new ImageCollection('/assets/images/objects/corner/corner-$.png',10);

export function renderWalls(ctx:CanvasRenderingContext2D, walls:IWall[], center:Vector2){
    for(const wall of walls){



        ctx.fillStyle = '#dddddd'//'#cccccc';
        ctx.beginPath();
        ctx.arc(
            wall.position.x- center.x,
            wall.position.y - center.y,
            wall.radius,
            0,
            Math.PI*2
        );
        ctx.fill();

    }
}