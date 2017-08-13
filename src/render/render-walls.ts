import {IWall} from '../model/game'
import {Vector2} from '../classes/vector2'



function pad(number:number,digits:number) {
    return (new Array(digits).join('0')+number).slice(-digits);
}
const imgsOrigs = [];

for(let i=1;i<=10;i++){

    const imgOrig = document.createElement("img");
    //todo onload
    //todo process.env.PUBLIC_URL
    imgOrig.src = `/assets/images/objects/corner/corner-${pad(i,4)}.png`;

    imgsOrigs.push(imgOrig);

}



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




            ctx.drawImage(imgsOrigs[wall.corners.a],
                wall.position.x - wall.size.x / 2 - center.x-50,
                wall.position.y - wall.size.y / 2 - center.y-50,
                100,100
            );


            //ctx.fillStyle = '#ff0000';
            /*ctx.fillRect(
                wall.position.x - wall.size.x / 2 - center.x-50,
                wall.position.y - wall.size.y / 2 - center.y-50,
                100,
                100
            );*/



        }else
        if(layer===1) {

            /*const cx = ctx.canvas.width/2;
            const cy = ctx.canvas.height/2;


            const bx = (wall.position.x-center.x-cx)/cx*20;
            const by = (wall.position.y-center.y-cy)/cy*20;*/
            const bx=0,by=0;




            ctx.fillStyle = '#ffffff';
            ctx.fillRect(
                wall.position.x - (wall.size.x - 20) / 2 - bx - center.x ,
                wall.position.y - (wall.size.y - 20) / 2 - by - center.y ,
                wall.size.x - 20,
                wall.size.y - 20
            );

        }
    }
}