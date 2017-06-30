export class Vector2 {
    constructor(public x:number, public y:number) {
    }

    static distance(vectorA:Vector2,vectorB:Vector2){
        return(Math.sqrt(Math.pow(vectorA.x-vectorB.x,2)+Math.pow(vectorA.y-vectorB.y,2)))
    }
}
