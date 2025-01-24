import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
import { Movable } from "./Move.js";

export class Player extends Movable {
    constructor(
        x: number, 
        y: number, 
        color: string = Color.BLUE, 
        shape: Shape = Shape.CIRCLE, 
        strokeColor: string = Color.DARKBLUE
    ) {
        super(x, y, color, shape, strokeColor);
    } 
}