import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
import { File } from "./File.js";
import { Level } from "./Level.js";
import { Obstacle } from "./Obstacle.js";
import { Door } from "./Door.js";
import { Plate } from "./Plate.js";
import { State } from "./State.js";

export class Game{
    private width: number;
    private height: number;
    private display: Display;
    private level: number;
    private player1: Player;
    private player2: Player;
    private endPoint: Point;
    private walls: Point[];
    private doors: Door[];
    private pressurePlates: Plate[];
    private dir: Direction;
    private levelData: Level;
    private tmpCoords: number[];
    private doorColors: string[][];
    private pressedPlate: {id: number, player: any};
    
    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width,height);
        this.level = 0;
        this.levelData = {};
        this.player1 = new Player(-1, -1);
        this.player2 = new Player(-1, -1, Color.RED, Shape.CIRCLE, Color.DARKRED);
        this.endPoint = new Point(-1, -1, Color.YELLOW, Shape.CIRCLE, Color.DARKYELLOW);
        this.walls = [];
        this.doors = [];
        this.pressurePlates = [];
        this.pressedPlate = {id: -1, player: undefined};
        this.dir = Direction.RIGHT;
        this.tmpCoords = [-1, -1];
        this.doorColors = [
            ['#FF8C00', '#885000'],
            ['#8A2BE2', '#4A1582'],
            ['#00FF00', '#008800'],
            ['#FF69B4', '#B4447D'],
            ['#9e0e40', '#B4447D'],
        ];
        this.display.draw(this);
    }

    public getLevel(): number {
        return this.level;
    }

    public getPlayers(): Player[] {
        return [this.player1, this.player2];
    }

    public getEndPoint(): Point {
        return this.endPoint;
    }

    public getWalls(): Point[] {
        return this.walls;
    }

    public getDoors(): Door[] {
        return this.doors;
    }

    public getPlates(): Plate[] {
        return this.pressurePlates;
    }

    private refreshData(data: Level): void {
        this.levelData = data;

        // show player 1
        this.player1.setX(this.levelData.PlayersStart![0][0]);
        this.player1.setY(this.levelData.PlayersStart![0][1]);
        // show player 2
        this.player2.setX(this.levelData.PlayersStart![1][0]);
        this.player2.setY(this.levelData.PlayersStart![1][1]);
        // show end point
        this.endPoint.setX(this.levelData.EndPlates![0]);
        this.endPoint.setY(this.levelData.EndPlates![1]);

        // show walls 
        this.walls = [];
        this.levelData.Walls?.forEach(wall => {
            this.walls.push(new Point(wall[0], wall[1], '#666', Shape.RECTANGLE, '#444'));
        })

        // show doors with plates
        this.doors = [];
        this.pressurePlates = [];
        this.levelData.Doors?.forEach((door, index) => {
            const fillColor = this.doorColors[index][0];
            const strokeColor = this.doorColors[index][1];

            this.doors.push(
                new Door(
                    door[0], 
                    door[1], 
                    fillColor, 
                    Shape.RECTANGLE, 
                    strokeColor,
                    door[2]
                )
            );

            this.pressurePlates.push(
                new Plate(
                    this.levelData.PressurePlates![index][0], 
                    this.levelData.PressurePlates![index][1], 
                    fillColor, 
                    Shape.DIAMOND, 
                    strokeColor,
                    this.levelData.PressurePlates![index][2]
                )
            );
        })
    }

    public initialize(data: Level) {
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

    private isLevelFinished(): boolean {
        return this.isEndPoint(this.player1) && this.isEndPoint(this.player2);
    }

    // check if player reached the end point
    private isEndPoint(player: Player): boolean {
        return this.endPoint.getX() == player.getX() && this.endPoint.getY() == player.getY();
    }

    private getPlateById(id: number): Plate {
        const plate = this.pressurePlates.filter(el => el.getId() == id);

        return plate[0];
    }

    private changePlateState(plate: Plate, action: string, player?: Player | undefined): void {
        switch (action) {
            case 'press':
                plate.setState(State.PRESSED);
                this.pressedPlate = {id: plate.getId(), player: player};
                this.changeDoorState(plate.getId(), State.OPENED);
                break;
            case 'unpress':
                plate.setState(State.CLOSED);
                this.pressedPlate = {id: -1, player: undefined};
                this.changeDoorState(plate.getId(), State.CLOSED);
                break;
        }
    }

    private changeDoorState(id: number, state: State): void {
        const door = this.doors.filter(el => el.getId() == id);
        
        if (door.length > 0) door[0].setState(state);
    }

    private isObstacle(x: number, y: number, type: Obstacle, player?: Player): Point[] | undefined {
        let obstacle = undefined;

        switch (type) {
            case Obstacle.WALL:
                obstacle = this.walls.filter(el => el.getX() == x && el.getY() == y);
                break;
            case Obstacle.PLAYER:
                // if player1 or player2 reached the end point he is not more the obstacle
                if (this.isEndPoint(this.player1) || this.isEndPoint(this.player2)) {
                    obstacle = undefined;
                } else {
                    if (this.player1.getX() == x && this.player1.getY() == y) {
                        obstacle = [this.player1];
                    }
                    if (this.player2.getX() == x && this.player2.getY() == y) {
                        obstacle = [this.player2];
                    }
                }
                break;
            case Obstacle.DOOR:
                obstacle = this.doors.filter(el => el.getX() == x && el.getY() == y && State[el.getState()] == 'CLOSED');
                break;
            case Obstacle.PLATE:
                obstacle = this.pressurePlates.filter(el => el.getX() == x && el.getY() == y);
                if (obstacle.length > 0) {
                    this.changePlateState(obstacle[0], 'press', player);
                }
                break;
        }

        return obstacle;
    }

    private movePlayer(player: Player): void { 
        // check if the player meets wall, door or another player
        const checkWall = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.WALL);
        const checkPlayer = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.PLAYER);
        const checkDoor = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.DOOR);

        if (this.level > 0) {
            // check if the player meets plate
            let checkPlate = undefined;

            if (this.pressedPlate.id === -1) {
                checkPlate = this.isObstacle(this.tmpCoords[0], this.tmpCoords[1], Obstacle.PLATE, player);
            }
            
            if (this.pressedPlate.player === player && (checkPlate === undefined || checkPlate?.length === 0)) {
                this.changePlateState(this.getPlateById(this.pressedPlate.id), 'unpress')
            }
        }

        if (checkWall && checkWall.length > 0) {
            player.move(this.dir, this.width - 1, this.height - 1, checkWall[0]);       
        } else if (checkDoor && checkDoor.length > 0) {
            player.move(this.dir, this.width - 1, this.height - 1, checkDoor[0]);       
        } else if (checkPlayer && checkPlayer.length > 0) {
            player.move(this.dir, this.width - 1, this.height - 1, checkPlayer[0]);
        } else {
            player.move(this.dir, this.width - 1, this.height - 1);
        }
        
        this.display.draw(this);
    }

    private async loadLevel(): Promise<Level> {
        const file = `./Levels/level${this.level}.json`;
        const data = await File.load(file);

        return data;
    }

    public nextLevel(): void {
        if (this.isLevelFinished()) {
            this.level++;

            if (this.level == 5) {
                const finish = document.getElementById('finish');
                finish?.classList.add('active');
            } else {
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
                })
            }
        }

        this.display.refreshScore(this);
        this.display.draw(this);
    }

    private loader(show: boolean):void {
        const loader = document.getElementById('loader');
    
        show ? loader?.classList.add('active') : loader?.classList.remove('active');
    }
}