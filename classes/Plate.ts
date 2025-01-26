import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { State } from "./State.js";

export class Plate extends Point {
    protected state: State;
    protected id: number;

    constructor(x: number, y: number, color: string, shape: Shape = Shape.DIAMOND, strokeColor: string, id: number) {
        super(x, y, color, shape, strokeColor);
        this.state = State.CLOSED;
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getState(): State {
        return this.state;
    }

    public setState(state: State): void {
        this.state = state;
    }
}