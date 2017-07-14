import {IGame} from '../model/game'
import {Vector2} from '../classes/vector2'


export function render(ctx, game:IGame){


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    const snakeHead = game.snake.segments[0];
    const center = new Vector2(
        snakeHead.x - ctx.canvas.width/2,
        snakeHead.y - ctx.canvas.height/2
    );


    //=============================================
    for(let food of game.food){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            food.position.x-center.x,//+Math.cos(duration/100)*10,
            food.position.y-center.y,//+Math.sin(duration/200)*10,

            food.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();




    }
    //=============================================


    //=============================================
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap="round";
    ctx.beginPath();

    let lastSegment,i=0;
    for(let thisSegment of game.snake.segments){

        i++;

        if(lastSegment){
            ctx.fillStyle = this.color;
            ctx.lineWidth = Math.sqrt(game.snake.segments.length-i);//todo via real length
            ctx.lineCap="round";
            ctx.beginPath();


            ctx.moveTo(lastSegment.x-center.x,lastSegment.y-center.y);
            ctx.lineTo(thisSegment.x-center.x,thisSegment.y-center.y);
            ctx.stroke();
        }
        lastSegment = thisSegment;

    }
    //=============================================

}