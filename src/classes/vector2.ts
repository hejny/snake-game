export class Vector2 {

    static distance(vectorA:Vector2,vectorB:Vector2){
        return(Math.sqrt(Math.pow(vectorA.x-vectorB.x,2)+Math.pow(vectorA.y-vectorB.y,2)))
    }


    static add(vectorA:Vector2,vectorB:Vector2){
        return(new Vector2(
            vectorA.x+vectorB.x,
            vectorA.y+vectorB.y
        ));
    }

    static subtract(vectorA:Vector2,vectorB:Vector2){
        return(new Vector2(
            vectorA.x-vectorB.x,
            vectorA.y-vectorB.y
        ));
    }

    static random(rangeX,rangeY,centerX=0,centerY=0){
        return(new Vector2(
            (Math.random()-0.5)*rangeX+centerX,
            (Math.random()-0.5)*rangeY+centerY
        ))
    }

    static randomCircle(center:Vector2,maxRadius:number){

        const rotation = Math.random()*Math.PI*2;
        const radius = Math.random()*maxRadius;

        return(new Vector2(
            center.x + Math.cos(rotation)*radius,
            center.y + Math.sin(rotation)*radius
        ))
    }

    constructor(public x:number, public y:number) {
    }

    get distance0(){
        return(Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)));
    }

    get rotation0(){
        return(Math.atan2(this.y,this.x));
    }


}
