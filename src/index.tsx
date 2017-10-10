import './style/index.css';
import * as _ from "lodash";
import {Howl} from "howler";
import {createGame,IGame} from './model/game';
import Game from './classes/Game';
import {Vector2} from "./classes/vector2";

const gamee = (window as any).gamee;//todo import gamee from 'gamee';


const canvas = document.getElementById("scene") as HTMLCanvasElement;
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width=boundingClientRect.width;
canvas.height=boundingClientRect.height;
const ctx = canvas.getContext("2d");




let pointerX = 0,pointerY = 0;//todo Vector2
function pointEventListener(event){
    event.preventDefault();
    event.stopPropagation();
    pointerX = canvas.width / 2 - event.clientX;
    pointerY = canvas.height / 2 - event.clientY;
}
canvas.addEventListener('pointerdown',pointEventListener);
canvas.addEventListener('pointerup',pointEventListener);
canvas.addEventListener('pointermove',pointEventListener);


canvas.addEventListener('touchstart', (event)=>event.preventDefault());
canvas.addEventListener('touchmove', (event)=>event.preventDefault());
canvas.addEventListener('touchend', (event)=>event.preventDefault());




let eatSound = new Howl({
    src: [`${process.env.PUBLIC_URL}/assets/audio/172033__paulmorek__nom-a-03.wav`]
});



/*
const saveStateToGamee = _.debounce(function(game:IGame){
    gamee.gameSave(game);//todo why Uncaught data provided to gameSave function must be object
},1000);*/


let savedStateFromGamee: IGame = null;
gamee.gameInit("FullScreen", {}, ["saveState"], function(error, data) {


    try{
        //console.log(data.saveState);
        savedStateFromGamee = JSON.parse(data.saveState);
    }catch(error){
        console.warn(error);
    }


    gamee.gameReady(function(error) {
        if(error !== null){
            console.warn(error)
        }


    });

});




let game:Game;
// Will be emitted when user will start game or restart it.
gamee.emitter.addEventListener("start", _.debounce((event)=>{
    console.log('Gamee emits start.');

    let gameData:IGame;
    if(savedStateFromGamee){
        console.log('Creating game data from Gamee storage.');
        gameData = savedStateFromGamee;
    }else{
        console.log('Creating new game data.');
        gameData = createGame();
    }

    if(game instanceof Game){
        game.dispose();
    }

    game = new Game(
        gameData,
        ctx,
        ()=>new Vector2(pointerX,pointerY),
        ()=>{console.log('GameOver!');gamee.gameOver()},
        (score)=>{eatSound.play();gamee.updateScore(score)},
        _.throttle((gameData:IGame)=>{ gamee.gameSave(JSON.stringify(gameData));},1000)
    );
    game.play();
    event.detail.callback();
},500));

// Will be emitted when user paused the game.
gamee.emitter.addEventListener("pause", (event)=>{
    console.log('Gamee emits pause.');

    game.pause();
    event.detail.callback();
});

// Will be emitted after user resumes the game after
// pause or GameeApp suspension.
gamee.emitter.addEventListener("resume", (event)=>{
    console.log('Gamee emits resume.');

    game.play();
    event.detail.callback();
});


// Will be emitted when user clicks the mute button
// and the game must mute all game sounds.
gamee.emitter.addEventListener("mute", function(event) {
    console.log('Gamee emits mute.');
    eatSound.mute(true);
    event.detail.callback();
});

// Will be emitted when user clicks the unmute button
// and the game should unmute all game sounds.
gamee.emitter.addEventListener("unmute", function(event) {
    console.log('Gamee emits unmute.');
    eatSound.mute(false);
    event.detail.callback();
});