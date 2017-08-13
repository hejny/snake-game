import {Vector2} from '../classes/vector2'


export interface ISnake{
    length: number,
    headRotation: number;
    segments: Vector2[];
}
export interface IFood{
    position: Vector2;
    rotation: number;
    size: number;
    speed: number;
    away: boolean;
}
/*export enum IWallType {
    WALL,
    SPACE
}*/
export interface IWall{
    position: Vector2;
    size: Vector2;
    corners: {
        a:number,
        b:number,
        c:number,
        d:number
    }
    //type: IWallType
}

export enum IGamePhase {
    //BEFORE,
    PLAY,
    PAUSE,
    //AFTER
}
export interface IGame{
    started: number;
    updated: number;
    phase: IGamePhase;
    score: number;
    snake: ISnake;
    foods: IFood[];
    walls: IWall[];
}

//todo separate files for snake, food, wall
export function wallCollide(wall:IWall,point:Vector2,bounds:number=0):boolean{
    return(
        wall.position.x+wall.size.x/2-bounds>=point.x &&
        wall.position.y+wall.size.y/2-bounds>=point.y &&
        wall.position.x-wall.size.x/2+bounds<=point.x &&
        wall.position.y-wall.size.y/2+bounds<=point.y
    )
}

/*export function wallMirror(wall:IWall,point:Vector2):Vector2{
    if(!(wall.position.x+wall.size.x/2>=point.x))return new Vector2(point.x-wall.size.x,point.y);
    if(!(wall.position.y+wall.size.y/2>=point.y))return new Vector2(point.x,point.y-wall.size.y);
    if(!(wall.position.x-wall.size.x/2<=point.x))return new Vector2(point.x+wall.size.x,point.y);
    if(!(wall.position.y-wall.size.y/2<=point.y))return new Vector2(point.x,point.y+wall.size.y);
}*/


export function wallSnap(wall:IWall,point:Vector2,bounds:number=0):Vector2{
    let x = point.x;
    let y = point.y;
    if(wall.position.x+wall.size.x/2-bounds<point.x)x=wall.position.x+wall.size.x/2-bounds;
    if(wall.position.y+wall.size.y/2-bounds<point.y)y=wall.position.y+wall.size.y/2-bounds;
    if(wall.position.x-wall.size.x/2+bounds>point.x)x=wall.position.x-wall.size.x/2+bounds;
    if(wall.position.y-wall.size.y/2+bounds>point.y)y=wall.position.y-wall.size.y/2+bounds;
    return new Vector2(x,y);
}

export function wallOnCorner(wall:IWall,point:Vector2,bounds:number=0):boolean{
    let corners = 0;
    if(wall.position.x+wall.size.x/2-bounds<point.x)corners++;
    if(wall.position.y+wall.size.y/2-bounds<point.y)corners++;
    if(wall.position.x-wall.size.x/2+bounds>point.x)corners++;
    if(wall.position.y-wall.size.y/2+bounds>point.y)corners++;
    return corners>=2;
}

export function wallCollideOnlyLine(wall:IWall,point:Vector2,bounds:number=0):boolean{
    if(wallOnCorner(wall,point,bounds)){
        return(true);
    }else{
        return(wallCollide(wall,point,bounds));
    }
}

export function wallSnapOnlyLine(wall:IWall,point:Vector2,bounds:number=0):Vector2{
    if(wallOnCorner(wall,point,bounds)){
        return(point);
    }else{
        return(wallSnap(wall,point,bounds));
    }
}


function createRandomCorners(){
    return {
        a: Math.floor(Math.random()*1000)%10,
        b: Math.floor(Math.random()*1000)%10,
        c: Math.floor(Math.random()*1000)%10,
        d: Math.floor(Math.random()*1000)%10
    }
}

export function createGame():IGame{


    let walls=[];

    walls.push({
        position: new Vector2(0,0),
        size: new Vector2(500,500),
        corners: createRandomCorners()
    });

    walls.push({
        position: new Vector2(0,250),
        size: new Vector2(250,1000),
        corners: createRandomCorners()
    });


    walls.push({
        position: new Vector2(0,0),
        size: new Vector2(10000,100),
        corners: createRandomCorners()
    });










    const bounds = 20;
    const foodsRatio = 0.002;
    let foods=[];

    for(let wall of walls){

        const volume = wall.size.x * wall.size.y;
        let volumeFoods = 0;

        while (volumeFoods < volume*foodsRatio) {

            const size = Math.random()*10+10;
            const speed = (Math.random()+0.5)*0.1;

            volumeFoods += Math.PI*size*size/4;

            foods.push({
                position:Vector2.random(wall.size.x-bounds*2,wall.size.y-bounds*2,wall.position.x,wall.position.y),
                rotation:0,
                size,speed,
                away: false
            });

        }
    }


    /*for (var i = 0; i < 100; i++) {
        foods.push({
            position:Vector2.random(500,500),
            size: Math.random()*10+10,
        });
    }*/





    /*walls.push({
        position: new Vector2(250,0),
        size: new Vector2(10,500),
    });
    walls.push({
        position: new Vector2(-250,0),
        size: new Vector2(10,500),
    });
    walls.push({
        position: new Vector2(0,250),
        size: new Vector2(500,10),
    });
    walls.push({
        position: new Vector2(0,-250),
        size: new Vector2(500,10),
    });*/

    /*for (var i = 0; i < 100; i++) {
        walls.push({
            position:Vector2.random(500,500),
            size: Vector2.random(50,50),
        });
    }*/



    return {

        started: (new Date()).getTime(),
        updated: null,


        phase: IGamePhase.PLAY,
        score: 0,


        snake: {

            length: 300,
            headRotation: 0,
            segments:[
                {x: 0, y: 0}
            ]


        },
        foods,
        walls

    };


};