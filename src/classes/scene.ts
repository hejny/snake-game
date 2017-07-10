import {Vector2} from './vector2';

export class Scene {

    public objects:any[];//todo object

    constructor(public ctx, public cameraPosition: Vector2) {
        this.objects = [];
    }



    addObject(object) {
        this.objects.push(object);
    }

    update(ms) {


        this.objects.forEach(function(object) {

            object.update(ms);

            /*
             //Bottom border
             if (object.position.y >= ctx.canvas.height - object.size / 2) {
             object.position.y = ctx.canvas.height - object.size / 2;
             object.move.y = -object.move.y * 0.9; //Bounce
             } else
             //Top border
             if (object.position.y <= 0 + object.size / 2) {
             object.position.y = 0 + object.size / 2;
             object.move.y = -object.move.y * 0.9; //Bounce
             }
             //Right border
             if (object.position.x >= ctx.canvas.height - object.size / 2) {
             object.position.x = ctx.canvas.width - object.size / 2;
             object.move.x = -object.move.x * 0.9; //Bounce
             } else
             //Left border
             if (object.position.x <= 0 + object.size / 2) {
             object.position.x = 0 + object.size / 2;
             object.move.x = -object.move.x * 0.9; //Bounce
             }
             */

        });

    }

    getContext():CanvasRenderingContext2D{
        return this.ctx;
    }

    countCanvasPosition(scenePosition:Vector2):Vector2{
        return Vector2.add(Vector2.subtract(scenePosition,this.cameraPosition),new Vector2(this.ctx.canvas.width/2,this.ctx.canvas.height/2));
    }


    draw(duration:number) {

        //console.log(duration);

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const self = this;
        this.objects.forEach((object)=>{

            object.draw();

        });
    }

}