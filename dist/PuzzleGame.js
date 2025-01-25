import { Game } from "./classes/Game.js";
import { File } from "./classes/File.js";
let levelData = {};
const loadZeroLevel = async () => {
    const file = './Levels/level0.json';
    const data = await File.load(file);
    return data;
};
loadZeroLevel().then((res) => {
    const game = new Game(res.Size[0], res.Size[1]);
    const loader = document.getElementById('loader');
    setTimeout(() => {
        game.initialize(res);
        game.nextLevel();
        if (res) {
            loader === null || loader === void 0 ? void 0 : loader.classList.remove('active');
        }
    }, 2000);
});
