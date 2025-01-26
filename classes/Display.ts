import { Drawer } from "../Drawer.js";
import { Door } from "./Door.js";
import { Game } from "./Game.js";
import { Plate } from "./Plate.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { State } from "./State.js";


export class Display{
    private drawer: Drawer;
  
    constructor(width:number, height:number, scale:number = 40) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(game: Game){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = game.getLevel().toString();
    }

    public drawObjects(objects: Point[] | Door[] | Plate[], shape: Shape): void {
        switch (shape) {
            case Shape.CIRCLE:
                objects.forEach(object => {
                    this.drawer.drawCircle(
                        object.getX(), 
                        object.getY(), 
                        object.getColor(), 
                        object.getStrokeColor()
                    );
                });
                break;
            case Shape.RECTANGLE:
                objects.forEach(object => {
                    if (object instanceof Door && object.getState() == State.CLOSED) {
                        this.drawer.drawRectangle(
                            object.getX(), 
                            object.getY(), 
                            object.getColor(), 
                            object.getStrokeColor()
                        );
                    } else if (object instanceof Door && object.getState() == State.OPENED) {
                        this.drawer.drawRectangle(
                            object.getX(), 
                            object.getY(), 
                            object.getColor(), 
                            object.getColor()
                        );
                    } else {
                        this.drawer.drawRectangle(
                            object.getX(), 
                            object.getY(), 
                            object.getColor(), 
                            object.getStrokeColor()
                        );
                    }
                });
                break;
            case Shape.DIAMOND:
                objects.forEach(object => {
                    if (object instanceof Plate && object.getState() == State.CLOSED) {
                        this.drawer.drawDiamond(
                            object.getX(), 
                            object.getY(), 
                            object.getColor(),
                            object.getStrokeColor()
                        );
                    } else {
                        this.drawer.drawDiamond(
                            object.getX(), 
                            object.getY(), 
                            object.getColor(),
                            object.getColor()
                        );
                    }
                });
                break;
        }
        
    }
  
    public draw(game:Game):void {
        // clear field
        this.drawer.clear();
        
        // draw finish point
        this.drawer.drawCircle(
            game.getEndPoint().getX(),
            game.getEndPoint().getY(),
            game.getEndPoint().getColor(),
            game.getEndPoint().getStrokeColor()
        );

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