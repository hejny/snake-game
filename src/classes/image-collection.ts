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
        const imgOrigDiagonal = Math.sqrt(Math.pow(imgOrig.naturalWidth, 2) + Math.pow(imgOrig.naturalHeight, 2));

        const canvasRotated = document.createElement("canvas");
        canvasRotated.width = imgOrigDiagonal;
        canvasRotated.height = imgOrigDiagonal;

        const ctxRotated = canvasRotated.getContext('2d');
        ctxRotated.translate(imgOrigDiagonal / 2, imgOrigDiagonal / 2);
        ctxRotated.rotate(rotation);
        ctxRotated.drawImage(imgOrig, -imgOrig.naturalWidth/2, -imgOrig.naturalHeight/2, imgOrig.naturalWidth, imgOrig.naturalHeight);
        ctxRotated.translate(-imgOrigDiagonal / 2, -imgOrigDiagonal / 2);

        ctx.drawImage(canvasRotated,
            position.x - size/2,
            position.y - size/2,
            size, size
        );
    }
}