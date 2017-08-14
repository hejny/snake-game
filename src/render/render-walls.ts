import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'
import {ImageCollection} from '../classes/image-collection'

const images = new ImageCollection('/assets/images/objects/corner/corner-$.png',10);

export function renderWalls(ctx:CanvasRenderingContext2D, layer:number, walls:IWall[], durationGame:number, center:Vector2){
    for(let wall of walls){

        if(layer===2) {


            ctx.fillStyle = '#cccccc';
            ctx.fillRect(
                wall.position.x - wall.size.x / 2 - center.x,
                wall.position.y - wall.size.y / 2 - center.y,
                wall.size.x,
                wall.size.y
            );




            images.drawImage(ctx,wall.corners.a,new Vector2(wall.position.x - wall.size.x / 2 - center.x,wall.position.y - wall.size.y / 2 - center.y),100,Math.PI*(0/2));
            images.drawImage(ctx,wall.corners.b,new Vector2(wall.position.x + wall.size.x / 2 - center.x,wall.position.y - wall.size.y / 2 - center.y),100,Math.PI*(1/2));
            images.drawImage(ctx,wall.corners.c,new Vector2(wall.position.x + wall.size.x / 2 - center.x,wall.position.y + wall.size.y / 2 - center.y),100,Math.PI*(2/2));
            images.drawImage(ctx,wall.corners.d,new Vector2(wall.position.x - wall.size.x / 2 - center.x,wall.position.y + wall.size.y / 2 - center.y),100,Math.PI*(3/2));


        }else
        if(layer===1) {

            /*const cx = ctx.canvas.width/2;
            const cy = ctx.canvas.height/2;


            const bx = (wall.position.x-center.x-cx)/cx*20;
            const by = (wall.position.y-center.y-cy)/cy*20;*/
            const bx=0,by=0;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(
                wall.position.x - (wall.size.x - 10) / 2 - bx - center.x ,
                wall.position.y - (wall.size.y - 10) / 2 - by - center.y ,
                wall.size.x - 10,
                wall.size.y - 10
            );

        }
    }
}