import {Vector2} from './vector2';

export class Snake {
    constructor(public segments: Vector2[],public move: Vector2, public size:number, public color='#000') {
    }

    get head(): Vector2{
        return this.segments[0];//this.segments[this.segments.length-1];
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        this.segments.forEach((segment,index)=>{
            ctx[index===0?'moveTo':'lineTo'](segment.x,segment.y);
        });

        ctx.stroke();


        /*this.segments.forEach((segment,index)=>{
         ctx.fillStyle = 'black';
         ctx.beginPath();
         ctx.arc(segment.x, segment.y, 40 / 2, 0, Math.PI * 2, true);
         ctx.closePath();
         ctx.fill();
         });*/



    }

    update(ms) {

        this.move.y *= Math.pow(0.9, ms / 1000); //Friction
        this.move.x *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.y += 10; //Gravity

        const newHead = new Vector2(
            this.head.x + this.move.x * ms / 1000,
            this.head.y + this.move.y * ms / 1000
        )

        let newSegments = [];
        newSegments.push(newHead);


        let i=0,l=Math.min(this.segments.length,100)
        for(;i<l;i++){
            newSegments.push(this.segments[i]);
        }

        this.segments = newSegments;

        //console.log(this.segments);

    }

}
