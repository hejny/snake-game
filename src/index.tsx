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


let running = false;
let score = 0;

const started = performance.now();
let timestamp_last = performance.now();

function drawLoop(timestamp) {


    const duration = timestamp - started;
    const ms = timestamp - timestamp_last;
    timestamp_last = timestamp;


    if(running) {

        scene.update(duration, ms);
        scene.cameraPosition = snake.head;


        for (let ball of balls) {
            if(!ball.disposed) {
                if (Vector2.distance(snake.head, ball.position) < 30) {
                    ball.dispose();
                    score++;
                    gamee.updateScore(score);

                    //todo why Uncaught data provided to gameSave function must be object
                    gamee.gameSave(snake);
                    //snake.size+=1;
                    //console.log(snake.size);
                }
            }
        }




    }

    scene.draw(duration);
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);




//import gamee from 'gamee';


const gamee = (window as any).gamee;



gamee.gameInit("FullScreen", {}, ["saveState"], function(/*error,*/ data) {

    console.log(data);

    var myController = data.controller;
    var sound = data.sound;


    gamee.gameReady(function(error) {
        if(error !== null){
            console.warn(error)
        }
    });

});



// Will be emitted when user will start game or restart it.
gamee.emitter.addEventListener("start", function(event) {
   console.log('Gamee emits start.');

    running = true;
    event.detail.callback();
});

// Will be emitted when user paused the game.
gamee.emitter.addEventListener("pause", function(event) {
    console.log('Gamee emits pause.');

    running = false;
    event.detail.callback();
});

// Will be emitted after user resumes the game after
// pause or GameeApp suspension.
gamee.emitter.addEventListener("resume", function(event) {
    console.log('Gamee emits resume.');

    running = true;
    event.detail.callback();
});

// Will be emitted when user clicks the mute button
// and the game must mute all game sounds.
gamee.emitter.addEventListener("mute", function(event) {
    console.log('Gamee emits mute.');

    event.detail.callback();
});

// Will be emitted when user clicks the unmute button
// and the game should unmute all game sounds.
gamee.emitter.addEventListener("unmute", function(event) {
    console.log('Gamee emits unmute.');

    event.detail.callback();
});