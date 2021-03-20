import { EventDispatcher } from "./event.js";

//セルの状態クラス
class Cell {
    constructor() {
        this.isBomb = false; //爆弾の有無
        this.isFlag = false; //フラグの有無
        this.isOpen = false; //マスが開いているか
        this.arndBombCnt = 0; //周りの爆弾の数
    }
}

//マインスイーパー本体
export class Mainsweeper extends EventDispatcher {
    constructor() {
        super();
        this.rows = 0; //ゲームのサイズ（行）
        this.columns = 0; //ゲームのサイズ（列）
        this.bombs = 0; //爆弾の数
        this.cells = null; //セルの状態
    }

    init(rows, columns, bombs) {
        this.rows = rows;
        this.columns = columns;
        this.bombs = bombs;
        this.cells = [];
        for (let y = 0; y < this.rows; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.columns; x++) {
                this.cells[y][x] = new Cell();
            }
        }
        this.dispatchEvent(new Event("update"));
    }
}
