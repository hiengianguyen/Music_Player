import { songs } from "./songs.js";

const $ = document.querySelector.bind(document);

const iconPage = document.querySelector("#icon-page");
const title = document.querySelector("#title");
const heading = document.querySelector(".dashboard__name-song");
const cdThumd = document.querySelector(".cd__thumb");
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".btn-toggle-play");
const progress = document.querySelector("#progress");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");
const randomBtn = document.querySelector(".btn-random");
const repeatBtn = document.querySelector(".btn-repeat");
const playList = document.querySelector("#playlist");
const cd = document.querySelector("#cd");

const indexValue = localStorage.getItem("musicIndex");

const songChannels = songs[indexValue].songList;

const PLAYER_STORAGE_KEY = "User";

const app = {
  isPlay: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  //   configSong: (localStorage.getItem("Song")) || {},
  currentIndex: 0,
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  songs: songChannels,
  setConfigControl: function (key, value) {
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
                    <i class="fa-solid fa-ellipsis write-text"></i>
                  </div>
                </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  loadCurrentSong: function () {
    title.textContent = this.currentSong.name;
    heading.textContent = this.currentSong.name;
    iconPage.setAttribute("href", this.currentSong.image);
    cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    //xử lí CD quay / dừng
    const cdThumdAnimate = cdThumd.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iteration: Infinity,
    });
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
      _this.setConfigControl("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active");
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfigControl("isRepeat", _this.isRepeat);
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
