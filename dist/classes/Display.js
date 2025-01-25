import { Drawer } from "../Drawer.js";
export class Display {
    constructor(width, height, scale = 40) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshScore(game) {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = game.getLevel().toString();
    }
    drawPlayers(players) {
        players.forEach(player => {
            this.drawer.drawCircle(player.getX(), player.getY(), player.getColor(), player.getStrokeColor());
        });
    }
    drawWalls(walls) {
        walls.forEach(wall => {
            this.drawer.drawRectangle(wall.getX(), wall.getY(), wall.getColor(), wall.getStrokeColor());
        });
    }
    draw(game) {
        // clear field
        this.drawer.clear();
        // draw finish point
        this.drawer.drawCircle(game.getEndPoint().getX(), game.getEndPoint().getY(), game.getEndPoint().getColor(), game.getEndPoint().getStrokeColor());
        // draw walls
        this.drawWalls(game.getWalls());
        // draw players
        this.drawPlayers(game.getPlayers());
    }
}
