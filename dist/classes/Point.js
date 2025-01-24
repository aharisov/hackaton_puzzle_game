export class Point {
    constructor(x, y, color, shape, strokeColor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.strokeColor = strokeColor;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getColor() {
        return this.color;
    }
    getShape() {
        return this.shape;
    }
    getStrokeColor() {
        return this.strokeColor;
    }
}
