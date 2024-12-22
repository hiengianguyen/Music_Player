import {listSong} from "./songs.js";

const conTaiNer = document.querySelector("#container");
let index1 = 0;
const boxChildrent = listSong.map((song) => {
    return`<a ><div class="box" index="${index1++}" data-value="${song}"">${song}</div></a>`

});

conTaiNer.innerHTML = boxChildrent.join("");
