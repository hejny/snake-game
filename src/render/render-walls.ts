import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'


export function renderWalls(ctx:CanvasRenderingContext2D, walls:IWall[], center:Vector2){
    for(let wall of walls){
        ctx.fillStyle = 'white';//this.color;
        ctx.fillRect(
            wall.position.x-wall.size.x/2-center.x,
            wall.position.y-wall.size.y/2-center.y,
            wall.size.x,
            wall.size.y

        );
    }
}