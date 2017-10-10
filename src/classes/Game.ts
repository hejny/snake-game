import {IGame} from '../model/game';
import {update} from '../model/update';
import {render} from '../render/render';
import {Vector2} from "./vector2";

export default class Game{

    private _playing: boolean = false;
    private _lastTime: number;
    private _disposed: boolean;
    private _lastScore: number;

    constructor(
        private _gameData: IGame,
        private _ctx: CanvasRenderingContext2D,
        private _getPointerPositionCallback: ()=>Vector2,
        private _gameOverCallback: ()=>void,
        private _updateScoreCallback: (score:number)=>void,
        private _saveStateCallback: (state:IGame)=>void,

    ){
        render(this._ctx, this._gameData);
        //this.play();
    }

    private _drawLoop() {
        if(this._disposed){
            return;
        }
        if (!this._gameData.gameOver && this._playing) {

            const now = performance.now();
            const tickDuration = now - this._lastTime;
            this._lastTime = now;

            //console.log(tickDuration);
            //const durationGame = game.updated - game.started;
            //const pointerDistance = Vector2.distance0(new Vector2(pointerX,pointerY));
            //const px = Math.cos(durationGame/100)*pointerDistance/10;//todo screen
            //const py = Math.sin(durationGame/100)*pointerDistance/10;

            const pointerPosition = this._getPointerPositionCallback();
            const pointerRotation = pointerPosition.rotation0 + Math.PI;


            this._gameData = update(this._gameData, tickDuration, pointerRotation);//todo gameData should be immutable


            if (this._gameData.gameOver) {

                this._gameOverCallback();
                this.dispose();

            } else {

                this._saveStateCallback(this._gameData);
                if(this._lastScore!==this._gameData.score){
                    this._updateScoreCallback(this._gameData.score);
                    this._lastScore=this._gameData.score;
                }
                render(this._ctx, this._gameData);

            }

            window.requestAnimationFrame(() => this._drawLoop());

        }
    }

    play(){
        this._lastTime = performance.now();
        this._playing = true;
        this._drawLoop();
    }

    pause(){
        this._playing = false;
    }

    dispose(){
        this._disposed = true;
    }
}