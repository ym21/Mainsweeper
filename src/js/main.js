import { Mainsweeper } from "./Mainsweeper.js";

class Game {
    constructor() {
        this.mainDisp = document.getElementById("game");
        this.resetButton = document.getElementById("reset-button");
        this.timeLabel = document.getElementById("time");
        this.bombLabel = document.getElementById("bomb");

        this.game = new Mainsweeper();

        this.game.addEventListener("start", () => {
            this.start();
        });
        this.game.addEventListener("update", () => {
            this.update();
        });
        this.game.addEventListener("end", () => {
            this.end();
        });
        this.resetButton.addEventListener("click", () => {
            this.end();
            this.init();
        });

        this.cells = null;
        this.timer = null;
        this.time = 0;
    }
    init() {
        this.game.init(10, 10, 20);
        this.timer = null;
        this.time = 0;
        this.timeLabel.innerHTML = "⏱  0";
        this.bombLabel.innerHTML =
            "💣" + ("   " + (this.game.bombs - this.game.flagCnt)).slice(-3);
        this.mainDisp.innerHTML = "";
        this.cells = [];
        for (let y = 0; y < this.game.rows; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.game.columns; x++) {
                this.cells[y][x] = document.createElement("div");
                this.cells[y][x].className = "cell";
                this.mainDisp.appendChild(this.cells[y][x]);
                this.cells[y][x].onclick = () => {
                    this.game.openCell(y, x);
                };
                this.cells[y][x].oncontextmenu = () => {
                    this.game.toggleFlag(y, x);
                };
            }
        }
    }
    start() {
        this.timer = setInterval(() => {
            this.time++;
            this.timeLabel.innerHTML = "⏱" + ("   " + this.time).slice(-3);
        }, 1000);
    }

    update() {
        for (const [r, rc] of this.cells.entries()) {
            for (const [c, cell] of rc.entries()) {
                const state = this.game.cells[r][c];
                if (!state.isFlag) {
                    cell.innerHTML = "";
                } else {
                    cell.className = "cell flag";
                    cell.innerHTML = "🚩";
                }
                if (state.isOpen) {
                    cell.className = "cell open";
                    cell.innerHTML =
                        state.arndBombCnt === 0 ? "" : state.arndBombCnt;
                }
            }
        }
        this.bombLabel.innerHTML =
            "💣" + ("   " + (this.game.bombs - this.game.flagCnt)).slice(-3);
    }

    end() {
        clearInterval(this.timer);
        if (this.game.isClear) {
            console.log("Game Clear");
        } else {
            console.log("Game Over");
            for (const [r, rc] of this.cells.entries()) {
                for (const [c, cell] of rc.entries()) {
                    const state = this.game.cells[r][c];
                    if (state.isBomb) {
                        cell.className = "cell bomb";
                        cell.innerHTML = "💣";
                    } else if (state.isFlag) {
                        cell.className = "cell miss";
                        cell.innerHTML = "✖";
                    }
                }
            }
        }
    }
}

//読み込み完了後実行
document.addEventListener("DOMContentLoaded", () => {
    const g = new Game();
    g.init();
});
