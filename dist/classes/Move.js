import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
export class Movable extends Point {
    constructor(x, y, color, shape, strokeColor) {
        super(x, y, color, shape, strokeColor);
    }
    move(dir, w, h, obstacle) {
        let xTmp = this.x;
        let yTmp = this.y;
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
    isBorder(width, height) {
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
            return true;
        return false;
    }
    isObstacle(obstacle) {
        if (obstacle == undefined || obstacle == this)
            return false;
        return this.x == obstacle.getX() && this.y == obstacle.getY();
    }
}
