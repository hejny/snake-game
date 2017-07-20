import './style/index.css';
import {createGame,IGame,IGamePhase} from './model/game';
import {update} from './model/update';
import {render} from './render/render';
const gamee = (window as any).gamee;//todo import gamee from 'gamee';


const canvas = document.getElementById("scene") as HTMLCanvasElement;
const boundingClientRect = canvas.getBoundingClientRect();
canvas.width=boundingClientRect.width;
canvas.height=boundingClientRect.height;
const ctx = canvas.getContext("2d");




let game:IGame=null;// = createGame();



let cursorRotation = 0;
canvas.addEventListener('pointermove',(event)=> {
    const dx = canvas.width / 2 - event.clientX;
    const dy = canvas.height / 2 - event.clientY;
    cursorRotation = Math.atan2(dy, dx) + Math.PI;
});





function drawLoop() {
    if(game) {
        game = update(game,cursorRotation);

        if(!game){
            gamee.gameOver();
        }else {

            gamee.updateScore(game.score);
            gamee.gameSave(game);//todo why Uncaught data provided to gameSave function must be object
            render(ctx, game);
        }

    }

    window.requestAnimationFrame(drawLoop);
}




gamee.gameInit("FullScreen", {}, ["saveState"], function(/*error,*/ data) {

    console.log(data);


    gamee.gameReady(function(error) {
        if(error !== null){
            console.warn(error)
        }

        window.requestAnimationFrame(drawLoop);


    });

});



// Will be emitted when user will start game or restart it.
gamee.emitter.addEventListener("start", function(event) {
    console.log('Gamee emits start.');

    game = createGame();
    //game.phase = IGamePhase.PLAY;//todo send action
    event.detail.callback();
});

// Will be emitted when user paused the game.
gamee.emitter.addEventListener("pause", function(event) {
    console.log('Gamee emits pause.');

    game.phase = IGamePhase.PAUSE;//todo send action
    event.detail.callback();
});

// Will be emitted after user resumes the game after
// pause or GameeApp suspension.
gamee.emitter.addEventListener("resume", function(event) {
    console.log('Gamee emits resume.');

    game.phase = IGamePhase.PLAY;//todo send action
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