import {IFood} from '../model/game'
import {Vector2} from '../classes/vector2'

//todo correct english word foods?
export function renderFoods(ctx:CanvasRenderingContext2D, foods:IFood[], center:Vector2){


    for(let food of foods){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(
            food.position.x-center.x,//+Math.cos(duration/100)*10,
            food.position.y-center.y,//+Math.sin(duration/200)*10,

            food.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();




    }

}