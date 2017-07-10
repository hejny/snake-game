import {Vector2} from './vector2';
import {Scene} from './scene';


export class Ball {

    public disposed:boolean;

    constructor(public scene:Scene,public position: Vector2,public move: Vector2, public size:number, public color='#000') {
        this.disposed = false;
    }

    draw() {

        if(this.disposed)return;

        const ctx = this.scene.getContext();
        const canvasPosition = this.scene.countCanvasPosition(this.position);

        console.log();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            canvasPosition.x,//+Math.cos(duration/100)*10,
            canvasPosition.y,//+Math.sin(duration/200)*10,

            this.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    update(ms) {

        this.move.y *= Math.pow(0.9, ms / 1000); //Friction
        this.move.x *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.y += 10; //Gravity

        this.position.x += this.move.x * ms / 1000;
        this.position.y += this.move.y * ms / 1000;
    }


    dispose(){
        this.disposed = true;
    }

}