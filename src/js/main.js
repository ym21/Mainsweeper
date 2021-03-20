import { Mainsweeper } from "./Mainsweeper.js";

class Game {
    constructor() {
        this.main = document.getElementById("main");
        this.game = new Mainsweeper();
        this.game.addEventListener("update", this.update);
        this.game.addEventListener("gameClear", this.gameClear);
        this.game.addEventListener("gameOver", this.gameOver);
    }
    init() {}

    update() {}

    gameClear() {}

    gameOver() {}
}

//読み込み完了後実行
document.addEventListener("DOMContentLoaded", () => {});
