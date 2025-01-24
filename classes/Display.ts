import { Drawer } from "../Drawer.js";
import { Game } from "./Game.js";
import { Player } from "./Player.js";


export class Display{
    private drawer: Drawer;
  
    constructor(width:number, height:number, scale:number = 40) {
        this.drawer = new Drawer(width,height,scale)
    }
  
    public refreshScore(game: Game){
        let score : HTMLElement|null = document.getElementById("score");
        if(score!=null) score.innerHTML = game.getLevel().toString();
    }

    public drawPlayers(players: Player[]): void {
        players.forEach(player => {
            this.drawer.drawCircle(
                player.getX(), 
                player.getY(), 
                player.getColor(), 
                player.getStrokeColor()
            );
        })
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
        
        // draw rocks and holes

        // draw players
        this.drawPlayers(game.getPlayers());

        
    }        
}