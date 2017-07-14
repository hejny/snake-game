import {Vector2} from '../classes/vector2'


export interface IGame{
    started: number;
    updated: number;
    running: boolean;
    score: number;
    snake: {
        length: number,
        headRotation: number;
        segments: Vector2[];
    };
    food: {
        position: Vector2;
        size: number;
    }[];
}







export function createGame():IGame{



    let food=[];
    for (var i = 0; i < 100; i++) {
        food.push({
            position:Vector2.random(500,500),
            size: Math.random()*10+10,
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
        food

    };


};