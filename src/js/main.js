import { Mainsweeper } from "./Mainsweeper.js";

//読み込み完了後実行
document.addEventListener("DOMContentLoaded", () => {
	const m = new Mainsweeper();
	m.addEventListener("update", () => {
		console.log("test");
	});
});
