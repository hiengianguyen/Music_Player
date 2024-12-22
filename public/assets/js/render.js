import { listSong } from "./songs.js";
import { songs } from "../js/songs.js";

const body = document.querySelector("body");
const head = document.querySelector("head");
let htmls = `
<div id="container"></div>
`;
body.innerHTML = htmls;
const conTaiNer = document.querySelector("#container");

let index1 = 0;

const boxChildrent = listSong.map((song) => {
  return `<div class="box btn-3" index="${index1++}" data-value="${song}">${song}</div>`;
});
conTaiNer.innerHTML = boxChildrent.join("");
const boxs = document.querySelectorAll(".box");
function handleData() {
  return new Promise((rs) => {
    for (const box of boxs) {
      box.onclick = () => {
        localStorage.setItem("musicChannel", box.dataset.value);
        localStorage.setItem("musicIndex", box.getAttribute("index"));
        rs();
      };
    }
  });
}

await handleData().then(() => {
  const valueIndex = localStorage.getItem("musicIndex");
  const valueChannel = localStorage.getItem("musicChannel");
  head.innerHTML = `
  <link rel="icon" href="./public/assets/img/favicon.jpg" type="image/x-icon" />
  <link rel="stylesheet" href="./public/assets/styles/main.css" />
  <link rel="stylesheet" href="./public/assets/styles/base.css" />
  <script
      src="https://kit.fontawesome.com/e4f7b1c3b0.js"
      crossorigin="anonymous"
    ></script>
`;
  body.innerHTML = ``;
  htmls = `
  <div class="main">
      <div class="dashboard">
        <header class="dashboard__header">
          <h4>Now playing:</h4>
          <h2 class="dashboard__name-song">Name song</h2>
        </header>
        <div id="cd">
          <div
            class="cd__thumb"
            style="background-image: url('./public/assets/img/favicon.jpg')"
          ></div>
        </div>
        <div class="control">
          <div class="btn btn-repeat">
            <i class="fa-solid fa-arrow-rotate-right"></i>
          </div>
          <div class="btn btn-prev">
            <i class="fa-solid fa-backward-step"></i>
          </div>
          <div class="btn btn-toggle-play">
            <i class="fa-solid fa-play icon-play"></i>
            <i class="fa-solid fa-pause icon-pause"></i>
          </div>
          <div class="btn btn-next">
            <i class="fa-solid fa-forward-step"></i>
          </div>
          <div class="btn-box">
            <div class="btn btn-random">
              <i class="fa-solid fa-shuffle"></i>
            </div>
          </div>
        </div>
        <input
          type="range"
          id="progress"
          class="progress"
          value="0"
          step="1"
          min="0"
          max="100"
          placeholder="."
        />
        <audio id="audio" src=""></audio>
      </div>
      <div id="playlist"></div>
    </div>
    <script type="module" src="./public/assets/html/main.js"></script>
`;

  body.innerHTML = htmls;
  const songChannels = songs[valueIndex][valueChannel];
  console.log(songChannels);
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
  const cd = $("#cd");

  const PLAYER_STORAGE_KEY = "User";
  // console.log(allSong);
  const app = {
    isPlay: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    currentIndex: 0,
    defineProperties: function () {
      Object.defineProperty(this, "currentSong", {
        get: function () {
          return this.songs[this.currentIndex];
        },
      });
    },
    songs: songChannels,
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render() {
      const htmls = this.songs.map((song, index) => {
        return `
              <div  class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div
                    class="thumb"
                    style="background-image: url('${song.image}')"
                  ></div>
                  <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="singer">${song.singer}</p>
                  </div>
                  <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                  </div>
                </div>`;
      });
      playList.innerHTML = htmls.join("");
    },
    loadCurrentSong: function () {
      heading.textContent = this.currentSong.name;
      cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;
    },

    handleEvents: function () {
      const _this = this;
      const cdWidth = cd.offsetWidth;

      //xử lí CD quay / dừng
      const cdThumdAnimate = cdThumd.animate(
        [{ transform: "rotate(360deg)" }],
        {
          duration: 10000,
          iteration: Infinity,
        }
      );
      cdThumdAnimate.pause();

      //xử lí phóng to/thu nhỏ CD
      document.onscroll = function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cd.style.opacity = newCdWidth / cdWidth;
      };

      //xử lí khi nhấn play
      playBtn.onclick = function () {
        _this.isPlay ? audio.pause() : audio.play();
      };
      //khi audio bi pause
      audio.onpause = function () {
        _this.isPlay = false;
        playBtn.classList.remove("playing");
        cdThumdAnimate.pause();
      };
      //khi audio duoc play
      audio.onplay = function () {
        _this.isPlay = true;
        playBtn.classList.add("playing");
        cdThumdAnimate.play();
      };

      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
      };

      // xử lí khi tua nhạc
      progress.onchange = function (e) {
        const seekTime = (audio.duration * e.target.value) / 100;
        audio.currentTime = seekTime;
      };

      //xử lí khi next nhạc
      nextBtn.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };

      //xử lí khi prev nhạc
      prevBtn.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };

      //xử lí khi random nhạc
      randomBtn.onclick = function () {
        _this.isRandom = !_this.isRandom;
        _this.setConfig("isRandom", _this.isRandom);
        randomBtn.classList.toggle("active");
      };

      repeatBtn.onclick = function () {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig("isRepeat", _this.isRepeat);
        repeatBtn.classList.toggle("active", _this.isRepeat);
      };

      audio.onended = function () {
        _this.isRepeat ? audio.play() : nextBtn.click();
      };

      playList.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");
        const optionNode = e.target.closest(".option");
        if (songNode || optionNode) {
          if (songNode) {
            _this.currentIndex = Number(songNode.getAttribute("data-index"));
            _this.render();
            _this.loadCurrentSong();
            audio.play();
          }
          if (optionNode) {
            // option
          }
        }
      };
    },
    loadConfigs: function () {
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;
    },

    nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }

      this.loadCurrentSong();
    },
    prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }

      this.loadCurrentSong();
    },
    playRandomSong: function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      } while (newIndex === this.currentIndex);
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 300);
    },

    start: function () {
      console.log(cd);
      this.loadConfigs();
      this.defineProperties();
      this.handleEvents();
      this.loadCurrentSong();
      this.render();

      randomBtn.classList.toggle("active", this.isRandom);
      repeatBtn.classList.toggle("active", this.isRepeat);
    },
  };
  app.start();
});
