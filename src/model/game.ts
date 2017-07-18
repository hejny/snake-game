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
export interface IWall{
    position: Vector2;
    size: Vector2;
}


export interface IGame{
    started: number;
    updated: number;
    running: boolean;
    score: number;
    snake: ISnake;
    foods: IFood[];
    walls: IWall[];
}






export function createGame():IGame{



    let foods=[];
    for (var i = 0; i < 100; i++) {
        foods.push({
            position:Vector2.random(500,500),
            size: Math.random()*10+10,
        });
    }




    let walls=[];
    for (var i = 0; i < 100; i++) {
        walls.push({
            position:Vector2.random(500,500),
            size: Vector2.random(50,50),
        });
    }



    return {

        started: (new Date()).getTime(),
        updated: (new Date()).getTime()+1000,


        running: false,
        score: 0,


        snake: {

            length: 100,
            headRotation: 0,
            segments:[
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: 2, y: 0}
            ]


        },
        foods,
        walls

    };


};