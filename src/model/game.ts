import {Vector2} from '../classes/vector2'


export interface ISnake{
    length: number,
    headRotation: number;
    segments: Vector2[];
}
export interface IFood{
    position: Vector2;
    size: number;
}
/*export enum IWallType {
    WALL,
    SPACE
}*/
export interface IWall{
    position: Vector2;
    size: Vector2;
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
export function wallCollide(wall:IWall,point:Vector2):boolean{
    return(
        wall.position.x+wall.size.x/2>=point.x &&
        wall.position.y+wall.size.y/2>=point.y &&
        wall.position.x-wall.size.x/2<=point.x &&
        wall.position.y-wall.size.y/2<=point.y
    )
}





export function createGame():IGame{


    let walls=[];

    walls.push({
        position: new Vector2(0,0),
        size: new Vector2(500,500),
    });

    walls.push({
        position: new Vector2(0,250),
        size: new Vector2(250,1000),
    });




    const foodsRatio = 0.01;
    let foods=[];

    for(let wall of walls){

        const volume = wall.size.x * wall.size.y;
        let volumeFoods = 0;

        while (volumeFoods < volume*foodsRatio) {

            const size = Math.random()*10+10;

            volumeFoods += Math.PI*size*size/4;

            foods.push({
                position:Vector2.random(wall.size.x,wall.size.y,wall.position.x,wall.position.y),
                size
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
        updated: (new Date()).getTime()+1000,


        phase: IGamePhase.PLAY,
        score: 0,


        snake: {

            length: 100,
            headRotation: 0,
            segments:[
                {x: 0, y: 0}
            ]


        },
        foods,
        walls

    };


};