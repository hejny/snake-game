import {Vector2} from './vector2';

function pad(number:number,digits:number) {
    return (new Array(digits).join('0') + number).slice(-digits);
}





export class ImageCollection {


    public imgs: HTMLImageElement[];

    constructor(path: string, count: number) {
        this.imgs = [];
        for (let i = 1; i <= count; i++) {//todo from 0
            const imgOrig = document.createElement("img");
            //todo onload
            //todo process.env.PUBLIC_URL
            imgOrig.src = path.split('$').join(pad(i, 4));
            this.imgs.push(imgOrig);
        }
    }


    drawImage(ctx: CanvasRenderingContext2D, index: number, position: Vector2, size: number, rotation = 0) {


        const imgOrig = this.imgs[index];

        //todo cache
        const imgOrigDiagonal = Math.sqrt(Math.pow(200, 2) + Math.pow(400, 2));
        const
            tx = imgOrigDiagonal / 2,
            ty = imgOrigDiagonal / 2;

        const canvas = document.createElement("canvas");
        canvas.width = imgOrigDiagonal;
        canvas.height = imgOrigDiagonal;

        const ctxX = canvas.getContext('2d');
        ctxX.translate(tx, ty);
        ctxX.rotate(rotation + Math.PI / 2);
        ctxX.drawImage(imgOrig, -100, -200, 200, 400);
        ctxX.translate(-tx, -ty);


        ctx.drawImage(canvas,
            position.x - size/2,
            position.y - size/2,
            size, size
        );


    }
}