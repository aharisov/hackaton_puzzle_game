import { Direction } from "./Direction.js";
import { Shape } from "./Shape.js";

export class Point {
    protected x: number;
    protected y: number;
    protected color: string;
    protected strokeColor?: string;
    protected shape: Shape;

    constructor(x: number, y: number, color: string, shape: Shape, strokeColor?: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.strokeColor = strokeColor;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getColor(): string {
        return this.color;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public getStrokeColor(): string {
        return this.strokeColor!;
    }
}