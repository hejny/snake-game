import {IFood} from '../model/game'
import {Vector2} from '../classes/vector2'
import {ImageCollection} from '../classes/image-collection'

const images = new ImageCollection('/assets/images/objects/mouse/mouse-$.png',100);

export function renderFoods(ctx:CanvasRenderingContext2D, foods:IFood[], durationGame:number, center:Vector2){
    for(let food of foods){
        const index = Math.floor(durationGame*food.speed)%100;
        images.drawImage(ctx,index,new Vector2(food.position.x-center.x, food.position.y-center.y),100,food.rotation + Math.PI / 2);

    }

}