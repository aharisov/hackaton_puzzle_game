export var Obstacle;
(function (Obstacle) {
    Obstacle[Obstacle["PLAYER"] = 0] = "PLAYER";
    Obstacle[Obstacle["WALL"] = 1] = "WALL";
    Obstacle[Obstacle["DOOR"] = 2] = "DOOR";
    Obstacle[Obstacle["PLATE"] = 3] = "PLATE";
    Obstacle[Obstacle["PRESSED_PLATE"] = 4] = "PRESSED_PLATE";
})(Obstacle || (Obstacle = {}));
