import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'


export function renderWalls(ctx:CanvasRenderingContext2D, walls:IWall[], center:Vector2){
    for(let wall of walls){
        ctx.fillStyle = this.color;
        ctx.fillRect(
            wall.position.x-center.x,
            wall.position.y-center.y,
            wall.size.x,
            wall.size.y

        );
    }
}