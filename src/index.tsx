import {Vector2} from './classes/vector2';
import {Scene} from './classes/scene';
import {Snake} from './classes/snake';
import {Ball} from './classes/ball';
import './style/index.css';



const canvas = document.getElementById("scene") as HTMLCanvasElement;
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width=boundingClientRect.width;
canvas.height=boundingClientRect.height;
const ctx = canvas.getContext("2d");

const scene = new Scene(ctx,new Vector2(0,0));




const snake = new Snake(scene,[new Vector2(100,100)],0, 200);
scene.addObject(snake);



function randomPosition(){
    return(new Vector2(
        Math.random()*canvas.width,
        Math.random()*canvas.height
    ))
}


let balls=[];
for (var i = 0; i < 100; i++) {
    balls[i] = new Ball(scene,randomPosition(),new Vector2(0,0), 40);
    scene.addObject(balls[i]);
}





canvas.addEventListener('pointermove',(event)=>{

    const dx = canvas.width/2  - event.clientX;
    const dy = canvas.height/2 - event.clientY;

    /*const dx = snake.head.x - event.clientX;
     const dy = snake.head.y - event.clientY;*/
    let rotation = Math.atan2(dy,dx)+Math.PI;
    snake.headRotation = rotation;
});



const started = performance.now();
let timestamp_last = performance.now();

function drawLoop(timestamp) {

    const duration = timestamp - started;
    const ms = timestamp - timestamp_last;
    timestamp_last = timestamp;



    scene.update(duration,ms);
    scene.cameraPosition = snake.head;



    for(let ball of balls){
        if(Vector2.distance(snake.head,ball.position)<30){
            ball.dispose();
            //snake.size+=1;
            //console.log(snake.size);
        }
    }



    scene.draw(duration);

    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);