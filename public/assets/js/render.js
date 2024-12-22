import { listSong } from "./songs.js";

const body = document.querySelector("body");
let htmls = `
<div id="container"></div>
`;
body.innerHTML = htmls;
const conTaiNer = document.querySelector("#container");

let index1 = 0;

const boxChildrent = listSong.map((song) => {
  return `<div onclick="(function hi(e) { localStorage.setItem("musicChannel", e.target.dataset.value) })(event)" class="box" index="${index1++}" data-value="${song}">${song}</div>`;
});

conTaiNer.innerHTML = boxChildrent.join("");
