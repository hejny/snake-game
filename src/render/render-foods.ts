import {IFood} from '../model/game'
import {Vector2} from '../classes/vector2'
import {ImageCollection} from '../classes/image-collection'



/*
function pad(number:number,digits:number) {
    return (new Array(digits).join('0')+number).slice(-digits);
}





const imgsOrigs = [];

for(let i=1;i<=100;i++){

    const imgOrig = document.createElement("img");
    //todo onload
    //todo process.env.PUBLIC_URL
    imgOrig.src = `/assets/images/objects/mouse/mouse-${pad(i,4)}.png`;

    imgsOrigs.push(imgOrig);

}*/
const images = new ImageCollection('/assets/images/objects/mouse/mouse-$.png',100);




//todo correct english word foods?
export function renderFoods(ctx:CanvasRenderingContext2D, foods:IFood[], durationGame:number, center:Vector2){


    for(let food of foods){

        const index = Math.floor(durationGame*food.speed)%100;
        images.drawImage(ctx,index,new Vector2(food.position.x-center.x, food.position.y-center.y),100,food.rotation);


        //ctx.translate(center.x, center.y);
        //context.rotate(0.5);
        //ctx.rotate(0.0005);


        /*const index = Math.floor(durationGame*food.speed)%100;
        const imgOrig = imgsOrigs[index];

        //console.log(imgsOrigs,index,imgOrig);



        const imgOrigDiagonal = Math.sqrt(Math.pow(200,2)+Math.pow(400,2));
        const tx = imgOrigDiagonal/2,
              ty = imgOrigDiagonal/2;

        var canvas = document.createElement("canvas");
        canvas.width = imgOrigDiagonal;
        canvas.height = imgOrigDiagonal;

        const ctxX = canvas.getContext('2d');
        //ctxX.fillStyle = 'red';
        //ctxX.fillRect(0,0,1000,1000);
        ctxX.translate(tx,ty);
        ctxX.rotate(food.rotation+Math.PI/2);
        ctxX.drawImage(imgOrig,-100,-200,200,400);
        ctxX.translate(-tx,-ty);




        ctx.drawImage(canvas,
            food.position.x-center.x-50,
            food.position.y-center.y-50,
            100,100
        );*/



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