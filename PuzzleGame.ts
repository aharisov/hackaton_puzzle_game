import { Game } from "./classes/Game.js";
import { File } from "./classes/File.js";
import { Level } from "./classes/Level.js";

let levelData: Level = {};
const loadZeroLevel = async (): Promise<Level> => {
    const file = './Levels/level0.json';
    const data = await File.load(file);

    return data;
}

loadZeroLevel().then((res) => {
    const game = new Game(res.Size![0], res.Size![1]);
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        game.initialize(res);
        game.nextLevel();

        if (res) {
            loader?.classList.remove('active');
        }
    }, 2000);
})