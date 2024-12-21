import {listSong} from "./songs.js";

const conTaiNer = document.querySelector("#container");

const boxChildrent = listSong.map((song) => {
    return`<a href="./public/assets/html/index.html"><div class="box" data-value="${song}"">${song}</div></a>`
});

conTaiNer.innerHTML = boxChildrent.join("");
