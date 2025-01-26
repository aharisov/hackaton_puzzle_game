import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Movable extends Point {
    constructor(x: number, y: number, color: string, shape: Shape, strokeColor: string) {
        super(x, y, color, shape, strokeColor);
    }

    public move(dir: Direction, w: number, h: number, obstacle?: Point | undefined): void { 
        let xTmp: number = this.x;
        let yTmp: number = this.y;
        
        switch (dir) {
            case Direction.UP:
                this.y--;
                break;
            case Direction.DOWN:
                this.y++;
                break;
            case Direction.LEFT:
                this.x--;
                break;
            case Direction.RIGHT:
                this.x++;
                break;
        }

        if (this.isBorder(w, h) || this.isObstacle(obstacle)) {
            this.x = xTmp;
            this.y = yTmp;
        }
    }

    public isBorder(width: number, height: number): boolean {
        if( this.x < 0 || this.x > width || this.y < 0 || this.y > height ) return true;
        
        return false;
    }

    public isObstacle(obstacle: Point | undefined): boolean {
        if(obstacle == undefined || obstacle == this) return false;

        return this.x == obstacle!.getX() && this.y == obstacle!.getY();
    }
}