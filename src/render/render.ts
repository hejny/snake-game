import {IGame} from '../model/game'
import {Vector2} from '../classes/vector2'
import {renderSnake} from './render-snake'
import {renderFoods} from './render-foods'
import {renderWalls} from './render-walls'

export function render(ctx:CanvasRenderingContext2D, game:IGame){


    const durationGame = game.updated - game.started;


    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    const snakeHead = game.snake.segments[0];
    const center = new Vector2(
        snakeHead.x - ctx.canvas.width/2,
        snakeHead.y - ctx.canvas.height/2
    );


    renderWalls(ctx,2,game.walls,durationGame,center);
    renderWalls(ctx,1,game.walls,durationGame,center);
    renderFoods(ctx,game.foods,durationGame,center);
    renderSnake(ctx,game.snake,durationGame,center,(new Date()).getTime()-game.started);




}