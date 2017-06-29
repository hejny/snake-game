import {Vector2} from './classes/vector2';
import {Scene} from './classes/scene';
import {Snake} from './classes/snake';



const canvas = document.getElementById("scene") as HTMLCanvasElement;
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width=boundingClientRect.width;
canvas.height=boundingClientRect.height;
const ctx = canvas.getContext("2d");

const scene = new Scene(ctx);

let balls = [];
for (var i = 0; i < 1; i++) {

    balls[i] = new Snake([new Vector2(100,100)],new Vector2(100,0), 40);
    scene.addObject(balls[i]);

}

canvas.addEventListener('pointermove',(event)=>{
    let dx = balls[0].head.x - event.clientX;
    let dy = balls[0].head.y - event.clientY;
    let distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    distance = distance/-200;
    dx = dx/distance;
    dy = dy/distance;

    balls[0].move.x = dx;
    balls[0].move.y = dy;

});


let timestamp_last = performance.now();

function drawLoop(timestamp) {

    const ms = timestamp - timestamp_last;
    timestamp_last = timestamp;

    scene.update(ms);
    scene.draw();

    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);