import {Vector2} from './vector2';

export class Snake {

    public speed:number;

    constructor(public segments: Vector2[],public headRotation: number, public size:number, public color='#000') {
        this.speed = 100;
    }

    get head(): Vector2{
        return this.segments[0];//this.segments[this.segments.length-1];
    }

    draw(ctx:CanvasRenderingContext2D,duration:number) {

        ctx.fillStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap="round";
        ctx.beginPath();

        /*this.segments.forEach((segment,index)=>{
            ctx[index===0?'moveTo':'lineTo'](segment.x,segment.y);
        });

        ctx.stroke();*/



        let lastSegment,i=0;
        for(let segment of this.segments){

            i++;

            if(lastSegment){
                ctx.fillStyle = this.color;
                ctx.lineWidth = Math.sqrt(this.segments.length-i);
                ctx.lineCap="round";
                ctx.beginPath();
                ctx.moveTo(lastSegment.x,lastSegment.y);
                ctx.lineTo(segment.x,segment.y);
                ctx.stroke();
            }
            lastSegment = segment;


        }




        /*this.segments.forEach((segment,index)=>{
         ctx.fillStyle = 'black';
         ctx.beginPath();
         ctx.arc(segment.x, segment.y, 40 / 2, 0, Math.PI * 2, true);
         ctx.closePath();
         ctx.fill();
         });*/



    }

    update(ms) {


        //this.move.y *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.x *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.y += 10; //Gravity

        const newHead = new Vector2(
            this.head.x + Math.cos(this.headRotation)* this.speed * ms / 1000,
            this.head.y + Math.sin(this.headRotation)* this.speed * ms / 1000
        )

        let newSegments = [];
        newSegments.push(newHead);


        let i=0,l=Math.min(this.segments.length,this.size);
        for(;i<l;i++){
            newSegments.push(this.segments[i]);
        }

        this.segments = newSegments;

        //console.log(this.segments);

    }

}
