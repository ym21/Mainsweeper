//イベント発火できるクラス
export class EventDispatcher {
  constructor() {
    this.eventListeners = {};
  }

  //イベントの配列を受け取る
  getListeners(type) {
    //無ければ作る
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    return this.eventListeners[type];
  }

  //イベント登録
  addEventListener(type, callback) {
    this.getListeners(type).push(callback);
  }
  //イベント発火
  dispatchEvent(event) {
    for (const listener of this.getListeners(event.type)) {
      listener(event);
    }
  }
}
