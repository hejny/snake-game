import {Vector2} from './vector2';
import {Scene} from './scene';





export class Snake {

    public speed:number;

    constructor(public scene:Scene,public segments: Vector2[],public headRotation: number, public size:number, public color='#000') {
        this.speed = 100;
    }

    toJSON(){
        return this.segments;
    }

    get head(): Vector2{
        return this.segments[0];//this.segments[this.segments.length-1];
    }

    draw() {


        const ctx = this.scene.getContext();
        //const canvasPosition = scene.countCanvasPosition(this.position);


        ctx.fillStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap="round";
        ctx.beginPath();

        /*this.segments.forEach((segment,index)=>{
            ctx[index===0?'moveTo':'lineTo'](segment.x,segment.y);
        });

        ctx.stroke();*/



        let lastSegment,i=0;
        for(let thisSegment of this.segments){

            i++;

            if(lastSegment){
                ctx.fillStyle = this.color;
                ctx.lineWidth = Math.sqrt(this.segments.length-i);
                ctx.lineCap="round";
                ctx.beginPath();

                const lastSegmentCanvas = this.scene.countCanvasPosition(lastSegment);
                const thisSegmentCanvas = this.scene.countCanvasPosition(thisSegment);

                ctx.moveTo(lastSegmentCanvas.x,lastSegmentCanvas.y);
                ctx.lineTo(thisSegmentCanvas.x,thisSegmentCanvas.y);
                ctx.stroke();
            }
            lastSegment = thisSegment;


        }




        /*this.segments.forEach((segment,index)=>{
         ctx.fillStyle = 'black';
         ctx.beginPath();
         ctx.arc(segment.x, segment.y, 40 / 2, 0, Math.PI * 2, true);
         ctx.closePath();
         ctx.fill();
         });*/



    }

    update(duration,ms) {


        //this.move.y *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.x *= Math.pow(0.9, ms / 1000); //Friction
        //this.move.y += 10; //Gravity


        //const snakeSin = Math.sin(duration*10000)*0.7;

        const newHead = new Vector2(
            this.head.x + Math.cos(this.headRotation)* this.speed * ms / 1000,
            this.head.y + Math.sin(this.headRotation)* this.speed * ms / 1000
        );

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
