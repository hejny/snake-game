import {IGame, wallCollide, IGamePhase, IWall, spawnRandomFoods} from './game'
import {Vector2} from '../classes/vector2'
//import {Line2} from "../classes/line2";
import {BOUNDS, WALL_GROWTH_SPEED} from "../config";


function rotationStep(myRotation:number,targetRotation:number,step:number):number{

    const diff1 = (myRotation-targetRotation+10*(Math.PI*2))%(Math.PI*2); //todo better
    const diff2 = (targetRotation-myRotation+10*(Math.PI*2))%(Math.PI*2); //todo better

    if(Math.abs(diff2)<=step)return targetRotation;

    if(diff1>diff2){
        return(myRotation+step);
    }else{
        return(myRotation-step);
    }
}




//todo should thare be gamee DI?
export function update(game:IGame,cursorRotation:number):IGame{


    const lastUpdated = game.updated || game.started;
    game.updated = (new Date()).getTime();//todo pure

    const durationGame = game.updated - game.started;
    const durationTick = Math.min(game.updated - lastUpdated,100);


    //console.log(durationTick);

    if(game.phase === IGamePhase.PLAY) {



        //=============================================Snake rotation
        game.snake.headRotation = rotationStep(game.snake.headRotation,cursorRotation,0.006 * durationTick);
        //=============================================






        //=============================================Snake movement
        const speed = Math.sqrt(game.score)*70;//todo better equation of snake speed
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





        //=============================================Collision on food
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




        //=============================================Collision on walls

        let isOnWall = false;
        for (let wall of game.walls) {//todo via some
            if (wallCollide(wall,newHead)) {
                isOnWall = true;
            }
        }
        if(!isOnWall){
            console.log('Collision on walls');
            return null;//todo it should return game with end state
        }
        //=============================================



        //=============================================Collision on snake
        /*let lastPoint:Vector2=null;
        let firstLine:Line2=null;
        let otherLines:Line2[]=[];


        for (let currentPoint of game.snake.segments) {
            if(lastPoint){
                if(!firstLine){
                    firstLine = new Line2(lastPoint,currentPoint);
                }else{
                    otherLines.push(new Line2(lastPoint,currentPoint));
                }
            }
            lastPoint=currentPoint;
        }

        const isOnSnake = otherLines.some((line)=>{
            //console.log(line,firstLine,line.collideLine(firstLine));
            return line.collideLine(firstLine,false);
        });


        if(isOnSnake){
            console.log('Collision on snake');
            return null;
        }*/
        //=============================================



        //=============================================Movement of foods
        //const snakeHead = game.snake.segments[0];
        newFoods = [];

        for (let food of game.foods) {


            //-----------------nearest snake point
            const nearestSnakePoint =
            game.snake.segments.map((currentSnakePoint)=>{
                return ({
                    distance: Vector2.distance(food.position, currentSnakePoint),
                    vector: currentSnakePoint
            });
            }).sort((a,b)=>{
                return a.distance>b.distance?1:-1;
            })[0].vector;
            //-----------------before move


            /*//-----------------before move
            //todo external func
            let onWalls1: IWall[] = [];
            for (let wall of game.walls) {
                //console.log(wall, food.position,BOUNDS);
                if (wallCollide(wall, food.position,BOUNDS)) {
                    onWalls1.push(wall);
                }
            }
            //-----------------*/


            //-----------------step
            const nearestSnakePointDistance = Vector2.distance(food.position, nearestSnakePoint);

            let newRotation = Math.atan2(food.position.y - nearestSnakePoint.y, food.position.x - nearestSnakePoint.x);
            newRotation+=Math.PI/2;
            //newRotation+=Math.PI/2*(1/nearestSnakePointDistance+1);
            //newRotation+=food.rotationError;
            food.rotation = rotationStep( food.rotation, newRotation , 0.006 * durationTick );
            const lastFoodPosition = food.position;

            food.position = new Vector2(
                food.position.x + Math.cos(food.rotation)*food.speed*durationTick,
                food.position.y + Math.sin(food.rotation)*food.speed*durationTick
            );
            //-----------------


            //-----------------after move
            let onWalls2: IWall[] = [];
            for (let wall of game.walls) {
                if (wallCollide(wall, food.position,-BOUNDS)) {
                    onWalls2.push(wall);
                }
            }
            //-----------------


            if(onWalls2.length===0/* && onWalls1.length>0*/){


                //const lastWall = onWalls1[0];
                //console.log(lastWall,onWalls1,onWalls2);


                //food.position = wallSnap(lastWall,food.position,BOUNDS);
                //const targetRotation = Math.atan2(food.position.y-lastFoodPosition.y,food.position.x-lastFoodPosition.x);
                //food.rotation = rotationStep(food.rotation,targetRotation,0.006 * durationTick);
            }else{
                newFoods.push(food);
            }


        }

        game.foods = newFoods;//todo when spawning walls newFoods are mutating!
        //=============================================







        //=============================================Growth/Remove/spawn walls
        const newWalls = [];

        for (let wall of game.walls) {


            if (wall.radius < wall.radiusDest) {
                wall.radius -= durationTick * WALL_GROWTH_SPEED;
            } else if (wall.radius > wall.radiusDest) {
                wall.radius -= durationTick * WALL_GROWTH_SPEED;
            }
            if (Math.abs(wall.radius - wall.radiusDest) < WALL_GROWTH_SPEED) {
                wall.radius = wall.radiusDest;
            }


            if (wall.radius !== 0) {

                //todo separate function
                const anySegmentOfSnakeOnThisWall = (() => {
                    for (let segment of game.snake.segments) {
                        if (!wallCollide(wall, segment, -BOUNDS))
                            return false;
                    }
                    return true;
                })();


                if (!anySegmentOfSnakeOnThisWall) {
                    wall.radiusDest = 0;
                } else {

                    if (wallCollide(wall, game.snake.segments[0], BOUNDS)) {

                        const newWall = {
                            position: game.snake.segments[0],
                            radius: 0,
                            radiusDest: Math.random() * 100 + 100
                        };
                        newWalls.push(newWall);
                        //food removing is evaluated by other part of game update function
                        spawnRandomFoods(newWall, 0.002, game.foods);

                    }
                }
            }
        }
        //-------------------------


        game.walls = newWalls;
        //=============================================







    }

    return game;//todo create new object


}