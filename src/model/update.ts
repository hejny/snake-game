import {IGame,wallCollide, IGamePhase} from './game'
import {Vector2} from '../classes/vector2'

//todo should thare be gamee DI?
export function update(game:IGame,cursorRotation:number):IGame{


    const lastUpdated = game.updated || game.started;
    game.updated = (new Date()).getTime();//todo pure

    const durationGame = game.updated - game.started;
    const durationTick = game.updated - lastUpdated;


    //console.log(durationTick);

    if(game.phase === IGamePhase.PLAY) {


        game.snake.headRotation = cursorRotation;



        //=============================================
        const speed = 100;
        const oldHead = game.snake.segments[0];


        const newHead = new Vector2(
            oldHead.x + Math.cos(game.snake.headRotation) * speed * durationTick / 1000,
            oldHead.y + Math.sin(game.snake.headRotation) * speed * durationTick / 1000
        );



        let newSegments = [];
        newSegments.push(newHead);


        let lastSegment = newHead;
        let accumulatedLength = 0;
        let i = 0;

        while(accumulatedLength<game.snake.length && i<game.snake.segments.length) {

            let currentSegment = game.snake.segments[i];

            accumulatedLength += Vector2.distance(lastSegment,currentSegment);
            lastSegment = currentSegment;

            newSegments.push(currentSegment);

            i++;

        }

        /*let i = 0, l = Math.min(game.snake.segments.length, game.score);
        for (; i < l; i++) {
            newSegments.push(game.snake.segments[i]);
        }*/





        //todo pure
        game.snake.segments = newSegments;
        //=============================================


        //=============================================
        let newFoods = [];
        for (let food of game.foods) {
            if (Vector2.distance(newHead, food.position) < food.size) {

                game.score++;//todo pure
                game.snake.length+=10;//todo pure

            } else {
                newFoods.push(food);
            }
        }


        //todo pure
        game.foods = newFoods;
        //=============================================



        //=============================================

        let isOnWall = false;
        for (let wall of game.walls) {
            if (wallCollide(wall,newHead)) {
                isOnWall = true;
            }
        }
        if(!isOnWall){
            //alert(1);
             //IGamePhase.AFTER;
            return null;
        }
        //=============================================






    }

    return game;


}