import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
import { File } from "./File.js";
import { Obstacle } from "./Obstacle.js";
export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height);
        this.level = 0;
        this.levelData = {};
        this.player1 = new Player(-1, -1);
        this.player2 = new Player(-1, -1, Color.RED, Shape.CIRCLE, Color.DARKRED);
        this.endPoint = new Point(-1, -1, Color.YELLOW, Shape.CIRCLE, Color.DARKYELLOW);
        this.walls = [];
        this.dir = Direction.RIGHT;
        this.tmpCoords = [-1, -1];
        this.generateObjects();
        this.display.draw(this);
    }
    getLevel() {
        return this.level;
    }
    getPlayers() {
        return [this.player1, this.player2];
    }
    getEndPoint() {
        return this.endPoint;
    }
    getWalls() {
        return this.walls;
    }
    generateObjects() {
        let cnt = this.level;
    }
    refreshData(data) {
        var _a;
        this.levelData = data;
        // show player 1
        this.player1.setX(this.levelData.PlayersStart[0][0]);
        this.player1.setY(this.levelData.PlayersStart[0][1]);
        // show player 2
        this.player2.setX(this.levelData.PlayersStart[1][0]);
        this.player2.setY(this.levelData.PlayersStart[1][1]);
        // show end point
        this.endPoint.setX(this.levelData.EndPlates[0]);
        this.endPoint.setY(this.levelData.EndPlates[1]);
        // show walls 
        this.walls = [];
        (_a = this.levelData.Walls) === null || _a === void 0 ? void 0 : _a.forEach(wall => {
            this.walls.push(new Point(wall[0], wall[1], '#666', Shape.RECTANGLE, '#444'));
        });
    }
    initialize(data) {
        this.refreshData(data);
        // init listeners
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.dir = Direction.UP;
                    this.tmpCoords = [this.player1.getX(), this.player1.getY() - 1];
                    break;
                case 'z':
                    this.dir = Direction.UP;
                    this.tmpCoords = [this.player2.getX(), this.player2.getY() - 1];
                    break;
                case 'ArrowDown':
                    this.dir = Direction.DOWN;
                    this.tmpCoords = [this.player1.getX(), this.player1.getY() + 1];
                    break;
                case 's':
                    this.dir = Direction.DOWN;
                    this.tmpCoords = [this.player2.getX(), this.player2.getY() + 1];
                    break;
                case 'ArrowLeft':
                    this.dir = Direction.LEFT;
                    this.tmpCoords = [this.player1.getX() - 1, this.player1.getY()];
                    break;
                case 'q':
                    this.dir = Direction.LEFT;
                    this.tmpCoords = [this.player2.getX() - 1, this.player2.getY()];
                    break;
                case 'ArrowRight':
                    this.dir = Direction.RIGHT;
                    this.tmpCoords = [this.player1.getX() + 1, this.player1.getY()];
                    break;
                case 'd':
                    this.dir = Direction.RIGHT;
                    this.tmpCoords = [this.player2.getX() + 1, this.player2.getY()];
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
            // load new level
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
    isObstacle(x, y, type) {
        let obstacle = undefined;
        switch (type) {
            case Obstacle.WALL:
                obstacle = this.walls.filter(el => el.getX() == x && el.getY() == y);
                break;
            case Obstacle.PLAYER:
                // if player1 or player2 reached the end point he is not more the obstacle
                if (this.isEndPoint(this.player1) || this.isEndPoint(this.player2)) {
                    obstacle = undefined;
                }
                else {
                    if (this.player1.getX() == x && this.player1.getY() == y) {
                        obstacle = [this.player1];
                    }
                    if (this.player2.getX() == x && this.player2.getY() == y) {
                        obstacle = [this.player2];
                    }
                }
                break;
        }
        return obstacle;
    }
    movePlayer(player) {
        const wall = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.WALL);
        const checkPlayer = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.PLAYER);
        if (wall && wall.length > 0) {
            player.move(this.dir, this.width - 1, this.height - 1, wall[0]);
        }
        else if (checkPlayer && checkPlayer.length > 0) {
            player.move(this.dir, this.width - 1, this.height - 1, checkPlayer[0]);
        }
        else {
            player.move(this.dir, this.width - 1, this.height - 1);
        }
        this.display.draw(this);
    }
    async loadLevel() {
        const file = `./Levels/level${this.level}.json`;
        const data = await File.load(file);
        return data;
    }
    nextLevel() {
        if (this.isLevelFinished()) {
            this.level++;
            if (this.level == 6) {
                const finish = document.getElementById('finish');
                finish === null || finish === void 0 ? void 0 : finish.classList.add('active');
            }
            else {
                this.loadLevel().then((res) => {
                    this.loader(true);
                    setTimeout(() => {
                        if (res) {
                            this.refreshData(res);
                            this.loader(false);
                        }
                        this.display.refreshScore(this);
                        this.display.draw(this);
                    }, 2000);
                });
            }
        }
        this.display.refreshScore(this);
        this.display.draw(this);
    }
    loader(show) {
        const loader = document.getElementById('loader');
        show ? loader === null || loader === void 0 ? void 0 : loader.classList.add('active') : loader === null || loader === void 0 ? void 0 : loader.classList.remove('active');
    }
}
