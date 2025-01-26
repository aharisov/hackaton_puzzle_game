import { Drawer } from "../Drawer.js";
import { Door } from "./Door.js";
import { Plate } from "./Plate.js";
import { Shape } from "./Shape.js";
import { State } from "./State.js";
export class Display {
    constructor(width, height, scale = 40) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshScore(game) {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = game.getLevel().toString();
    }
    drawObjects(objects, shape) {
        switch (shape) {
            case Shape.CIRCLE:
                objects.forEach(object => {
                    this.drawer.drawCircle(object.getX(), object.getY(), object.getColor(), object.getStrokeColor());
                });
                break;
            case Shape.RECTANGLE:
                objects.forEach(object => {
                    if (object instanceof Door && object.getState() == State.CLOSED) {
                        this.drawer.drawRectangle(object.getX(), object.getY(), object.getColor(), object.getStrokeColor());
                    }
                    else if (object instanceof Door && object.getState() == State.OPENED) {
                        this.drawer.drawRectangle(object.getX(), object.getY(), object.getColor(), object.getColor());
                    }
                    else {
                        this.drawer.drawRectangle(object.getX(), object.getY(), object.getColor(), object.getStrokeColor());
                    }
                });
                break;
            case Shape.DIAMOND:
                objects.forEach(object => {
                    if (object instanceof Plate && object.getState() == State.CLOSED) {
                        this.drawer.drawDiamond(object.getX(), object.getY(), object.getColor(), object.getStrokeColor());
                    }
                    else {
                        this.drawer.drawDiamond(object.getX(), object.getY(), object.getColor(), object.getColor());
                    }
                });
                break;
        }
    }
    draw(game) {
        // clear field
        this.drawer.clear();
        // draw finish point
        this.drawer.drawCircle(game.getEndPoint().getX(), game.getEndPoint().getY(), game.getEndPoint().getColor(), game.getEndPoint().getStrokeColor());
        // draw walls
        this.drawObjects(game.getWalls(), Shape.RECTANGLE);
        // draw doors
        this.drawObjects(game.getDoors(), Shape.RECTANGLE);
        // draw plates
        this.drawObjects(game.getPlates(), Shape.DIAMOND);
        // draw players
        this.drawObjects(game.getPlayers(), Shape.CIRCLE);
    }
}
