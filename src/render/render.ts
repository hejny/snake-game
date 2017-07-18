import {IGame} from '../model/game'
import {Vector2} from '../classes/vector2'
import {renderSnake} from './render-snake'
import {renderFoods} from './render-foods'
import {renderWalls} from './render-walls'

export function render(ctx, game:IGame){


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    const snakeHead = game.snake.segments[0];
    const center = new Vector2(
        snakeHead.x - ctx.canvas.width/2,
        snakeHead.y - ctx.canvas.height/2
    );

    renderSnake(ctx,game.snake,center,(new Date()).getTime()-game.started);
    renderFoods(ctx,game.foods,center);
    renderWalls(ctx,game.walls,center);
}