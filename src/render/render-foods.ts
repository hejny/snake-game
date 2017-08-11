import {IFood} from '../model/game'
import {Vector2} from '../classes/vector2'



var imgOrig = document.createElement("img");
//todo onload
//todo process.env.PUBLIC_URL
imgOrig.src = '/assets/images/objects/mouse/1.png';









//todo correct english word foods?
export function renderFoods(ctx:CanvasRenderingContext2D, foods:IFood[], center:Vector2){


    for(let food of foods){


        //ctx.translate(center.x, center.y);
        //context.rotate(0.5);
        //ctx.rotate(0.0005);



        var canvas = document.createElement("canvas");
        canvas.width = 50;//food.size*2;
        canvas.height = canvas.width * 2;
        const ctxX = canvas.getContext('2d');
        ctxX.translate(25,50);
        ctxX.rotate(food.rotation+Math.PI/2);
        ctxX.translate(-25,-50);
        ctxX.drawImage(imgOrig,0,0,canvas.width,canvas.height);





        ctx.drawImage(canvas,
            food.position.x-center.x,
            food.position.y-center.y
        );



        /*ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(
            food.position.x-center.x,//+Math.cos(duration/100)*10,
            food.position.y-center.y,//+Math.sin(duration/200)*10,

            food.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();*/


        //ctx.restore()




    }

}