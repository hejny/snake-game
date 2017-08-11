import {IFood} from '../model/game'
import {Vector2} from '../classes/vector2'



var imgOrig = document.createElement("img");
var img = document.createElement("canvas");
//todo onload
//todo process.env.PUBLIC_URL
imgOrig.setAttribute('src', '/assets/images/objects/mouse/1.png');


img.getContext('2d');

//ctx.translate(image.width/2,image.height/2);
//ctx.rotate(degrees*Math.PI/180);
//ctx.drawImage(image,0,0,image.width,image.height,-image.width/2,-image.height   /2,image.width,image.height);
//ctx.restore();






//todo correct english word foods?
export function renderFoods(ctx:CanvasRenderingContext2D, foods:IFood[], center:Vector2){


    for(let food of foods){


        ctx.drawImage(imgOrig,
            food.position.x-center.x,
            food.position.y-center.y,
            50,
            100
        );



        /*ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(
            food.position.x-center.x,//+Math.cos(duration/100)*10,
            food.position.y-center.y,//+Math.sin(duration/200)*10,

            food.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();*/




    }

}