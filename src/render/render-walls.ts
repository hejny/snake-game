import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'


export function renderWalls(ctx:CanvasRenderingContext2D, layer:number, walls:IWall[], center:Vector2){
    for(let wall of walls){

        if(layer===2) {
            ctx.fillStyle = '#cccccc';
            ctx.fillRect(
                wall.position.x - wall.size.x / 2 - center.x,
                wall.position.y - wall.size.y / 2 - center.y,
                wall.size.x,
                wall.size.y
            );
        }else
        if(layer===1) {

            //const cx = ctx.canvas.width/2;
            //const cy = ctx.canvas.height/2;


            ctx.fillStyle = '#ffffff';
            ctx.fillRect(
                wall.position.x - (wall.size.x - 20) / 2 - center.x ,
                wall.position.y - (wall.size.y - 20) / 2 - center.y ,
                wall.size.x - 20,
                wall.size.y - 20
            );

        }
    }
}