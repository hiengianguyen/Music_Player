import {listSong} from "./songs.js";

const conTaiNer = document.querySelector("");
console.log(conTaiNer)

const boxChildrent = listSong.map((song) => {
    return`<a href="./public/assets/html/index.html"><div class="box" data-value="${song}">${song}</div></a>`
});

conTaiNer.innerHTML = boxChildrent.join("");
const boxs = document.querySelectorAll(".box");
let valueOfBox = "";
for(const box of boxs) {
    box.onclick = (e) => {
        //console.log(box.getAttribute("data-value"))
        valueOfBox = box.getAttribute("data-value");
    }

}


export {valueOfBox};