import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
import { Movable } from "./Move.js";
export class Player extends Movable {
    constructor(x, y, color = Color.BLUE, shape = Shape.CIRCLE, strokeColor = Color.DARKBLUE) {
        super(x, y, color, shape, strokeColor);
    }
}
