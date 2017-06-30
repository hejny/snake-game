import {Vector2} from './vector2';


export class Ball {
    constructor(public position: Vector2,public move: Vector2, public size:number, public color='#000') {
    }

    draw(ctx:CanvasRenderingContext2D,duration:number) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.position.x,//+Math.cos(duration/100)*10,
            this.position.y,//+Math.sin(duration/200)*10,

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

}