const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $(".dashboard__name-song");
const cdThumd = $(".cd__thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $("#playlist");
const cd = $(".cd");

export {
    heading,
    cdThumd,
    audio,
    playBtn,
    progress,
    nextBtn,
    prevBtn,
    randomBtn,
    repeatBtn,
    playList,
    cd
};