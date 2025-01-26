import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { State } from "./State.js";
export class Plate extends Point {
    constructor(x, y, color, shape = Shape.DIAMOND, strokeColor, id) {
        super(x, y, color, shape, strokeColor);
        this.state = State.CLOSED;
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}
