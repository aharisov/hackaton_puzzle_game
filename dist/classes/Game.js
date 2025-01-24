import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height);
        this.level = 0;
        this.player1 = new Player(this.randomX(), this.randomY());
        this.player2 = new Player(this.randomX(), this.randomY(), Color.RED, Shape.CIRCLE, Color.DARKRED);
        this.endPoint = new Player(7, 6, Color.YELLOW, Shape.CIRCLE, Color.DARKYELLOW);
        this.objects = [this.player1, this.player2, this.endPoint];
        this.dir = Direction.RIGHT;
        this.generateObjects();
        this.display.draw(this);
    }
    getLevel() {
        return this.level;
    }
    getObjects() {
        return this.objects;
    }
    getPlayers() {
        return [this.player1, this.player2];
    }
    getEndPoint() {
        return this.endPoint;
    }
    randomX() {
        return Math.floor(Math.random() * this.width);
    }
    randomY() {
        return Math.floor(Math.random() * this.height);
    }
    generateObjects() {
        let cnt = this.level;
    }
    initialize() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'z':
                    this.dir = Direction.UP;
                    break;
                case 'ArrowDown':
                case 's':
                    this.dir = Direction.DOWN;
                    break;
                case 'ArrowLeft':
                case 'q':
                    this.dir = Direction.LEFT;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.dir = Direction.RIGHT;
                    break;
            }
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.movePlayer(this.player1);
                    break;
                case 'z':
                case 's':
                case 'q':
                case 'd':
                    this.movePlayer(this.player2);
                    break;
            }
            if (this.isLevelFinished()) {
                this.nextLevel();
            }
        });
    }
    isLevelFinished() {
        return this.isEndPoint(this.player1) && this.isEndPoint(this.player2);
    }
    // check if player reached the end point
    isEndPoint(player) {
        return this.endPoint.getX() == player.getX() && this.endPoint.getY() == player.getY();
    }
    movePlayer(player) {
        if (player == this.player1) {
            if (this.isEndPoint(this.player2)) {
                player.move(this.dir, this.width - 1, this.height - 1);
            }
            else {
                player.move(this.dir, this.width - 1, this.height - 1, this.player2);
            }
        }
        if (player == this.player2) {
            if (this.isEndPoint(this.player1)) {
                player.move(this.dir, this.width - 1, this.height - 1);
            }
            else {
                player.move(this.dir, this.width - 1, this.height - 1, this.player1);
            }
        }
        this.display.draw(this);
    }
    startGame() {
        this.display.refreshScore(this);
        this.display.draw(this);
    }
    nextLevel() {
        if (this.isLevelFinished()) {
            this.level++;
            this.objects = [];
            this.generateObjects();
        }
        this.display.refreshScore(this);
        this.display.draw(this);
    }
}
