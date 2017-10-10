import {Vector2} from './vector2';

export class Line2 {
    constructor(public point1: Vector2, public point2: Vector2) {
    }


    collidePoint(point: Vector2): boolean {

        let
            a1x = this.point1.x,
            a1y = this.point1.y,
            a2x = this.point2.x,
            a2y = this.point2.y,
            b1x = point.x,
            b1y = point.y;


        a2x -= a1x;
        a2y -= a1y;

        b1x -= a1x;
        b1y -= a1y;


        var aSlope = a2y / a2x;
        var bSlope = b1y / b1x;


        if (aSlope != bSlope)return false;

        var aDist = this.point2.distance0;
        var bDist = point.distance0;
        //var aDist = TOWNS.TMath.xy2dist(a2y, a2x);
        //var bDist = TOWNS.TMath.xy2dist(b1y, b1x);

        return (aDist >= bDist);

    }

    //todo edges param is unused and deprecated
    collideLine(line2: Line2,edges:boolean): boolean {

        const line1 = this;

        const
            x1 = line1.point1.x,
            x2 = line1.point2.x,
            x3 = line2.point1.x,
            x4 = line2.point2.x,
            y1 = line1.point1.y,
            y2 = line1.point2.y,
            y3 = line2.point1.y,
            y4 = line2.point2.y;

        //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Mathematics
        var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
        if (isNaN(x)||isNaN(y)) {
            return false;
        } else {
            if (x1>=x2) {
                if (!(x2<=x&&x<=x1)) {return false;}
            } else {
                if (!(x1<=x&&x<=x2)) {return false;}
            }
            if (y1>=y2) {
                if (!(y2<=y&&y<=y1)) {return false;}
            } else {
                if (!(y1<=y&&y<=y2)) {return false;}
            }
            if (x3>=x4) {
                if (!(x4<=x&&x<=x3)) {return false;}
            } else {
                if (!(x3<=x&&x<=x4)) {return false;}
            }
            if (y3>=y4) {
                if (!(y4<=y&&y<=y3)) {return false;}
            } else {
                if (!(y3<=y&&y<=y4)) {return false;}
            }
        }
        return true;

    }


}