import { songs } from "./songs.js";

const conTaiNer = document.querySelector("#container");
let index1 = 0;

const boxChildrent1 = songs.map((songChannel) => {
  return `<div class="box btn-3" index="${index1++}" data-value="${
    songChannel.channel
  }">${songChannel.name}</div>`;
});

conTaiNer.innerHTML = boxChildrent1.join("");
const boxs = document.querySelectorAll(".box");

for (const box of boxs) {
  box.onclick = () => {
    localStorage.setItem("musicChannel", box.dataset.value);
    localStorage.setItem("musicIndex", box.getAttribute("index"));
    window.location.href = "public/assets/html/pagePlaySongs.html";
  };
}
