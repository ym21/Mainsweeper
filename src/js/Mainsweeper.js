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
    this.isUpdate = false; //更新の有無
    this.flagCnt = 0; //フラグの数
    this.isEnd = false; //ゲームが終わっているか
    this.isClear = false; //クリアの有無
    this.isStart = false; //ゲームの開始
  }

  //初期化
  init(rows, columns, bombs) {
    this.rows = rows;
    this.columns = columns;
    this.bombs = bombs;
    this.flagCnt = 0;
    this.isEnd = false;
    this.isClear = false;
    this.isStart = false;
    this.cells = [];
    for (let y = 0; y < this.rows; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.columns; x++) {
        this.cells[y][x] = new Cell();
      }
    }
  }

  //セルを開く
  openCell(row, column) {
    if (!this.isStart) {
      this.setBombs(row, column);
      this.start();
    }
    if (!this.isEnd && !this.cells[row][column].isFlag) {
      this._openCell(row, column);
      if (this.isUpdate) {
        this.update();
      }
    }
  }

  _openCell(row, column) {
    if (this.cells[row] && this.cells[row][column]) {
      const cell = this.cells[row][column];
      if (cell.isBomb) {
        this.gameEnd();
        return;
      } else if (!cell.isFlag && !cell.isOpen) {
        cell.isOpen = true;
        this.isUpdate = true;
        if (cell.arndBombCnt === 0) {
          this._openCell(row - 1, column - 1);
          this._openCell(row - 1, column);
          this._openCell(row - 1, column + 1);
          this._openCell(row, column - 1);
          this._openCell(row, column + 1);
          this._openCell(row + 1, column - 1);
          this._openCell(row + 1, column);
          this._openCell(row + 1, column + 1);
        }
      }
    }
  }

  //爆弾を設置 r,cにはおかない
  setBombs(row, column) {
    const randMax = this.rows * this.columns - 1;
    const numsList = new Int8Array(randMax + 1).map((v, i) => i); //ここからランダムに取り出す

    numsList[row * this.columns + column] = numsList[randMax]; //(r,c)をリストから削除

    for (let i = randMax; i > randMax - this.bombs; i--) {
      const rand = Math.floor(Math.random() * i);

      const y = Math.floor(numsList[rand] / this.columns);
      const x = numsList[rand] % this.columns;

      this.cells[y][x].isBomb = true; //爆弾設置
      this._setAroundBombs(y, x);

      numsList[rand] = numsList[i - 1]; //一度出た数字はリストから削除
    }
  }

  //周囲の爆弾の数を入れる
  _setAroundBombs(row, column) {
    for (let y = row - 1; y <= row + 1; y++) {
      for (let x = column - 1; x <= column + 1; x++) {
        if (y >= 0 && y < this.rows && x >= 0 && x < this.columns) {
          this.cells[y][x].arndBombCnt++;
        }
      }
    }
  }

  //フラグ設定
  toggleFlag(row, column) {
    const cell = this.cells[row][column];
    if (this.isStart && !this.isEnd && !cell.isOpen) {
      if (cell.isFlag) {
        this.flagCnt--;
        cell.isFlag = false;
      } else {
        this.flagCnt++;
        cell.isFlag = true;
      }
      this.update();
    }
  }

  //クリアチェック
  clearCheck() {
    for (const rc of this.cells) {
      for (const c of rc) {
        if (!c.isBomb && !c.isOpen) {
          return;
        }
      }
    }
    this.gameClear();
  }

  //ゲーム開始
  start() {
    this.isStart = true;
    this.dispatchEvent(new Event("start"));
  }

  //更新
  update() {
    this.clearCheck();
    this.dispatchEvent(new Event("update"));
    this.isUpdate = false;
  }

  //ゲーム終了
  gameEnd() {
    this.isEnd = true;
    this.dispatchEvent(new Event("end"));
  }

  //ゲームクリア
  gameClear() {
    this.isEnd = true;
    this.isClear = true;
    this.dispatchEvent(new Event("end"));
  }
}
