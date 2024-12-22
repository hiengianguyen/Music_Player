import { API } from "./api.js";
import { songs } from "./songs.js";
const boxs = document.querySelectorAll(".box");
let indexOfBoxs = 0;
function handleData() {
  return new Promise((rs) => {
    for (const box of boxs) {
      box.onclick = () => {
        const value = box.getAttribute("data-value");
        const index = box.getAttribute("index");
        localStorage.setItem("savedValue2", value);
        localStorage.setItem("indexOfBoxs", index);
        rs();
      };
      indexOfBoxs++;
    }
  });
}

//await handleData();
const savedValue2 = localStorage.getItem("savedValue2");
const indexs2 = localStorage.getItem("indexOfBoxs");

var allSong = songs[indexs2][savedValue2];

// console.log(savedValue2, " ", indexs2);
export { allSong };
