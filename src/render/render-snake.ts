import {ISnake} from '../model/game'
import {Vector2} from '../classes/vector2'


export function renderSnake(ctx:CanvasRenderingContext2D, snake:ISnake, center:Vector2, gameDuration:number){

    ctx.fillStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap="round";
    ctx.beginPath();


    //todo better - maybe via reducer
    const snakeLengthSum = (()=> {
        let lastSegment, i = 0, snakeLengthSum = 0;
        for (let thisSegment of snake.segments) {
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
    for(let thisSegment of snake.segments){

        i++;

        if(lastSegment){

            snakeLength += Math.sqrt(Math.pow(lastSegment.y-thisSegment.y,2)+Math.pow(lastSegment.x-thisSegment.x,2));
            const snakeFromHead = snakeLengthSum-snakeLength;

            const amplitude = Math.min(Math.sqrt(snakeLength/10),5),
                periode = 10,
                shift = gameDuration/100//todo pure
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

}