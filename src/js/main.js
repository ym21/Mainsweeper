import { Mainsweeper } from "./Mainsweeper.js";

class Game {
	constructor() {
		this.mainDisp = document.getElementById("main");

		this.game = new Mainsweeper();

		this.game.addEventListener("update", () => {
			this.update();
		});
		this.game.addEventListener("start", () => {
			this.start();
		});
		this.game.addEventListener("end", () => {
			this.end();
		});

		this.cells = null;
	}
	init() {
		this.game.init(10, 10, 10);
		this.mainDisp.innerHTML = "";
		this.cells = [];
		for (let y = 0; y < this.game.rows; y++) {
			this.cells[y] = [];
			for (let x = 0; x < this.game.columns; x++) {
				this.cells[y][x] = document.createElement("div");
				this.cells[y][x].className = "cell";
				this.mainDisp.appendChild(this.cells[y][x]);
			}
		}
	}
	start() {}

	update() {
		for (const [r, rc] of this.cells.entries()) {
			for (const [c, cell] of rc.entries()) {
				const state = this.game.cells[(r, c)];
				cell.className = "cell";
			}
		}
	}

	end() {}
}

//読み込み完了後実行
document.addEventListener("DOMContentLoaded", () => {
	const g = new Game();
	g.init();
	g.update();
});
