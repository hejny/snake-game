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


    //todo better
    const snakeLengthSum = (()=> {
        let lastSegment, i = 0, snakeLengthSum = 0;
        for (let thisSegment of game.snake.segments) {
            i++;
            if (lastSegment) {
                snakeLengthSum += Math.sqrt(Math.pow(lastSegment.y - thisSegment.y, 2) + Math.pow(lastSegment.x - thisSegment.x, 2));
            }
            lastSegment = thisSegment;
        }
        return snakeLengthSum;
    })();


    let lastMoveBy=new Vector2(0,0);
    let lastSegment,i=0,snakeLength=0;
    for(let thisSegment of game.snake.segments){

        i++;

        if(lastSegment){

            snakeLength += Math.sqrt(Math.pow(lastSegment.y-thisSegment.y,2)+Math.pow(lastSegment.x-thisSegment.x,2));
            const snakeFromHead = snakeLengthSum-snakeLength;

            const amplitude = Math.min(Math.sqrt(snakeLength/10),5),
                  periode = 10,
                  shift = ((new Date()).getTime()-game.started)/100//todo pure
            ;

            const rotation = Math.PI/2 + Math.atan2(lastSegment.y-thisSegment.y,lastSegment.x-thisSegment.x);
            const amplitude2 = Math.sin(snakeLength/periode+shift)*amplitude;

            const thisMoveBy = new Vector2(
                Math.cos(rotation)*amplitude2,
                Math.sin(rotation)*amplitude2
            );

            ctx.fillStyle = this.color;
            ctx.lineWidth = Math.sqrt(snakeFromHead);//todo via real length
            ctx.lineCap="round";
            ctx.beginPath();






            ctx.moveTo(lastSegment.x-center.x+lastMoveBy.x,lastSegment.y-center.y+lastMoveBy.y);
            ctx.lineTo(thisSegment.x-center.x+thisMoveBy.x,thisSegment.y-center.y+thisMoveBy.y);
            ctx.stroke();
            lastMoveBy = thisMoveBy;
        }
        lastSegment = thisSegment;

    }
    //=============================================

}